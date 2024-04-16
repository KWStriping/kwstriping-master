import { useTranslation } from '@core/i18n';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import Date from '@dashboard/components/core/Date';
import Money from '@dashboard/components/core/Money';
import Percent from '@dashboard/components/core/Percent';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { DiscountValueType } from '@core/api/constants';
import type { VoucherDetailsFragment } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ChannelProps } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ReactNode, FC } from 'react';

import { translateVoucherTypes } from '@dashboard/oldSrc/discounts/translations';


export interface VoucherSummaryProps extends ChannelProps {
  voucher: Maybe<VoucherDetailsFragment>;
}

const VoucherSummary: FC<VoucherSummaryProps> = ({ selectedChannelId, voucher }) => {
  const { t } = useTranslation();

  const translatedVoucherTypes = translateVoucherTypes(t);
  const channel = voucher?.channelListings?.find(
    (listing) => listing.channel.id === selectedChannelId
  );

  return (
    <Card>
      <CardTitle title={t('dashboard.ummary', 'Summary')} />
      <CardContent>
        <Typography variant="caption">
          <>
            {/* voucher code */}

            {t('dashboard.sPIOX', 'Code')}
          </>
        </Typography>
        <Typography className={styles.ellipsis ?? ''}>
          {maybe<ReactNode>(() => voucher.code, <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {/* voucher */}

            {t('dashboard.cf60I', 'Applies to')}
          </>
        </Typography>
        <Typography>
          {maybe<ReactNode>(() => translatedVoucherTypes[voucher.type], <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {t(
              'dashboard.V+EiM',
              'Value'
              // voucher value
            )}
          </>
        </Typography>
        <Typography>
          {voucher ? (
            voucher.discountValueType === DiscountValueType.Fixed &&
            channel?.discountValue ? (
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

        <Typography variant="caption">{t('dashboard.startDate', 'Start Date')}</Typography>
        <Typography>
          {maybe<ReactNode>(
            () => (
              <Date date={voucher.startDate} plain />
            ),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">{t('dashboard.ndDate', 'End Date')}</Typography>
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
              'dashboard.Oa+Xd',
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

            {t('dashboard.LqWXA', 'Usage Limit')}
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
