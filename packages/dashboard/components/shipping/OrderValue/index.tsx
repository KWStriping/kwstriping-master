import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import PriceField from '@dashboard/components/fields/PriceField';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableHead from '@dashboard/components/tables/TableHead';
import type { ShippingChannelsErrorFragment } from '@core/api/graphql';
import type { ChangeEvent } from '@dashboard/hooks/useForm';
import type { ChannelShippingData } from '@dashboard/oldSrc/channels/utils';
import { getFormChannelError, getFormChannelErrors } from '@dashboard/oldSrc/utils/errors';
import getShippingErrorMessage from '@dashboard/oldSrc/utils/errors/shipping';
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
  const { t } = useTranslation();
  const formErrors = getFormChannelErrors(['maximumOrderPrice', 'minimumOrderPrice'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.orderValue', 'Order Value')} />
      <div className={styles.content ?? ''}>
        <div className={styles.subheader ?? ''}>
          <ControlledCheckbox
            name="orderValueRestricted"
            label={
              <>
                {t('dashboard.gp38J', 'Restrict order value')}
                <Typography variant="caption">
                  {t('dashboard.ZDHYr', 'This rate will apply to all orders')}
                </Typography>
              </>
            }
            checked={orderValueRestricted}
            onChange={onChange}
            disabled={disabled}
          />
          <Typography className={'mt-2'}>
            {t(
              'dashboard.channelsDiscountInfo',
              'Channels that don’t have assigned discounts will use their parent channel to define the price. Price will be converted to channel’s currency.'
            )}
          </Typography>
        </div>
        {orderValueRestricted && (
          <ResponsiveTable className={styles.table ?? ''}>
            <TableHead colSpan={numberOfColumns} disabled={disabled} items={[]}>
              <TableCell className={styles.colName ?? ''}>
                <span>{t('dashboard.channelName', 'Channel name')}</span>
              </TableCell>
              <TableCell className={styles.colType ?? ''}>
                <span>
                  <>
                    {/* min price in channel */}

                    {t('dashboard.FexL7', 'Min. value')}
                  </>
                </span>
              </TableCell>
              <TableCell className={styles.colType ?? ''}>
                <span>
                  <>
                    {t(
                      'dashboard.R/yBq',
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
                        label={t('dashboard.N6SLs', 'Min Value')}
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
                        label={t('dashboard.jsfyn', 'Max Value')}
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
