import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { Pill } from '@tempo/ui/components/pill/Pill';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';
import Money from '@tempo/dashboard/components/core/Money';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import type { OrderListQuery } from '@tempo/api/generated/graphql';
import { transformOrderStatus, transformPaymentStatus } from '@tempo/dashboard/oldSrc/misc';
import { OrderListUrlOrdering, orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import type { ListProps, RelayToFlat, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => {
    const overflowing: any = {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    };

    return {
      [theme.breakpoints.up('lg')]: {
        colCustomer: {
          width: 220,
        },
        colDate: {},
        colFulfillment: {
          width: 230,
        },
        colNumber: {
          width: 120,
        },
        colPayment: {
          width: 220,
        },
        colTotal: {},
      },
      pill: {
        maxWidth: '100%',
        ...overflowing,
      },
      colCustomer: overflowing,
      colDate: {},
      colFulfillment: {},
      colNumber: {},
      colPayment: {},
      colTotal: {
        textAlign: 'right',
      },
      link: {
        cursor: 'pointer',
      },
    };
  },
  { name: 'OrderList' }
);

interface OrderListProps extends ListProps, SortPage<OrderListUrlOrdering> {
  orders: RelayToFlat<NonNullable<OrderListQuery['orders']>>;
}

const numberOfColumns = 6;

export const OrderList: FC<OrderListProps> = ({
  disabled,
  settings,
  orders,
  onUpdateListSettings,
  onSort,
  sort,
}) => {
  const styles = useStyles({});
  const orderList = orders
    ? orders.map((order) => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, t),
        status: transformOrderStatus(order.status, t),
      }))
    : undefined;
  return (
    <ResponsiveTable>
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlOrdering.number
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(OrderListUrlOrdering.number)}
            className={styles.colNumber ?? ''}
          >
            {m.dashboard_number() ?? 'Number'}
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlOrdering.date ? getArrowDirection(!!sort.asc) : undefined
            }
            onClick={() => onSort(OrderListUrlOrdering.date)}
            className={styles.colDate ?? ''}
          >
            {m.dashboard_date() ?? 'Date'}
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlOrdering.customer
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            onClick={() => onSort(OrderListUrlOrdering.customer)}
            className={styles.colCustomer ?? ''}
          >
            {m.dashboard_customer() ?? 'Customer'}
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlOrdering.payment
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            onClick={() => onSort(OrderListUrlOrdering.payment)}
            className={styles.colPayment ?? ''}
          >
            {m.dashboard_paymentStatus() ?? 'Payment'}
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlOrdering.fulfillment
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            onClick={() => onSort(OrderListUrlOrdering.fulfillment)}
            className={styles.colFulfillment ?? ''}
          >
            {m.dashboard_fulfillmentStatus() ?? 'Fulfillment status'}
          </TableCellHeader>
          <TableCellHeader textAlign="right" className={styles.colTotal ?? ''}>
            {m.dashboard_totalOrderPrice() ?? 'Total'}
          </TableCellHeader>
        </TableRow>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext
            colSpan={numberOfColumns}
            settings={settings}
            disabled={disabled}
            onUpdateListSettings={onUpdateListSettings}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          orderList,
          (order) => (
            <TableRow
              data-test-id="order-table-row"
              hover={!!order}
              className={order ? styles.link : undefined}
              key={order ? order.id : 'skeleton'}
            >
              <TableCell className={styles.colNumber ?? ''}>
                {order.number ? (
                  <Link className={'block'} href={order && orderUrl(order.id)}>
                    {'#' + order.number}
                  </Link>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={styles.colDate ?? ''}>
                {order.created ? (
                  <Link className={'block'} href={order && orderUrl(order.id)}>
                    <FormattedDateTime date={order.created} />
                  </Link>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={styles.colCustomer ?? ''}>
                {order.billingAddress ? (
                  <>
                    {order.billingAddress.firstName}
                    &nbsp;
                    {order.billingAddress.lastName}
                  </>
                ) : order.userEmail !== undefined ? (
                  order.userEmail
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={styles.colPayment ?? ''}>
                {order.paymentStatus.status !== undefined ? (
                  order.paymentStatus.status === null ? null : (
                    <Pill
                      className={styles.pill ?? ''}
                      color={order.paymentStatus.status}
                      label={order.paymentStatus.localized}
                    />
                  )
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={styles.colFulfillment ?? ''}>
                {order.status ? (
                  <Pill
                    className={styles.pill ?? ''}
                    color={order.status.status}
                    label={order.status.localized}
                  />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={styles.colTotal ?? ''} align="right">
                {order.total.gross ? <Money money={order.total.gross} /> : <Skeleton />}
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {m.dashboard_noOrdersFound() ?? 'No orders found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
OrderList.displayName = 'OrderList';
export default OrderList;
