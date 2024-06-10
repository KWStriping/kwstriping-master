import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PriceField from '@tempo/dashboard/components/fields/PriceField';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import type { ShippingChannelsErrorFragment } from '@tempo/api/generated/graphql';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import type { ChannelShippingData } from '@tempo/dashboard/oldSrc/channels/utils';
import { getFormChannelError, getFormChannelErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getShippingErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/shipping';
import Card from '@mui/material/Card';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

interface Value {
  maxValue: string;
  minValue: string;
}
export interface OrderValueProps {
  channels: ChannelShippingData[];
  errors: Maybe<ShippingChannelsErrorFragment[]>;
  disabled: boolean;
  orderValueRestricted: boolean;
  onChange: (event: ChangeEvent) => void;
  onChannelsChange: (channelId: string, value: Value) => void;
}

const numberOfColumns = 3;

export const OrderValue: FC<OrderValueProps> = ({
  channels,
  errors,
  orderValueRestricted,
  disabled,
  onChannelsChange,
  onChange,
}) => {
  const formErrors = getFormChannelErrors(['maximumOrderPrice', 'minimumOrderPrice'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_orderValue() ?? 'Order Value'} />
      <div className={styles.content ?? ''}>
        <div className={styles.subheader ?? ''}>
          <ControlledCheckbox
            name="orderValueRestricted"
            label={
              <>
                {m.dashboard_gp__J() ?? 'Restrict order value'}
                <Typography variant="caption">
                  {m.dashboard_ZDHYr() ?? 'This rate will apply to all orders'}
                </Typography>
              </>
            }
            checked={orderValueRestricted}
            onChange={onChange}
            disabled={disabled}
          />
          <Typography className={'mt-2'}>
            {m.dashboard_channelsDiscountInfo() ??
              'Channels that don’t have assigned discounts will use their parent channel to define the price. Price will be converted to channel’s currency.'}
          </Typography>
        </div>
        {orderValueRestricted && (
          <ResponsiveTable className={styles.table ?? ''}>
            <TableHead colSpan={numberOfColumns} disabled={disabled} items={[]}>
              <TableCell className={styles.colName ?? ''}>
                <span>{m.dashboard_channelName() ?? 'Channel name'}</span>
              </TableCell>
              <TableCell className={styles.colType ?? ''}>
                <span>
                  <>
                    {/* min price in channel */}

                    {m.dashboard_FexL_() ?? 'Min. value'}
                  </>
                </span>
              </TableCell>
              <TableCell className={styles.colType ?? ''}>
                <span>
                  <>
                    {t(
                      'dashboard_R/yBq',
                      'Max. value'
                      // max price in channel
                    )}
                  </>
                </span>
              </TableCell>
            </TableHead>
            <TableBody>
              {channels?.map((channel) => {
                const minError = getFormChannelError(formErrors.minimumOrderPrice, channel.id);
                const maxError = getFormChannelError(formErrors.maximumOrderPrice, channel.id);

                return (
                  <TableRow key={channel.id}>
                    <TableCell>
                      <Typography>{channel.name}</Typography>
                    </TableCell>
                    <TableCell className={styles.price ?? ''}>
                      <PriceField
                        disabled={disabled}
                        error={!!minError}
                        label={m.dashboard_N_SLs() ?? 'Min Value'}
                        name={`minValue:${channel.name}`}
                        value={channel.minValue}
                        onChange={(e) =>
                          onChannelsChange(channel.id, {
                            ...channel,
                            minValue: e.target.value,
                          })
                        }
                        currencySymbol={channel.currency}
                        hint={minError && getShippingErrorMessage(minError, t)}
                      />
                    </TableCell>
                    <TableCell className={styles.price ?? ''}>
                      <PriceField
                        disabled={disabled}
                        error={!!maxError}
                        label={m.dashboard_jsfyn() ?? 'Max Value'}
                        name={`maxValue:${channel.name}`}
                        value={channel.maxValue}
                        InputProps={{ inputProps: { min: channel.minValue } }}
                        onChange={(e) =>
                          onChannelsChange(channel.id, {
                            ...channel,
                            maxValue: e.target.value,
                          })
                        }
                        currencySymbol={channel.currency}
                        hint={maxError && getShippingErrorMessage(maxError, t)}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </ResponsiveTable>
        )}
      </div>
    </Card>
  );
};

export default OrderValue;
