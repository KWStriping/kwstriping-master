import * as m from '@paraglide/messages';
import { RequestPasswordResetDocument } from '@tempo/api/generated/graphql';
import { passwordResetSuccessUrl } from '@tempo/api/auth/urls';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { extractMutationErrors } from '@tempo/api/utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import ResetPasswordPage from '@tempo/dashboard/components/auth/ResetPasswordPage';
import type { ResetPasswordPageFormData } from '@tempo/dashboard/components/auth/ResetPasswordPage';

const ResetPasswordView = () => {
  const [error, setError] = useState<string>();
  const router = useRouter();

  const [requestPasswordReset, requestPasswordResetOpts] = useMutation(
    RequestPasswordResetDocument,
    {
      onCompleted: (data) => {
        if (data?.requestPasswordReset?.errors?.length === 0) {
          void router.push(passwordResetSuccessUrl);
        } else {
          if (data?.requestPasswordReset?.errors?.find((err) => err.field === 'email')) {
            setError(
              m.dashboard__JLNW() ?? 'Provided email address does not exist in our database.'
            );
          } else {
            setError(m.dashboard_somethingWentWrong() ?? 'Tempo ran into an unexpected problem');
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
