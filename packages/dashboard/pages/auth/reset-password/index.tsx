import { RequestPasswordResetDocument } from '@core/api';
import { passwordResetSuccessUrl } from '@core/auth/urls';
import { useTranslation } from '@core/i18n';
import { useMutation } from '@core/urql/hooks/useMutation';
import { extractMutationErrors } from '@core/urql/utils';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ResetPasswordPage from '@dashboard/components/auth/ResetPasswordPage';
import type { ResetPasswordPageFormData } from '@dashboard/components/auth/ResetPasswordPage';

const ResetPasswordView = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();
  const { t } = useTranslation();

  const [requestPasswordReset, requestPasswordResetOpts] = useMutation(
    RequestPasswordResetDocument,
    {
      onCompleted: (data) => {
        if (data?.requestPasswordReset?.errors?.length === 0) {
          void router.push(passwordResetSuccessUrl);
        } else {
          if (data?.requestPasswordReset?.errors?.find((err) => err.field === 'email')) {
            setError(
              t('dashboard.0JLNW', 'Provided email address does not exist in our database.')
            );
          } else {
            setError(t('dashboard.somethingWentWrong', 'Tempo ran into an unexpected problem'));
          }
        }
      },
    }
  );

  const handleSubmit = (data: ResetPasswordPageFormData) =>
    extractMutationErrors(
      requestPasswordReset({
        email: data?.email,
        // TODO
        // redirectUrl: urlJoin(
        //   window.location.origin,
        //   getAppMountPathForRedirect(),
        //   newPasswordUrl().replace(/\?/, '')
        // ),
      })
    );

  return (
    <ResetPasswordPage
      disabled={requestPasswordResetOpts.fetching}
      error={error}
      onSubmit={handleSubmit}
    />
  );
};
export default ResetPasswordView;
