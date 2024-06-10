import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import PriceField from '@dashboard/components/fields/PriceField';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableHead from '@dashboard/components/tables/TableHead';
import type { ShippingChannelsErrorFragment } from '@core/api/graphql';
import type { ChannelShippingData } from '@dashboard/oldSrc/channels/utils';
import { getFormChannelError, getFormChannelErrors } from '@dashboard/oldSrc/utils/errors';
import getShippingErrorMessage from '@dashboard/oldSrc/utils/errors/shipping';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

interface Value {
  maxValue: string;
  minValue: string;
  price: string;
}

export interface PricingCardProps {
  channels: ChannelShippingData[];
  errors: Maybe<ShippingChannelsErrorFragment[]>;
  disabled: boolean;
  onChange: (channelId: string, value: Value) => void;
}

const numberOfColumns = 2;

export const PricingCard: FC<PricingCardProps> = ({ channels, disabled, errors, onChange }) => {
  const { t } = useTranslation();
  const formErrors = getFormChannelErrors(['price'], errors);
  return (
    <Card>
      <CardTitle title={t('dashboard.pricingCardTitle', 'Pricing')} />
      <CardContent className={styles.pricingContent ?? ''}>
        <Typography variant="caption" className={styles.caption ?? ''}>
          {t(
            'dashboard.pricingCardInfoText',
            'Channels that don’t have assigned prices will use their parent channel to define the price. Price will be converted to channel’s currency.'
          )}
        </Typography>
        <ResponsiveTable className={styles.table ?? ''}>
          <TableHead colSpan={numberOfColumns} disabled={disabled} items={[]}>
            <TableCell className={styles.colName ?? ''}>
              <span>{t('dashboard.channelNameColumnTitle', 'Channel name')}</span>
            </TableCell>
            <TableCell className={styles.colType ?? ''}>
              <span>{t('dashboard.priceColumnTitle', 'Price')}</span>
            </TableCell>
          </TableHead>
          <TableBody>
            {channels?.map((channel) => {
              const error = getFormChannelError(formErrors.price, channel.id);

              return (
                <TableRow key={channel.id}>
                  <TableCell>
                    <Typography>{channel.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <PriceField
                      disabled={disabled}
                      error={!!error}
                      label={t('dashboard.priceColumnTitle', 'Price')}
                      name="price"
                      value={channel.price}
                      onChange={(e) =>
                        onChange(channel.id, {
                          ...channel,
                          price: e.target.value,
                        })
                      }
                      currencySymbol={channel.currency}
                      required
                      hint={error && getShippingErrorMessage(error, t)}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
