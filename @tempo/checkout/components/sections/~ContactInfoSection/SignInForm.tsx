import type { RequestPasswordResetMutation, RequestPasswordResetMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import type { AccountErrorCode } from '@tempo/api/generated/graphql';
import { RequestPasswordResetDocument } from '@tempo/api/generated/graphql';
import { useAuth, useUser } from '@tempo/api/auth/src';
import type { ApiError } from '@tempo/next/types/errors';
import { Button } from '@tempo/ui/components/buttons/Button';
import { PasswordInput } from '@tempo/ui/components/PasswordInput';
import { useAlerts } from '@tempo/ui/hooks/useAlerts';
import { useErrorMessages } from '@tempo/ui/hooks/useErrorMessages';
import { useGetParsedApiErrors } from '@tempo/ui/hooks/useErrors';
import { useGetInputProps } from '@tempo/ui/hooks/useGetInputProps';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { getCurrentHref, useValidationResolver } from '@tempo/utils';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { contactMessages } from './messages';
import { SignInFormContainer } from './SignInFormContainer';
import type { SignInFormContainerProps } from './SignInFormContainer';
import { TextInput } from '@tempo/checkout/components/TextInput';
import { setFormErrors } from '@tempo/checkout/hooks/useSetFormErrors';
import { useSubmit } from '@tempo/checkout/hooks/useSubmit';

interface SignInFormProps extends Pick<SignInFormContainerProps, 'onSectionChange'> {
  onSignInSuccess: () => void;
}

interface SignInFormData {
  email: string;
  password: string;
}

export const SignInForm: FC<SignInFormProps> = ({ onSectionChange, onSignInSuccess }) => {
  const { showErrors } = useAlerts();
  const { errorMessages } = useErrorMessages();
  const [passwordResetSent, setPasswordResetSent] = useState(false);
  const { login } = useAuth();
  const { authenticating } = useUser();
  const { getFormErrorsFromApiErrors } = useGetParsedApiErrors<SignInFormData>();
  const [requestPasswordReset] = useMutation<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>(RequestPasswordResetDocument);

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
        ? [...errors, { code: '', message: '', field: 'password' } as ApiError<SignInFormData>]
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
      title={m[contactMessages.signIn.id] ?? contactMessages.signIn.defaultMessage}
      redirectSubtitle={
        m[contactMessages.newCustomer.id] ?? contactMessages.newCustomer.defaultMessage
      }
      redirectButtonLabel={
        m[contactMessages.guestCheckout.id] ?? contactMessages.guestCheckout.defaultMessage
      }
      onSectionChange={onSectionChange}
    >
      <form method="post">
        <TextInput
          label={m[contactMessages.email.id] ?? contactMessages.email.defaultMessage}
          {...getInputProps('email')}
        />
        <PasswordInput
          label={m[contactMessages.password.id] ?? contactMessages.password.defaultMessage}
          {...getInputProps('password')}
        />
        <div className="actions">
          {passwordResetSent && (
            <Typography>
              {m[contactMessages.linkSent.id]({
                email: getValues().email,
              }) ?? contactMessages.linkSent.defaultMessage}
            </Typography>
          )}
          <Button
            disabled={authenticating}
            aria-label={m.auth_sendPasswordResetLink() ?? 'Send password reset link'}
            color="secondary"
            size="small"
            className="ml-1 mr-4"
            onClick={() => {
              void handlePasswordReset(getValues());
            }}
          >
            {passwordResetSent
              ? m.auth_passwordReset_resend() ?? 'Resend?'
              : m.auth_passwordReset_forgotPassword() ?? 'Forgot password?'}
          </Button>
          <Button
            disabled={authenticating}
            aria-label={m.auth_signIn() ?? 'Sign in'}
            onClick={handleSubmit(handleSignIn)}
          >
            {authenticating
              ? m.auth_signIn_processing() ?? 'Processing...'
              : m.auth_signIn_signIn() ?? 'Sign in'}
          </Button>
        </div>
      </form>
    </SignInFormContainer>
  );
};
