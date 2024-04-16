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
import { DiscountValueType } from '@core/api/constants';
import type { VoucherFragment } from '@core/api/graphql';
import { canBeSorted } from '@dashboard/oldSrc/discounts/sort';
import { VoucherListUrlOrdering, voucherUrl } from '@dashboard/oldSrc/discounts/urls';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ChannelProps, ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

export interface VoucherListProps
  extends ListProps,
    ListActions,
    SortPage<VoucherListUrlOrdering>,
    ChannelProps {
  vouchers: VoucherFragment[];
}

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colEnd: {
        width: 180,
      },
      colMinSpent: {
        width: 150,
      },

      colStart: {
        width: 180,
      },
      colUses: {
        width: 150,
      },
      colValue: {
        width: 150,
      },
    },
    colEnd: {
      textAlign: 'right',
    },
    colMinSpent: {
      textAlign: 'right',
    },
    colStart: {
      textAlign: 'right',
    },
    colUses: {
      textAlign: 'right',
    },
    colValue: {
      textAlign: 'right',
    },
    tableRow: {
      cursor: 'pointer',
    },
    textRight: {
      textAlign: 'right',
    },
    textOverflow: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  }),
  { name: 'VoucherList' }
);

const numberOfColumns = 7;

const VoucherList: FC<VoucherListProps> = (props) => {
  const {
    settings,
    disabled,
    onUpdateListSettings,
    onSort,
    vouchers,
    isChecked,
    selected,
    selectedChannelId,
    sort,
    toggle,
    toggleAll,
    toolbar,
    filterDependency,
  } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={vouchers}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === VoucherListUrlOrdering.code ? getArrowDirection(!!sort.asc) : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(VoucherListUrlOrdering.code)}
          className={styles.colName ?? ''}
        >
          <>
            {/* voucher code */}

            {t('dashboard.sPIOX', 'Code')}
          </>
        </TableCellHeader>
        <TooltipTableCellHeader
          direction={
            sort.sort === VoucherListUrlOrdering.minSpent
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="right"
          onClick={() => onSort(VoucherListUrlOrdering.minSpent)}
          disabled={!canBeSorted(VoucherListUrlOrdering.minSpent, !!selectedChannelId)}
          className={styles.colMinSpent ?? ''}
          tooltip={t(
            'dashboard.noFilterSelected',
            'Sorting by this column requires active filter: {{filterName}}',
            {
              filterName: filterDependency?.label,
            }
          )}
        >
          {t('dashboard.minSpentToActivateVoucher', 'Min. Spent')}
        </TooltipTableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === VoucherListUrlOrdering.startDate
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="right"
          onClick={() => onSort(VoucherListUrlOrdering.startDate)}
          className={styles.colStart ?? ''}
        >
          <>
            {/* voucher is active from date */}

            {t('dashboard.u7b3V', 'Starts')}
          </>
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === VoucherListUrlOrdering.endDate
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          textAlign="right"
          onClick={() => onSort(VoucherListUrlOrdering.endDate)}
          className={styles.colEnd ?? ''}
        >
          <>
            {/* voucher is active until date */}

            {t('dashboard.6L9n7', 'Ends')}
          </>
        </TableCellHeader>
        <TooltipTableCellHeader
          direction={
            sort.sort === VoucherListUrlOrdering.value ? getArrowDirection(!!sort.asc) : undefined
          }
          textAlign="right"
          onClick={() => onSort(VoucherListUrlOrdering.value)}
          disabled={!canBeSorted(VoucherListUrlOrdering.minSpent, !!selectedChannelId)}
          className={styles.colValue ?? ''}
          tooltip={t(
            'dashboard.noFilterSelected',
            'Sorting by this column requires active filter: {{filterName}}',
            {
              filterName: filterDependency?.label,
            }
          )}
        >
          {t('dashboard.voucherValue', 'Value')}
        </TooltipTableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === VoucherListUrlOrdering.limit ? getArrowDirection(!!sort.asc) : undefined
          }
          textAlign="right"
          onClick={() => onSort(VoucherListUrlOrdering.limit)}
          className={styles.colUses ?? ''}
        >
          <>
            {/* voucher uses */}

            {t('dashboard.HwvLL', 'Uses')}
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
          vouchers,
          (voucher) => {
            const isSelected = voucher ? isChecked(voucher.id) : false;
            const channel = voucher?.channelListings?.find(
              (listing) => listing.channel.id === selectedChannelId
            );
            const hasChannelsLoaded = voucher?.channelListings?.length;

            return (
              <TableRow
                className={voucher ? styles.tableRow : undefined}
                hover={!!voucher}
                key={voucher ? voucher.id : 'skeleton'}
                selected={isSelected}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(voucher.id)}
                  />
                </TableCell>
                <TableCell className={clsx(styles.colName, styles.textOverflow)}>
                  {voucher?.code ? (
                    <Link href={voucher && voucherUrl(voucher.id)}>{voucher.code}</Link>
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colMinSpent ?? ''}>
                  {voucher?.code ? (
                    hasChannelsLoaded ? (
                      <Money money={channel?.minSpent} />
                    ) : (
                      '-'
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colStart ?? ''}>
                  {voucher?.startDate ? <Date date={voucher.startDate} /> : <Skeleton />}
                </TableCell>
                <TableCell className={styles.colEnd ?? ''}>
                  {voucher?.endDate ? (
                    <Date date={voucher.endDate} />
                  ) : voucher && voucher.endDate === null ? (
                    '-'
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colValue ?? ''}>
                  {voucher?.code ? (
                    hasChannelsLoaded ? (
                      voucher.discountValueType === DiscountValueType.Fixed ? (
                        <Money
                          money={{
                            amount: channel?.discountValue,
                            currency: channel?.currency,
                          }}
                        />
                      ) : channel ? (
                        <Percent amount={channel?.discountValue} />
                      ) : (
                        <Skeleton />
                      )
                    ) : (
                      '-'
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colUses ?? ''}>
                  {maybe<ReactNode>(
                    () => (voucher.usageLimit === null ? '-' : voucher.usageLimit),
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {t('dashboard.noVouchersFound', 'No vouchers found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
VoucherList.displayName = 'VoucherList';
export default VoucherList;
