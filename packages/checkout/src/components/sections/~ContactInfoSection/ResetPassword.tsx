import { RequestPasswordResetDocument } from '@core/api';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { PasswordInput } from '@core/ui/components/PasswordInput';
import { useErrorMessages } from '@core/ui/hooks/useErrorMessages';
import { useGetInputProps } from '@core/ui/hooks/useGetInputProps';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useValidationResolver } from '@core/utils';
import { useQueryParams } from '@core/utils/url';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useSubmit } from '@core/checkout/hooks/useSubmit';
import { contactLabels, contactMessages } from './messages';
import type { SignInFormContainerProps } from './SignInFormContainer';
import { SignInFormContainer } from './SignInFormContainer';

interface ResetPasswordProps extends Pick<SignInFormContainerProps, 'onSectionChange'> {
  onResetPasswordSuccess: () => void;
}

interface ResetPasswordFormData {
  password: string;
}

export const ResetPassword: FC<ResetPasswordProps> = ({
  onSectionChange,
  onResetPasswordSuccess,
}) => {
  const { t } = useTranslation();
  const { errorMessages } = useErrorMessages();
  const router = useRouter();
  const [passwordReset] = useMutation(RequestPasswordResetDocument);

  const schema = object({
    password: string().required(errorMessages.required),
  });

  const resolver = useValidationResolver(schema);
  const { handleSubmit, ...rest } = useForm<ResetPasswordFormData>({ resolver });

  const getInputProps = useGetInputProps(rest as any); // TODO: fix types

  const onSubmit = useSubmit<ResetPasswordFormData, typeof passwordReset>({
    onSubmit: passwordReset,
    scope: 'resetPassword',
    formDataParse: ({ password }) => {
      const { passwordResetEmail, passwordResetToken, channel, redirectUrl } = useQueryParams();
      const email = passwordResetEmail || '';
      const token = passwordResetToken || '';
      return { channel, redirectUrl: redirectUrl ?? '', password, email, token };
    },
    onSuccess: () => {
      const { pathname, query } = router;
      delete router.query.passwordResetToken;
      delete router.query.passwordResetEmail;
      router.replace({ pathname, query }, undefined, { shallow: true });
      onResetPasswordSuccess();
    },
  });

  return (
    <SignInFormContainer
      title={t(contactMessages.resetPassword.id, contactMessages.resetPassword.defaultMessage)}
      redirectSubtitle={t(
        contactMessages.rememberedYourPassword.id,
        contactMessages.rememberedYourPassword.defaultMessage
      )}
      redirectButtonLabel={t(contactMessages.signIn.id, contactMessages.signIn.defaultMessage)}
      onSectionChange={onSectionChange}
      subtitle={t(
        contactMessages.providePassword.id,
        contactMessages.providePassword.defaultMessage
      )}
    >
      <PasswordInput
        label={t(contactMessages.password.id, contactMessages.password.defaultMessage)}
        {...getInputProps('password')}
      />
      <div className="mt-4 actions">
        <Button
          aria-label={t(
            contactLabels.resetPassword.id,
            contactLabels.resetPassword.defaultMessage
          )}
          onClick={handleSubmit(onSubmit)}
        >
          {t(contactMessages.resetPassword.id, contactMessages.resetPassword.defaultMessage)}
        </Button>
      </div>
    </SignInFormContainer>
  );
};
