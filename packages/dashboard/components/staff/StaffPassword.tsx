import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import CardTitle from '@dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface StaffPasswordProps {
  onChangePassword: () => void;
}

const StaffPassword: FC<StaffPasswordProps> = ({ onChangePassword }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.hDQel',
          'Password'
          // header
        )}
        toolbar={
          <Button onClick={onChangePassword} data-test-id="changePasswordBtn">
            <>
              {/* button */}

              {t('dashboard.3Zot1', 'Change your password')}
            </>
          </Button>
        }
      />
      <CardContent>
        <Typography>
          <>
            {t(
              'dashboard.m0CXe',
              'You should change your password every month to avoid security issues.'
            )}
          </>
        </Typography>
      </CardContent>
    </Card>
  );
};

StaffPassword.displayName = 'StaffPassword';
export default StaffPassword;
