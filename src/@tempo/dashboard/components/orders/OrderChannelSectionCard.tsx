import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import type { ChannelFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import { channelUrl } from '@tempo/dashboard/oldSrc/channels/urls';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface OrderChannelSectionCardProps {
  channel?: Pick<ChannelFragment, 'id' | 'name'>;
}

export const OrderChannelSectionCard: FC<OrderChannelSectionCardProps> = ({ channel }) => {
  return (
    <Card data-test-id="order-sales-channel">
      <CardTitle
        title={
          m.dashboard_Y_HAT() ?? 'Sales channel'
          // section header
        }
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
