import * as m from '@paraglide/messages';
import type { ShippingChannelsErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';
import getShippingErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/shipping';
import { getFormChannelError, getFormChannelErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import type { ChannelShippingData } from '@tempo/dashboard/oldSrc/channels/utils';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import PriceField from '@tempo/dashboard/components/fields/PriceField';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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
  const formErrors = getFormChannelErrors(['price'], errors);
  return (
    <Card>
      <CardTitle title={m.dashboard_pricingCardTitle() ?? 'Pricing'} />
      <CardContent className={styles.pricingContent ?? ''}>
        <Typography variant="caption" className={styles.caption ?? ''}>
          {m.dashboard_pricingCardInfoText() ??
            'Channels that don’t have assigned prices will use their parent channel to define the price. Price will be converted to channel’s currency.'}
        </Typography>
        <ResponsiveTable className={styles.table ?? ''}>
          <TableHead colSpan={numberOfColumns} disabled={disabled} items={[]}>
            <TableCell className={styles.colName ?? ''}>
              <span>{m.dashboard_channelNameColumnTitle() ?? 'Channel name'}</span>
            </TableCell>
            <TableCell className={styles.colType ?? ''}>
              <span>{m.dashboard_priceColumnTitle() ?? 'Price'}</span>
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
                      label={m.dashboard_priceColumnTitle() ?? 'Price'}
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
