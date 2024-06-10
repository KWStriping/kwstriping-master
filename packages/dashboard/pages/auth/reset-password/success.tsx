import { useRouter } from 'next/router';

import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Typography from '@mui/material/Typography';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { getAppMountPath } from '@dashboard/oldSrc/config';

export interface ResetPasswordSuccessPageFormData {
  email: string;
}

const ResetPasswordSuccessView = () => {
  const router = useRouter();
  const onBack = () => router.push(getAppMountPath());
  const { t } = useTranslation();
  const styles = {};

  return (
    <>
      <Typography variant="h3" className={styles.header ?? ''}>
        {t('dashboard.y/yDL', 'Reset password')}
      </Typography>
      <Typography>
        <>
          {t(
            'dashboard.ob30/',
            'Success! In a few minutes you’ll receive a message with instructions on how to reset your password.'
          )}
        </>
      </Typography>
      <FormSpacer />
      <Button className={styles.submit ?? ''} color="primary" onClick={onBack} type="submit">
        <>
          {/* button */}

          {t('dashboard.oyWT9', 'Back to login')}
        </>
      </Button>
    </>
  );
};
export default ResetPasswordSuccessView;
