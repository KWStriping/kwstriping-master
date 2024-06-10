import * as m from '@paraglide/messages';
import type { UrlObject } from 'url';
// import { useTranslation } from '@tempo/next/i18n';
import Button from '@tempo/ui/components/buttons/Button';

import IconButton from '@tempo/ui/components/buttons/IconButton';
import { renderCollection } from '@tempo/ui/utils';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Money from '@tempo/dashboard/components/core/Money';
import MoneyRange from '@tempo/dashboard/components/core/MoneyRange';
import WeightRange from '@tempo/dashboard/components/core/WeightRange';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import type { ShippingZoneDetailsFragment } from '@tempo/api/generated/graphql';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type { ChannelProps } from '@tempo/dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/navigation';
import type { ReactNode, FC } from 'react';
import styles from './index.module.css';

export interface ShippingZoneRatesProps extends ChannelProps {
  disabled: boolean;
  rates: ShippingZoneDetailsFragment['shippingMethods'];
  testId?: string;
  onRateAdd: () => void;
  getRateEditHref: (id: string) => string | UrlObject;
  onRateRemove: (id: string) => void;
}

const ShippingZoneRates: FC<ShippingZoneRatesProps> = ({
  disabled,
  onRateAdd,
  getRateEditHref,
  onRateRemove,
  rates,
  selectedChannelId,
  testId,
}) => {
  const router = useRouter();
  return (
    <Card>
      <CardTitle
        title={m.dashboard_rates() ?? 'Rates'}
        toolbar={
          <Button disabled={disabled} onClick={onRateAdd} data-test-id={testId}>
            {m.dashboard_createRate() ?? 'Create rate'}
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell className={styles.nameColumn ?? ''}>
              {m.dashboard_rateName() ?? 'Name'}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {m.dashboard_shippingMethodValueRange() ?? 'Value Range'}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {m.dashboard_shippingMethodWeightRange() ?? 'Weight Range'}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {m.dashboard_minDeliveryDays() ?? 'Min days'}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {m.dashboard_maxDeliveryDays() ?? 'Max days'}
            </TableCell>
            <TableCell className={styles.nameColumn ?? ''}>
              {m.dashboard_shippingMethodPrice() ?? 'Price'}
            </TableCell>
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            rates,
            (rate) => {
              const channel = rate?.channelListings?.find(
                (listing) => listing.channel.id === selectedChannelId
              );
              return (
                <TableRow
                  hover={!!rate}
                  key={rate ? rate.id : 'skeleton'}
                  href={rate && getRateEditHref(rate.id)}
                >
                  <TableCell className={styles.nameColumn ?? ''}>
                    {maybe<ReactNode>(() => rate.name, <Skeleton />)}
                  </TableCell>
                  <TableCell>
                    {maybe<ReactNode>(
                      () =>
                        rate && !channel ? (
                          '-'
                        ) : (
                          <MoneyRange
                            from={channel?.minimumOrderPrice}
                            to={channel?.maximumOrderPrice}
                          />
                        ),
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell>
                    {maybe<ReactNode>(
                      () =>
                        rate && !channel ? (
                          '-'
                        ) : (
                          <WeightRange
                            from={rate.minimumOrderWeight}
                            to={rate.maximumOrderWeight}
                          />
                        ),
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell>{rate.minimumDeliveryDays}</TableCell>
                  <TableCell>{rate.maximumDeliveryDays}</TableCell>
                  <TableCell data-test-id="shipping-rate-price">
                    {maybe<ReactNode>(
                      () => (rate && !channel ? '-' : <Money money={channel.price} />),
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      disabled={disabled}
                      onClick={() => router.push(getRateEditHref(rate.id))}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton disabled={disabled} onClick={() => onRateRemove(rate.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={5}>
                  {m.dashboard_UzdUH() ?? 'No shipping rates found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
ShippingZoneRates.displayName = 'ShippingZoneRates';
export default ShippingZoneRates;
