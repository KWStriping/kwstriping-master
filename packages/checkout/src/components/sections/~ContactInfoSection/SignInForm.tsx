import type { AccountErrorCode } from '@core/api';
import { RequestPasswordResetDocument } from '@core/api';
import { useAuth, useUser } from '@core/auth';
import { useTranslation } from '@core/i18n';
import type { ApiError } from '@core/types/errors';
import { Button } from '@core/ui/components/buttons/Button';
import { PasswordInput } from '@core/ui/components/PasswordInput';
import { useAlerts } from '@core/ui/hooks/useAlerts';
import { useErrorMessages } from '@core/ui/hooks/useErrorMessages';
import { useGetParsedApiErrors } from '@core/ui/hooks/useErrors';
import { useGetInputProps } from '@core/ui/hooks/useGetInputProps';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getCurrentHref, useValidationResolver } from '@core/utils';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { TextInput } from '@core/checkout/components/TextInput';
import { setFormErrors } from '@core/checkout/hooks/useSetFormErrors';
import { useSubmit } from '@core/checkout/hooks/useSubmit';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';

interface SignInFormProps extends Pick<SignInFormContainerProps, 'onSectionChange'> {
  onSignInSuccess: () => void;
}

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm: FC<SignInFormProps> = ({ onSectionChange, onSignInSuccess }) => {
  const { t } = useTranslation();
  const { showErrors } = useAlerts();
  const { errorMessages } = useErrorMessages();
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const { login } = useAuth();
  const { authenticating } = useUser();
  const { getFormErrorsFromApiErrors } = useGetParsedApiErrors<SignInFormData>();
  const [requestPasswordReset] = useMutation(RequestPasswordResetDocument);

  const schema = object({
    password: string().required(errorMessages.required),
    email: string().email(errorMessages.invalid).required(errorMessages.required),
  });

  const resolver = useValidationResolver(schema);

  const formProps = useForm<SignInFormData>({
    resolver,
    mode: 'onTouched',
    defaultValues: {
      email: '', // once we move to formik it should share email between
      // sign in, register and guest user form
      password: '',
    },
  });

  const { handleSubmit, getValues, watch, setError, clearErrors } = formProps;

  const getInputProps = useGetInputProps(formProps as any); // TODO: fix types

  // @ts-ignore because login comes from the sdk which is no longer
  // maintained so we'll eventually have to implement our own auth flow
  const handleSignIn = useSubmit<SignInFormData, typeof login>({
    onSubmit: login,
    onSuccess: onSignInSuccess,
    formDataParse: (data) => data,
    onError: (errors) => {
      //  api will attribute invalid credentials error to
      // email but we'd rather highlight both fields
      const fieldsErrors = errors.some(
        ({ code }) => (code as AccountErrorCode) === 'INVALID_CREDENTIALS'
      )
        ? [
            ...errors,
            { code: '', message: '', field: 'password' } as ApiError<SignInFormData>,
          ]
        : errors;

      setFormErrors({ errors: getFormErrorsFromApiErrors(fieldsErrors), setError });
      showErrors(errors, 'login');
    },
  });

  const handlePasswordReset = useSubmit<SignInFormData, typeof requestPasswordReset>({
    onEnter: () => clearErrors('password'),
    scope: 'requestPasswordReset',
    onSubmit: requestPasswordReset,
    onSuccess: () => setPasswordResetSent(true),
    formDataParse: ({ email, channel }) => ({
      email,
      redirectUrl: getCurrentHref(),
      channel,
    }),
  });

  const emailValue = watch('email');

  useEffect(() => {
    setPasswordResetSent(false);
  }, [emailValue]);

  return (
    <SignInFormContainer
      title={t(contactMessages.signIn.id, contactMessages.signIn.defaultMessage)}
      redirectSubtitle={t(
        contactMessages.newCustomer.id,
        contactMessages.newCustomer.defaultMessage
      )}
      redirectButtonLabel={t(
        contactMessages.guestCheckout.id,
        contactMessages.guestCheckout.defaultMessage
      )}
      onSectionChange={onSectionChange}
    >
      <form method="post">
        <TextInput
          label={t(contactMessages.email.id, contactMessages.email.defaultMessage)}
          {...getInputProps('email')}
        />
        <PasswordInput
          label={t(contactMessages.password.id, contactMessages.password.defaultMessage)}
          {...getInputProps('password')}
        />
        <div className="actions">
          {passwordResetSent && (
            <Typography>
              {t(contactMessages.linkSent.id, contactMessages.linkSent.defaultMessage, {
                email: getValues().email,
              })}
            </Typography>
          )}
          <Button
            disabled={authenticating}
            aria-label={t('auth.sendPasswordResetLink', 'Send password reset link')}
            color="secondary"
            size="small"
            className="ml-1 mr-4"
            onClick={() => {
              void handlePasswordReset(getValues());
            }}
          >
            {passwordResetSent
              ? t('auth.passwordReset.resend', 'Resend?')
              : t('auth.passwordReset.forgotPassword', 'Forgot password?')}
          </Button>
          <Button
            disabled={authenticating}
            aria-label={t('auth.signIn', 'Sign in')}
            onClick={handleSubmit(handleSignIn)}
          >
            {authenticating
              ? t('auth.signIn.processing', 'Processing...')
              : t('auth.signIn.signIn', 'Sign in')}
          </Button>
        </div>
      </form>
    </SignInFormContainer>
  );
};
