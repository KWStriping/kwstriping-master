import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import Pill from '@core/ui/components/pill/Pill';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import FormattedDateTime from '@dashboard/components/core/Date';
import Money from '@dashboard/components/core/Money';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import type { CustomerDetailsQuery } from '@core/api/graphql';
import { transformPaymentStatus } from '@dashboard/oldSrc/misc';
import { orderUrl } from '@dashboard/oldSrc/orders/urls';
import type { RelayToFlat } from '@dashboard/oldSrc/types';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

const useStyles = makeStyles(
  {
    link: {
      cursor: 'pointer',
    },
    textRight: {
      textAlign: 'right',
    },
  },
  { name: 'CustomerOrders' }
);

export interface CustomerOrdersProps {
  orders: RelayToFlat<CustomerDetailsQuery['user']['orders']>;
  viewAllHref: string;
}

const CustomerOrders: FC<CustomerOrdersProps> = (props) => {
  const { orders, viewAllHref } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  const orderList = orders
    ? orders.map((order) => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, t),
      }))
    : undefined;
  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.LiVhv',
          'Recent Orders'
          // section header
        )}
        toolbar={
          <Button color="secondary" href={viewAllHref}>
            <>
              {t(
                'dashboard.+990c',
                'View all orders'
                // button
              )}
            </>
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <>
                {/* number of order */}

                {t('dashboard.TF6tG', 'No. of Order')}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* order placement date */}

                {t('dashboard.i3kK9', 'Date')}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* order status */}

                {t('dashboard.URrk1', 'Status')}
              </>
            </TableCell>
            <TableCell className={styles.textRight ?? ''}>
              <>
                {t(
                  'dashboard.aX/V3',
                  'Total'
                  // order total amount
                )}
              </>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            orderList,
            (order) => (
              <TableRow
                hover={!!order}
                className={order ? styles.link : undefined}
                href={order && orderUrl(order.id)}
                key={order ? order.id : 'skeleton'}
              >
                <TableCell>{order.number ? '#' + order.number : <Skeleton />}</TableCell>
                <TableCell>
                  {order.created ? <FormattedDateTime date={order.created} /> : <Skeleton />}
                </TableCell>
                <TableCell>
                  {order.paymentStatus.status !== undefined ? (
                    order.paymentStatus.status === null ? null : (
                      <Pill
                        color={order.paymentStatus.status}
                        label={order.paymentStatus.localized}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.textRight ?? ''} align="right">
                  {order.total.gross ? <Money money={order.total.gross} /> : <Skeleton />}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={6}>{t('dashboard.lfqSV', 'No orders found')}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

CustomerOrders.displayName = 'CustomerOrders';
export default CustomerOrders;
