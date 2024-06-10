import * as m from '@paraglide/messages';
import { RequestPasswordResetDocument } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import { PasswordInput } from '@tempo/ui/components/PasswordInput';
import { useErrorMessages } from '@tempo/ui/hooks/useErrorMessages';
import { useGetInputProps } from '@tempo/ui/hooks/useGetInputProps';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useValidationResolver } from '@tempo/utils';
import { useQueryParams } from '@tempo/utils/url';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { object, string } from 'yup';
import { useSubmit } from '@tempo/checkout/hooks/useSubmit';
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
      title={m[contactMessages.resetPassword.id] ?? contactMessages.resetPassword.defaultMessage}
      redirectSubtitle={
        m[contactMessages.rememberedYourPassword.id] ??
        contactMessages.rememberedYourPassword.defaultMessage
      }
      redirectButtonLabel={m[contactMessages.signIn.id] ?? contactMessages.signIn.defaultMessage}
      onSectionChange={onSectionChange}
      subtitle={
        m[contactMessages.providePassword.id] ?? contactMessages.providePassword.defaultMessage
      }
    >
      <PasswordInput
        label={m[contactMessages.password.id] ?? contactMessages.password.defaultMessage}
        {...getInputProps('password')}
      />
      <div className="mt-4 actions">
        <Button
          aria-label={
            m[contactLabels.resetPassword.id] ?? contactLabels.resetPassword.defaultMessage
          }
          onClick={handleSubmit(onSubmit)}
        >
          {m[contactMessages.resetPassword.id] ?? contactMessages.resetPassword.defaultMessage}
        </Button>
      </div>
    </SignInFormContainer>
  );
};
