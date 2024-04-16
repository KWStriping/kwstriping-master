import { useUserPermissions } from '@core/auth/react/hooks/permissions';
import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import { getUserName } from '@core/utils/user';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import Checkbox from '@dashboard/components/core/Checkbox';
import RequirePermissions, {
  hasPermissions,
} from '@dashboard/components/core/RequirePermissions';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import { PermissionCode } from '@core/api/constants';
import type { ListCustomersQuery } from '@core/api/graphql';
import { CustomerListUrlOrdering, customerUrl } from '@dashboard/oldSrc/customers/urls';
import type { ListActions, ListProps, RelayToFlat, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

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
  const { t } = useTranslation();
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
          {t('dashboard.r1SAu', 'Customer Name')}
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
          {t('dashboard.7l2MO', 'Customer Email')}
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
            {t('dashboard.8VDeH', 'No. of Orders')}
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
                {t('dashboard.pIcp9', 'No customers found')}
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
