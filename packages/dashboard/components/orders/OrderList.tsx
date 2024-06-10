import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { Pill } from '@core/ui/components/pill/Pill';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { CSSProperties } from '@mui/styles';
import type { FC } from 'react';
import FormattedDateTime from '@dashboard/components/core/Date';
import Money from '@dashboard/components/core/Money';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { OrderListQuery } from '@core/api/graphql';
import { transformOrderStatus, transformPaymentStatus } from '@dashboard/oldSrc/misc';
import { OrderListUrlOrdering, orderUrl } from '@dashboard/oldSrc/orders/urls';
import type { ListProps, RelayToFlat, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => {
    const overflowing: CSSProperties = {
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
  const { t } = useTranslation();
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
            {t('dashboard.number', 'Number')}
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === OrderListUrlOrdering.date ? getArrowDirection(!!sort.asc) : undefined
            }
            onClick={() => onSort(OrderListUrlOrdering.date)}
            className={styles.colDate ?? ''}
          >
            {t('dashboard.date', 'Date')}
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
            {t('dashboard.customer', 'Customer')}
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
            {t('dashboard.paymentStatus', 'Payment')}
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
            {t('dashboard.fulfillmentStatus', 'Fulfillment status')}
          </TableCellHeader>
          <TableCellHeader textAlign="right" className={styles.colTotal ?? ''}>
            {t('dashboard.totalOrderPrice', 'Total')}
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
                {t('dashboard.noOrdersFound', 'No orders found')}
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
