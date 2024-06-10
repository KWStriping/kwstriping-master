import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import CardTitle from '@dashboard/components/core/CardTitle';
import RequirePermissions from '@dashboard/components/core/RequirePermissions';
import type { PermissionCode } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC, ReactNode } from 'react';

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
  const { t } = useTranslation();
  const channelsAvailabilityText = t(
    'dashboard.Y2lpx',
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
          title={t('dashboard.channelsAvailabilitySectionHeader', 'Availability')}
          toolbar={
            <RequirePermissions requiredPermissions={managePermissions}>
              <Button onClick={openModal} data-test-id="channels-availability-manage-button">
                {t('dashboard.manageChannelsAvailabilitySectionHeaderButton', 'Manage')}
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
