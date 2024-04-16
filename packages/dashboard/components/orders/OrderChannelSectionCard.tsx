import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { ChannelFragment } from '@core/api/graphql';
import { channelUrl } from '@dashboard/oldSrc/channels/urls';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

export interface OrderChannelSectionCardProps {
  channel?: Pick<ChannelFragment, 'id' | 'name'>;
}

export const OrderChannelSectionCard: FC<OrderChannelSectionCardProps> = ({ channel }) => {
  const { t } = useTranslation();

  return (
    <Card data-test-id="order-sales-channel">
      <CardTitle
        title={t(
          'dashboard.Y0HAT',
          'Sales channel'
          // section header
        )}
      />
      <CardContent>
        {!channel ? (
          <Skeleton />
        ) : (
          <Typography>
            <Link href={channelUrl(channel.id) ?? ''} disabled={!channel.id}>
              {channel.name ?? '...'}
            </Link>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
OrderChannelSectionCard.displayName = 'OrderChannelSectionCard';
export default OrderChannelSectionCard;
