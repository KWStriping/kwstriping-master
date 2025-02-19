import * as m from '@paraglide/messages';
import { useRouter } from 'next/navigation';

import { Button } from '@tempo/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { getAppMountPath } from '@tempo/dashboard/oldSrc/config';

export interface ResetPasswordSuccessPageFormData {
  email: string;
}

const ResetPasswordSuccessView = () => {
  const router = useRouter();
  const onBack = () => router.push(getAppMountPath());
  const styles = {};

  return (
    <>
      <Typography variant="h3" className={styles.header ?? ''}>
        {m.dashboard_y() / yDL ?? 'Reset password'}
      </Typography>
      <Typography>
        <>
          {t(
            'dashboard_ob30/',
            'Success! In a few minutes you’ll receive a message with instructions on how to reset your password.'
          )}
        </>
      </Typography>
      <FormSpacer />
      <Button className={styles.submit ?? ''} color="primary" onClick={onBack} type="submit">
        <>
          {/* button */}

          {m.dashboard_oyWT_() ?? 'Back to login'}
        </>
      </Button>
    </>
  );
};
export default ResetPasswordSuccessView;
