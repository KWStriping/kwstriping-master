import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
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

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_SJRiZ() ?? 'Channel Status' // channel status title
        }
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

              {m.dashboard_iN_hv() ?? 'Active'}
            </>
          ) : (
            <>
              {/* inactive */}

              {m.dashboard__qjg_() ?? 'Inactive'}
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

              {m.dashboard_HVglr() ?? 'Deactivate'}
            </>
          ) : (
            <>
              {/* activate */}

              {m.dashboard_QwT_W() ?? 'Activate'}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

ChannelStatus.displayName = 'ChannelStatus';
export default ChannelStatus;
