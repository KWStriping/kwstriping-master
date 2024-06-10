import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import { ControlledCheckbox } from '@dashboard/components/forms/ControlledCheckbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode, ChangeEvent } from 'react';

interface AppStatusProps {
  data: {
    isActive: boolean;
  };
  disabled: boolean;
  label: ReactNode;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const AppStatus: FC<AppStatusProps> = ({ data, disabled, label, onChange }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.serStatus', 'User Status')} />
      <CardContent>
        <Typography variant="body2">
          {t(
            'dashboard.serDisableInstruction',
            'If you want to disable this User please uncheck the box below.'
          )}
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
