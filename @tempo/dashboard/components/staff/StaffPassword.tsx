import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

interface StaffPasswordProps {
  onChangePassword: () => void;
}

const StaffPassword: FC<StaffPasswordProps> = ({ onChangePassword }) => {
  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_hDQel() ?? 'Password'
          // header
        }
        toolbar={
          <Button onClick={onChangePassword} data-test-id="changePasswordBtn">
            <>
              {/* button */}

              {m.dashboard__Zot_() ?? 'Change your password'}
            </>
          </Button>
        }
      />
      <CardContent>
        <Typography>
          <>
            {m.dashboard_m_CXe() ??
              'You should change your password every month to avoid security issues.'}
          </>
        </Typography>
      </CardContent>
    </Card>
  );
};

StaffPassword.displayName = 'StaffPassword';
export default StaffPassword;
