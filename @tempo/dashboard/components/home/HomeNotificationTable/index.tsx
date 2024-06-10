import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import Link from '@tempo/ui/components/Link';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
// import Link from '@tempo/ui/components/Link';
import RequirePermissions from '@tempo/dashboard/components/core/RequirePermissions';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import { PermissionCode } from '@tempo/api/generated/constants';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

interface HomeNotificationTableProps {
  ordersToCapture: Maybe<number>;
  ordersToConfirm: Maybe<number>;
  ordersToFulfill: Maybe<number>;
  productsOutOfStock: Maybe<number>;
  createNewChannelHref: string;
  ordersToConfirmHref: string;
  ordersToFulfillHref: string;
  ordersToCaptureHref: string;
  productsOutOfStockHref: string;
  noChannel: boolean;
}

const HomeNotificationTable: FC<HomeNotificationTableProps> = ({
  createNewChannelHref,
  ordersToFulfillHref,
  ordersToConfirmHref,
  ordersToCaptureHref,
  productsOutOfStockHref,
  ordersToCapture,
  ordersToConfirm,
  ordersToFulfill,
  productsOutOfStock,
  noChannel,
}) => {
  const { enableStockTracking } = useShopSettings();
  return (
    <Card className={styles.tableCard ?? ''}>
      <ResponsiveTable>
        <TableBody>
          {noChannel && (
            <RequirePermissions requiredPermissions={[PermissionCode.ManageChannels]}>
              <TableRow hover={true}>
                <TableCell>
                  <Link href={createNewChannelHref}>
                    <Typography>
                      {m.dashboard_createNewChannel() ?? 'Create new channel'}
                    </Typography>
                  </Link>
                </TableCell>
                <TableCell className={styles.arrowIcon ?? ''}>
                  <Link href={createNewChannelHref}>
                    <KeyboardArrowRight />
                  </Link>
                </TableCell>
              </TableRow>
            </RequirePermissions>
          )}
          <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
            <TableRow hover={true}>
              <TableCell data-test-id="orders-to-accept">
                {ordersToConfirm == null ? (
                  <Skeleton />
                ) : (
                  <Link href={ordersToConfirmHref} disabled={!ordersToConfirm}>
                    <Typography className={clsx(!ordersToConfirm && 'text-disabled')}>
                      <Trans
                        t={t}
                        i18nKey={'dashboard.ordersReadyToConfirm'}
                        count={ordersToConfirm}
                      >
                        {ordersToConfirm === 1
                          ? 'One order awaits acceptance'
                          : '<strong>{{count}}</strong> orders awaiting confirmation'}
                      </Trans>
                    </Typography>
                  </Link>
                )}
              </TableCell>
              <TableCell className={styles.arrowIcon ?? ''}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRow>
            <TableRow hover={true}>
              <TableCell data-test-id="orders-to-fulfill">
                {ordersToFulfill == null ? (
                  <Skeleton />
                ) : ordersToFulfill === 0 ? (
                  <Typography className={'text-disabled'}>
                    {m.dashboard_noOrdersReadyToFulfill() ?? 'No orders ready to fulfill'}
                  </Typography>
                ) : (
                  <Link href={ordersToFulfillHref}>
                    <Typography>
                      <Trans
                        t={t}
                        i18nKey={'dashboard.ordersReadyToFulfill'}
                        count={ordersToFulfill}
                      >
                        {`<strong>{{count}}</strong> ${
                          ordersToFulfill === 1 ? 'order is' : 'orders are'
                        } ready to fulfill`}
                      </Trans>
                    </Typography>
                  </Link>
                )}
              </TableCell>
              <TableCell className={styles.arrowIcon ?? ''}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRow>
            <TableRow hover={true}>
              <TableCell data-test-id="orders-to-capture">
                {ordersToCapture == null ? (
                  <Skeleton />
                ) : (
                  <Link href={ordersToCaptureHref} disabled={!ordersToCapture}>
                    <Typography className={clsx(!ordersToCapture && 'text-disabled')}>
                      <Trans
                        t={t}
                        i18nKey={'dashboard.paymentsToCapture'}
                        count={ordersToCapture}
                      >
                        {ordersToCapture === 1
                          ? '<strong>1</strong> payment to capture'
                          : '<strong>{{count}}</strong> payments to capture'}
                      </Trans>
                    </Typography>
                  </Link>
                )}
              </TableCell>
              <TableCell className={styles.arrowIcon ?? ''}>
                <KeyboardArrowRight />
              </TableCell>
            </TableRow>
          </RequirePermissions>
          {enableStockTracking && (
            <RequirePermissions requiredPermissions={[PermissionCode.ManageProducts]}>
              <TableRow hover={true}>
                <TableCell data-test-id="products-out-of-stock">
                  {productsOutOfStock == null ? (
                    <Skeleton />
                  ) : (
                    <Link href={productsOutOfStockHref} disabled={!productsOutOfStock}>
                      <Typography className={clsx(!productsOutOfStock && 'text-disabled')}>
                        <Trans
                          t={t}
                          i18nKey={'dashboard.productsOutOfStock'}
                          count={productsOutOfStock}
                        >
                          {productsOutOfStock === 1
                            ? '<strong>1</strong> product out of stock'
                            : '<strong>{{count}}</strong> products out of stock'}
                        </Trans>
                      </Typography>
                    </Link>
                  )}
                </TableCell>
                <TableCell className={styles.arrowIcon ?? ''}>
                  <KeyboardArrowRight />
                </TableCell>
              </TableRow>
            </RequirePermissions>
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
HomeNotificationTable.displayName = 'HomeNotificationTable';
export default HomeNotificationTable;
