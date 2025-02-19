import * as m from '@paraglide/messages';
import { DiscountValueType } from '@tempo/api/generated/constants';
import type { VoucherDetailsFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ReactNode, FC } from 'react';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Date from '@tempo/dashboard/components/core/Date';
import Money from '@tempo/dashboard/components/core/Money';
import Percent from '@tempo/dashboard/components/core/Percent';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type { ChannelProps } from '@tempo/dashboard/oldSrc/types';

import { translateVoucherTypes } from '@tempo/dashboard/oldSrc/discounts/translations';

export interface VoucherSummaryProps extends ChannelProps {
  voucher: Maybe<VoucherDetailsFragment>;
}

const VoucherSummary: FC<VoucherSummaryProps> = ({ selectedChannelId, voucher }) => {
  const translatedVoucherTypes = translateVoucherTypes(t);
  const channel = voucher?.channelListings?.find(
    (listing) => listing.channel.id === selectedChannelId
  );

  return (
    <Card>
      <CardTitle title={m.dashboard_ummary() ?? 'Summary'} />
      <CardContent>
        <Typography variant="caption">
          <>
            {/* voucher code */}

            {m.dashboard_sPIOX() ?? 'Code'}
          </>
        </Typography>
        <Typography className={styles.ellipsis ?? ''}>
          {maybe<ReactNode>(() => voucher.code, <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {/* voucher */}

            {m.dashboard_cf__I() ?? 'Applies to'}
          </>
        </Typography>
        <Typography>
          {maybe<ReactNode>(() => translatedVoucherTypes[voucher.type], <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {t(
              'dashboard_V+EiM',
              'Value'
              // voucher value
            )}
          </>
        </Typography>
        <Typography>
          {voucher ? (
            voucher.discountValueType === DiscountValueType.Fixed && channel?.discountValue ? (
              <Money
                money={{
                  amount: channel?.discountValue,
                  currency: channel?.channel.currencyCode,
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
              <Date date={voucher.startDate} plain />
            ),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">{m.dashboard_ndDate() ?? 'End Date'}</Typography>
        <Typography>
          {maybe<ReactNode>(
            () => (voucher.endDate === null ? '-' : <Date date={voucher.endDate} plain />),
            <Skeleton />
          )}
        </Typography>

        <CardSpacer />
        <Divider />
        <CardSpacer />

        <Typography variant="caption">
          <>
            {t(
              'dashboard_Oa+Xd',
              'Min. Order Value'
              // voucher value requirement
            )}
          </>
        </Typography>
        <Typography>
          {voucher ? channel?.minSpent ? <Money money={channel.minSpent} /> : '-' : <Skeleton />}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {/* voucher value requirement */}

            {m.dashboard_LqWXA() ?? 'Usage Limit'}
          </>
        </Typography>
        <Typography>
          {maybe<ReactNode>(
            () => (voucher.usageLimit === null ? '-' : voucher.usageLimit),
            <Skeleton />
          )}
        </Typography>
      </CardContent>
    </Card>
  );
};
VoucherSummary.displayName = 'VoucherSummary';
export default VoucherSummary;
