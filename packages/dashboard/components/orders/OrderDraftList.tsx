import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import Checkbox from '@dashboard/components/core/Checkbox';
import FormattedDateTime from '@dashboard/components/core/Date';
import Money from '@dashboard/components/core/Money';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { OrderDraftListQuery } from '@core/api/graphql';
import { transformOrderStatus, transformPaymentStatus } from '@dashboard/oldSrc/misc';
import { OrderDraftListUrlOrdering, orderUrl } from '@dashboard/oldSrc/orders/urls';
import type { ListActions, ListProps, RelayToFlat, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

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

  const { t } = useTranslation();

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
          {t('dashboard.FkPWB', 'Number')}
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

            {t('dashboard.CP0UD', 'Date')}
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
          {t('dashboard.kENym', 'Customer')}
        </TableCellHeader>
        <TableCellHeader textAlign="right" className={styles.colTotal ?? ''}>
          <>
            {/* order draft total price */}

            {t('dashboard.Uj0Wd', 'Total')}
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
                {t('dashboard.noDraftOrdersFound', 'No draft orders found')}
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
