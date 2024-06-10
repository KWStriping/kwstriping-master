import { useTranslation } from '@core/i18n';
import IconButton from '@core/ui/components/buttons/IconButton';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { WarehouseWithShippingFragment } from '@core/api/graphql';
import { maybe, stopPropagation } from '@dashboard/oldSrc/misc';
import type { ListProps, SortPage } from '@dashboard/oldSrc/types';
import { mapEdgesToItems } from '@core/ui/utils/maps';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';
import { WarehouseListUrlOrdering, warehouseUrl } from '@dashboard/oldSrc/warehouses/urls';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import type { ReactNode, FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colActions: {
        width: 160,
      },
      colName: {
        width: 400,
      },
      colZones: {
        width: 'auto',
      },
    },
    actions: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'flex-end',
      position: 'relative',
      right: theme.spacing(-1.5),
      gap: theme.spacing(1),
    },
    colActions: {
      textAlign: 'right',
    },
    colZones: {
      paddingLeft: 0,
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
  { name: 'WarehouseList' }
);

interface WarehouseListProps extends ListProps, SortPage<WarehouseListUrlOrdering> {
  warehouses: WarehouseWithShippingFragment[];
  onRemove: (id: string) => void;
}

const numberOfColumns = 3;

const WarehouseList: FC<WarehouseListProps> = (props) => {
  const { warehouses, disabled, settings, sort, onUpdateListSettings, onRemove, onSort } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  return (
    <ResponsiveTable data-test-id="warehouse-list">
      <TableHead>
        <TableRow>
          <TableCellHeader
            direction={
              sort.sort === WarehouseListUrlOrdering.name
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            arrowPosition="right"
            className={styles.colName ?? ''}
            onClick={() => onSort(WarehouseListUrlOrdering.name)}
          >
            <>
              {/* warehouse */}

              {t('dashboard.CJwVq', 'Name')}
            </>
          </TableCellHeader>
          <TableCell className={styles.colZones ?? ''}>
            {t('dashboard.FXGaR', 'Shipping Zones')}
          </TableCell>
          <TableCell className={styles.colActions ?? ''}>
            {t('dashboard.L7VAE', 'Actions')}
          </TableCell>
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
          warehouses,
          (warehouse) => (
            <TableRow
              className={styles.tableRow ?? ''}
              hover={!!warehouse}
              key={warehouse ? warehouse.id : 'skeleton'}
              data-test-id={'warehouse-entry-' + warehouse?.name.toLowerCase().replace(' ', '')}
            >
              <TableCell className={styles.colName ?? ''} data-test-id="name">
                {maybe<ReactNode>(
                  () => (
                    <Link href={warehouse && warehouseUrl(warehouse.id)} className={'block'}>
                      {warehouse.name}
                    </Link>
                  ),
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={styles.colZones ?? ''} data-test-id="zones">
                {warehouse?.shippingZones === undefined ? (
                  <Skeleton />
                ) : (
                  mapEdgesToItems(warehouse?.shippingZones)
                    ?.map(({ name }) => name)
                    .join(', ') || '-'
                )}
              </TableCell>
              <TableCell className={styles.colActions ?? ''}>
                <div className={styles.actions ?? ''}>
                  <IconButton color="secondary" data-test-id="edit-button">
                    <EditIcon />
                  </IconButton>
                  <TableButtonWrapper>
                    <IconButton
                      color="secondary"
                      onClick={stopPropagation(() => onRemove(warehouse.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableButtonWrapper>
                </div>
              </TableCell>
            </TableRow>
          ),
          () => (
            <TableRow data-test-id="empty-list-message">
              <TableCell colSpan={numberOfColumns}>
                {t('dashboard.gsiR1', 'No warehouses found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

WarehouseList.displayName = 'WarehouseList';
export default WarehouseList;
