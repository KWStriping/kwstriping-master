import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import Pill from '@tempo/ui/components/pill/Pill';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import type { CustomerDetailsQuery } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import { orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import { transformPaymentStatus } from '@tempo/dashboard/oldSrc/misc';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import Money from '@tempo/dashboard/components/core/Money';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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

  const orderList = orders
    ? orders.map((order) => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, t),
      }))
    : undefined;
  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_LiVhv() ?? 'Recent Orders'
          // section header
        }
        toolbar={
          <Button color="secondary" href={viewAllHref}>
            <>
              {t(
                'dashboard_+990c',
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

                {m.dashboard_TF_tG() ?? 'No. of Order'}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* order placement date */}

                {m.dashboard_i_kK_() ?? 'Date'}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* order status */}

                {m.dashboard_URrk_() ?? 'Status'}
              </>
            </TableCell>
            <TableCell className={styles.textRight ?? ''}>
              <>
                {t(
                  'dashboard_aX/V3',
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
                <TableCell colSpan={6}>{m.dashboard_lfqSV() ?? 'No orders found'}</TableCell>
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
