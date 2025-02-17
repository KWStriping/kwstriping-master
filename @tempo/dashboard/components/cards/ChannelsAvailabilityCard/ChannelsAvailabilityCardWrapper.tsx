import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type { PermissionCode } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';
import RequirePermissions from '@tempo/dashboard/components/core/RequirePermissions';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface ChannelsAvailabilityWrapperProps {
  selectedChannelsCount: number;
  allChannelsCount: Maybe<number>;
  children: ReactNode;
  managePermissions: PermissionCode[];
  openModal: () => void;
}

export const ChannelsAvailabilityWrapper: FC<ChannelsAvailabilityWrapperProps> = ({
  selectedChannelsCount,
  allChannelsCount,
  children,
  managePermissions,
  openModal,
}) => {
  const channelsAvailabilityText = t(
    'dashboard_Y2lpx',
    `Available at {{selectedChannelsCount}} out of {{count}} ${
      allChannelsCount === 1 ? 'channel' : 'channels'
    }`,
    {
      count: allChannelsCount,
      selectedChannelsCount,
    }
  );

  return (
    <>
      <Card>
        <CardTitle
          title={m.dashboard_channelsAvailabilitySectionHeader() ?? 'Availability'}
          toolbar={
            <RequirePermissions requiredPermissions={managePermissions}>
              <Button onClick={openModal} data-test-id="channels-availability-manage-button">
                {m.dashboard_manageChannelsAvailabilitySectionHeaderButton() ?? 'Manage'}
              </Button>
            </RequirePermissions>
          }
        />
        <CardContent
          sx={{
            '&:last-child': {
              paddingBottom: 0,
            },
            paddingTop: 0,
          }}
        >
          {!!channelsAvailabilityText && (
            <>
              <Typography
                sx={{
                  fontSize: 14,
                  padding: (theme) => theme.spacing(2, 0),
                }}
              >
                {channelsAvailabilityText}
              </Typography>
              <Divider sx={{ position: 'relative' }} />
            </>
          )}
          {children}
        </CardContent>
      </Card>
    </>
  );
};

export default ChannelsAvailabilityWrapper;
