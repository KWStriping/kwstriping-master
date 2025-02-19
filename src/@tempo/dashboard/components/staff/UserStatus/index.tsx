import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode, ChangeEvent } from 'react';
import { ControlledCheckbox } from '@tempo/dashboard/components/forms/ControlledCheckbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface AppStatusProps {
  data: {
    isActive: boolean;
  };
  disabled: boolean;
  label: ReactNode;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const AppStatus: FC<AppStatusProps> = ({ data, disabled, label, onChange }) => {
  return (
    <Card>
      <CardTitle title={m.dashboard_serStatus() ?? 'User Status'} />
      <CardContent>
        <Typography variant="body2">
          {m.dashboard_serDisableInstruction() ??
            'If you want to disable this User please uncheck the box below.'}
        </Typography>
        <ControlledCheckbox
          checked={data?.isActive}
          disabled={disabled}
          label={label}
          name="isActive"
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
AppStatus.displayName = 'AppStatus';
export default AppStatus;
