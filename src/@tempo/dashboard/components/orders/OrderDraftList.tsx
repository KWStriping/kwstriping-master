import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import type { OrderDraftListQuery } from '@tempo/api/generated/graphql';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';
import Money from '@tempo/dashboard/components/core/Money';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { transformOrderStatus, transformPaymentStatus } from '@tempo/dashboard/oldSrc/misc';
import { OrderDraftListUrlOrdering, orderUrl } from '@tempo/dashboard/oldSrc/orders/urls';
import type {
  ListActions,
  ListProps,
  RelayToFlat,
  SortPage,
} from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colCustomer: {
        width: 300,
      },
      colDate: {
        width: 300,
      },
      colNumber: {
        width: 160,
      },
      colTotal: {},
    },
    colCustomer: {},
    colDate: {},
    colNumber: {
      paddingLeft: 0,
    },
    colTotal: {
      textAlign: 'right',
    },
    link: {
      cursor: 'pointer',
    },
  }),
  { name: 'OrderDraftList' }
);

interface OrderDraftListProps
  extends ListProps,
    ListActions,
    SortPage<OrderDraftListUrlOrdering> {
  orders: RelayToFlat<NonNullable<OrderDraftListQuery['orderDrafts']>>;
}

export const OrderDraftList: FC<OrderDraftListProps> = (props) => {
  const {
    disabled,
    settings,
    orders,
    onUpdateListSettings,
    onSort,
    isChecked,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  // const styles = useStyles();
  const styles = {};

  const orderDraftList = orders
    ? orders.map((order) => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, t),
        status: transformOrderStatus(order.status, t),
      }))
    : undefined;

  const numberOfColumns = orderDraftList?.length === 0 ? 4 : 5;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={orders}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === OrderDraftListUrlOrdering.number
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(OrderDraftListUrlOrdering.number)}
          className={styles.colNumber ?? ''}
        >
          {m.dashboard_FkPWB() ?? 'Number'}
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === OrderDraftListUrlOrdering.date
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(OrderDraftListUrlOrdering.date)}
          className={styles.colDate ?? ''}
        >
          <>
            {/* order draft creation date */}

            {m.dashboard_CP_UD() ?? 'Date'}
          </>
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === OrderDraftListUrlOrdering.customer
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(OrderDraftListUrlOrdering.customer)}
          className={styles.colCustomer ?? ''}
        >
          {m.dashboard_kENym() ?? 'Customer'}
        </TableCellHeader>
        <TableCellHeader textAlign="right" className={styles.colTotal ?? ''}>
          <>
            {/* order draft total price */}

            {m.dashboard_Uj_Wd() ?? 'Total'}
          </>
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext
            colSpan={numberOfColumns}
            settings={settings}
            onUpdateListSettings={onUpdateListSettings}
          />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          orderDraftList,
          (order) => {
            const isSelected = order ? isChecked(order.id) : false;
            return (
              <TableRow
                data-test-id="draft-order-table-row"
                hover={!!order}
                className={order ? styles.link : undefined}
                key={order ? order.id : 'skeleton'}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(order.id)}
                  />
                </TableCell>
                <TableCell className={styles.colNumber ?? ''}>
                  {order.number ? (
                    <Link href={order && orderUrl(order.id)}>{'#' + order.number}</Link>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colDate ?? ''}>
                  {order.created ? <FormattedDateTime date={order.created} /> : <Skeleton />}
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
                <TableCell className={styles.colTotal ?? ''} align="right">
                  {order.total.gross ? <Money money={order.total.gross} /> : <Skeleton />}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {m.dashboard_noDraftOrdersFound() ?? 'No draft orders found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
OrderDraftList.displayName = 'OrderDraftList';
export default OrderDraftList;
