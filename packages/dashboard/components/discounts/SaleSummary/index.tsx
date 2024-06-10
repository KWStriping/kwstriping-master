import { useTranslation } from '@core/i18n';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CardTitle from '@dashboard/components/core/CardTitle';
import Date from '@dashboard/components/core/Date';
import Money from '@dashboard/components/core/Money';
import Percent from '@dashboard/components/core/Percent';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { SaleType } from '@core/api/constants';
import type { SaleDetailsFragment } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ChannelProps } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { ReactNode, FC } from 'react';


//

export interface SaleSummaryProps extends ChannelProps {
  sale: Maybe<SaleDetailsFragment>;
}

const SaleSummary: FC<SaleSummaryProps> = ({ selectedChannelId, sale }) => {
  const { t } = useTranslation();

  const channel = sale?.channelListings?.find(
    (listing) => listing.channel.id === selectedChannelId
  );
  return (
    <Card>
      <CardTitle title={t('dashboard.ummary', 'Summary')} />
      <CardContent>
        <Typography variant="caption">
          <>
            {/* sale name */}

            {t('dashboard.56hOz', 'Name')}
          </>
        </Typography>
        <Typography className={styles.ellipsis ?? ''}>
          {maybe<ReactNode>(() => sale.name, <Skeleton />)}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">
          <>
            {/* sale value */}

            {t('dashboard.ZR590', 'Value')}
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

        <Typography variant="caption">{t('dashboard.startDate', 'Start Date')}</Typography>
        <Typography>
          {maybe<ReactNode>(
            () => (
              <Date date={sale.startDate} plain />
            ),
            <Skeleton />
          )}
        </Typography>
        <FormSpacer />

        <Typography variant="caption">{t('dashboard.ndDate', 'End Date')}</Typography>
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