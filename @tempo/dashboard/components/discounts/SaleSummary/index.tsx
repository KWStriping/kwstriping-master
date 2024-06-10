import * as m from '@paraglide/messages';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Date from '@tempo/dashboard/components/core/Date';
import Money from '@tempo/dashboard/components/core/Money';
import Percent from '@tempo/dashboard/components/core/Percent';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { SaleType } from '@tempo/api/generated/constants';
import type { SaleDetailsFragment } from '@tempo/api/generated/graphql';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type { ChannelProps } from '@tempo/dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ReactNode, FC } from 'react';

export interface SaleSummaryProps extends ChannelProps {
  sale: Maybe<SaleDetailsFragment>;
}

const SaleSummary: FC<SaleSummaryProps> = ({ selectedChannelId, sale }) => {
  const channel = sale?.channelListings?.find(
    (listing) => listing.channel.id === selectedChannelId
  );
  return (
    <Card>
      <CardTitle title={m.dashboard_ummary() ?? 'Summary'} />
      <CardContent>
        <Typography variant="caption">
          <>
            {/* sale name */}

            {m.dashboard___hOz() ?? 'Name'}
          </>
        </Typography>
        <Typography className={styles.ellipsis ?? ''}>
          {maybe<ReactNode>(() => sale.name, <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {/* sale value */}

            {m.dashboard_ZR___() ?? 'Value'}
          </>
        </Typography>
        <Typography>
          {sale ? (
            sale.type === SaleType.Fixed && channel?.discountValue ? (
              <Money
                money={{
                  amount: channel?.discountValue,
                  currency: channel?.currency,
                }}
              />
            ) : channel?.discountValue ? (
              <Percent amount={channel?.discountValue} />
            ) : (
              '-'
            )
          ) : (
            <Skeleton />
          )}
        </Typography>

        <CardSpacer />
        <Divider />
        <CardSpacer />

        <Typography variant="caption">{m.dashboard_startDate() ?? 'Start Date'}</Typography>
        <Typography>
          {maybe<ReactNode>(
            () => (
              <Date date={sale.startDate} plain />
            ),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">{m.dashboard_ndDate() ?? 'End Date'}</Typography>
        <Typography>
          {maybe<ReactNode>(
            () => (sale.endDate === null ? '-' : <Date date={sale.endDate} plain />),
            <Skeleton />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
SaleSummary.displayName = 'SaleSummary';
export default SaleSummary;
