import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import clsx from 'clsx';
import type { ReactNode, FC } from 'react';
import Checkbox from '@dashboard/components/core/Checkbox';
import Date from '@dashboard/components/core/Date';
import Money from '@dashboard/components/core/Money';
import Percent from '@dashboard/components/core/Percent';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import TooltipTableCellHeader from '@dashboard/components/tables/TooltipTableCellHeader';
import { SaleType } from '@core/api/constants';
import type { SaleFragment } from '@core/api/graphql';
import { canBeSorted } from '@dashboard/oldSrc/discounts/SaleList/sort';
import { SaleListUrlOrdering, saleUrl } from '@dashboard/oldSrc/discounts/urls';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ChannelProps, ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

export interface SaleListProps
  extends ListProps,
    ListActions,
    SortPage<SaleListUrlOrdering>,
    ChannelProps {
  sales: SaleFragment[];
}

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colEnd: {
        width: 250,
      },

      colStart: {
        width: 250,
      },
      colValue: {
        width: 200,
      },
    },
    colEnd: {
      textAlign: 'right',
    },
    colStart: {
      textAlign: 'right',
    },
    colValue: {
      textAlign: 'right',
    },
    tableRow: {
      cursor: 'pointer',
    },
    textOverflow: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  }),
  { name: 'SaleList' }
);

const SaleList: FC<SaleListProps> = (props) => {
  const {
    settings,
    disabled,
    onUpdateListSettings,
    onSort,
    sales,
    selectedChannelId,
    isChecked,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
    filterDependency,
  } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  const numberOfColumns = sales?.length === 0 ? 4 : 5;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={sales}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === SaleListUrlOrdering.name ? getArrowDirection(!!sort.asc) : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(SaleListUrlOrdering.name)}
          className={styles.colName ?? ''}
        >
          <>
            {/* sale name */}

            {t('dashboard.56hOz', 'Name')}
          </>
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === SaleListUrlOrdering.startDate
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="right"
          onClick={() => onSort(SaleListUrlOrdering.startDate)}
          className={styles.colStart ?? ''}
        >
          <>
            {/* sale start date */}

            {t('dashboard.BSq6l', 'Starts')}
          </>
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === SaleListUrlOrdering.endDate ? getArrowDirection(!!sort.asc) : undefined
          }
          textAlign="right"
          onClick={() => onSort(SaleListUrlOrdering.endDate)}
          className={styles.colEnd ?? ''}
        >
          <>
            {/* sale end date */}

            {t('dashboard.iF5UV', 'Ends')}
          </>
        </TableCellHeader>
        <TooltipTableCellHeader
          direction={
            sort.sort === SaleListUrlOrdering.value ? getArrowDirection(!!sort.asc) : undefined
          }
          textAlign="right"
          onClick={() => onSort(SaleListUrlOrdering.value)}
          disabled={!canBeSorted(SaleListUrlOrdering.value, !!selectedChannelId)}
          tooltip={t(
            'dashboard.noFilterSelected',
            'Sorting by this column requires active filter: {{filterName}}',
            {
              filterName: filterDependency?.label,
            }
          )}
          className={styles.colValue ?? ''}
        >
          <>
            {/* sale value */}

            {t('dashboard.ZR590', 'Value')}
          </>
        </TooltipTableCellHeader>
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
          sales,
          (sale) => {
            const isSelected = sale ? isChecked(sale.id) : false;
            const channel = sale?.channelListings?.find(
              (listing) => listing.channel.id === selectedChannelId
            );
            return (
              <TableRow
                className={sale ? styles.tableRow : undefined}
                hover={!!sale}
                key={sale ? sale.id : 'skeleton'}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(sale.id)}
                  />
                </TableCell>
                <TableCell className={clsx(styles.colName, styles.textOverflow)}>
                  {maybe<ReactNode>(() => sale.name, <Skeleton />)}
                </TableCell>
                <TableCell className={styles.colStart ?? ''}>
                  {sale && sale.startDate ? (
                    <Link href={sale && saleUrl(sale.id)} className={'block'}>
                      <Date date={sale.startDate} />
                    </Link>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colEnd ?? ''}>
                  {sale && sale.endDate ? (
                    <Date date={sale.endDate} />
                  ) : sale && sale.endDate === null ? (
                    '-'
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colValue ?? ''}>
                  {sale?.type && channel?.discountValue ? (
                    sale.type === SaleType.Fixed ? (
                      <Money
                        money={{
                          amount: channel.discountValue,
                          currency: channel.currency,
                        }}
                      />
                    ) : channel?.discountValue ? (
                      <Percent amount={channel.discountValue} />
                    ) : (
                      '-'
                    )
                  ) : sale && !channel ? (
                    '_'
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {t('dashboard.noSalesFound', 'No sales found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
SaleList.displayName = 'SaleList';
export default SaleList;
