import type { UrlObject } from 'url';
import { useTranslation } from '@core/i18n';
import Button from '@core/ui/components/buttons/Button';

import IconButton from '@core/ui/components/buttons/IconButton';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import Money from '@dashboard/components/core/Money';
import MoneyRange from '@dashboard/components/core/MoneyRange';
import WeightRange from '@dashboard/components/core/WeightRange';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { ShippingZoneDetailsFragment } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ChannelProps } from '@dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useRouter } from 'next/router';
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
  const { t } = useTranslation();
  return (
    <Card>
      <CardTitle
        title={t('dashboard.rates', 'Rates')}
        toolbar={
          <Button disabled={disabled} onClick={onRateAdd} data-test-id={testId}>
            {t('dashboard.createRate', 'Create rate')}
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell className={styles.nameColumn ?? ''}>
              {t('dashboard.rateName', 'Name')}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {t('dashboard.shippingMethodValueRange', 'Value Range')}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {t('dashboard.shippingMethodWeightRange', 'Weight Range')}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {t('dashboard.minDeliveryDays', 'Min days')}
            </TableCell>
            <TableCell className={styles.valueColumn ?? ''}>
              {t('dashboard.maxDeliveryDays', 'Max days')}
            </TableCell>
            <TableCell className={styles.nameColumn ?? ''}>
              {t('dashboard.shippingMethodPrice', 'Price')}
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
                  {t('dashboard.UzdUH', 'No shipping rates found')}
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
