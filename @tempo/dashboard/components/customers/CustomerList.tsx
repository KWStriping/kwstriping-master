import * as m from '@paraglide/messages';
import { useUserPermissions } from '@tempo/api/auth/react/hooks/permissions';
// import { makeStyles } from '@tempo/ui/theme/styles';
import { getUserName } from '@tempo/utils/user';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import { PermissionCode } from '@tempo/api/generated/constants';
import type { ListCustomersQuery } from '@tempo/api/generated/graphql';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import RequirePermissions, {
  hasPermissions,
} from '@tempo/dashboard/components/core/RequirePermissions';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { CustomerListUrlOrdering, customerUrl } from '@tempo/dashboard/oldSrc/customers/urls';
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
      colEmail: {},

      colOrders: {
        width: 200,
      },
    },
    colEmail: {},
    colOrders: {
      textAlign: 'center',
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
  { name: 'CustomerList' }
);

export interface CustomerListProps
  extends ListProps,
    ListActions,
    SortPage<CustomerListUrlOrdering> {
  customers: RelayToFlat<NonNullable<ListCustomersQuery['customers']>>;
}

const CustomerList: FC<CustomerListProps> = (props) => {
  const {
    settings,
    disabled,
    customers,
    onUpdateListSettings,
    onSort,
    toolbar,
    toggle,
    toggleAll,
    selected,
    sort,
    isChecked,
  } = props;
  const styles = useStyles(props);
  const userPermissions = useUserPermissions();
  if (!userPermissions) return null;
  const numberOfColumns = hasPermissions(userPermissions, [PermissionCode.ManageOrders]) ? 4 : 3;
  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={customers}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === CustomerListUrlOrdering.name ? getArrowDirection(!!sort.asc) : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(CustomerListUrlOrdering.name)}
          className={styles.colName ?? ''}
        >
          {m.dashboard_r_SAu() ?? 'Customer Name'}
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === CustomerListUrlOrdering.email
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(CustomerListUrlOrdering.email)}
          className={styles.colEmail ?? ''}
        >
          {m.dashboard__l_MO() ?? 'Customer Email'}
        </TableCellHeader>
        <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
          <TableCellHeader
            direction={
              sort.sort === CustomerListUrlOrdering.orders
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            textAlign="center"
            onClick={() => onSort(CustomerListUrlOrdering.orders)}
            className={styles.colOrders ?? ''}
          >
            {m.dashboard__VDeH() ?? 'No. of Orders'}
          </TableCellHeader>
        </RequirePermissions>
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
          customers,
          (customer) => {
            const isSelected = customer ? isChecked(customer.id) : false;

            return (
              <TableRow
                className={customer ? styles.tableRow : undefined}
                hover={!!customer}
                key={customer ? customer.id : 'skeleton'}
                selected={isSelected}
                href={customer && customerUrl(customer.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(customer.id)}
                  />
                </TableCell>
                <TableCell className={styles.colName ?? ''}>{getUserName(customer)}</TableCell>
                <TableCell className={styles.colEmail ?? ''}>
                  {customer?.email ?? <Skeleton />}
                </TableCell>
                <RequirePermissions requiredPermissions={[PermissionCode.ManageOrders]}>
                  <TableCell className={styles.colOrders ?? ''}>
                    {customer?.orders?.totalCount ?? <Skeleton />}
                  </TableCell>
                </RequirePermissions>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {m.dashboard_pIcp_() ?? 'No customers found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
CustomerList.displayName = 'CustomerList';
export default CustomerList;
