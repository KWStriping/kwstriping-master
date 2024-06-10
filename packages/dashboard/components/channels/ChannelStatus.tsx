import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import CardTitle from '@dashboard/components/core/CardTitle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import { useStyles } from './styles';

export interface ChannelStatusProps {
  isActive: boolean;
  disabled: boolean;
  updateChannelStatus: () => void;
}

export const ChannelStatus: FC<ChannelStatusProps> = ({
  disabled,
  isActive,
  updateChannelStatus,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.SJRiZ',
          'Channel Status'
          // channel status title
        )}
      />
      <CardContent>
        <Typography variant="caption" className={styles.label ?? ''}>
          <>
            {t(
              '+tIkAe',
              'Status'
              // status
            )}
          </>
        </Typography>
        <Typography>
          {isActive ? (
            <>
              {/* active */}

              {t('dashboard.iN4hv', 'Active')}
            </>
          ) : (
            <>
              {/* inactive */}

              {t('dashboard.8qjg3', 'Inactive')}
            </>
          )}
        </Typography>
        <Button
          className={styles.activeBtn ?? ''}
          disabled={disabled}
          onClick={() => updateChannelStatus()}
        >
          {isActive ? (
            <>
              {/* deactivate */}

              {t('dashboard.HVglr', 'Deactivate')}
            </>
          ) : (
            <>
              {/* activate */}

              {t('dashboard.QwT1W', 'Activate')}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

ChannelStatus.displayName = 'ChannelStatus';
export default ChannelStatus;
