import * as m from '@paraglide/messages';
import { Pill } from '@tempo/ui/components/pill/Pill';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { ReactNode, FC } from 'react';
import { ChannelsAvailabilityDropdown } from '@tempo/dashboard/components/channels/ChannelsAvailabilityDropdown';
import {
  getChannelAvailabilityColor,
  getChannelAvailabilityLabel,
} from '@tempo/dashboard/components/channels/ChannelsAvailabilityDropdown/utils';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import TooltipTableCellHeader from '@tempo/dashboard/components/tables/TooltipTableCellHeader';
import type { CollectionListQuery } from '@tempo/api/generated/graphql';
import { canBeSorted } from '@tempo/dashboard/oldSrc/collections/sort';
import { CollectionListUrlOrdering, collectionUrl } from '@tempo/dashboard/oldSrc/collections/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type {
  ChannelProps,
  ListActions,
  ListProps,
  RelayToFlat,
  SortPage,
} from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colAvailability: {
        width: 240,
      },
      colProducts: {
        width: 240,
      },
    },
    colAvailability: {},
    colProducts: {
      textAlign: 'center',
    },
    tableRow: {
      cursor: 'pointer' as const,
    },
  }),
  { name: 'CollectionList' }
);

export interface CollectionListProps
  extends ListProps,
    ListActions,
    SortPage<CollectionListUrlOrdering>,
    ChannelProps {
  collections: RelayToFlat<NonNullable<CollectionListQuery['collections']>>;
}

const numberOfColumns = 4;

const CollectionList: FC<CollectionListProps> = (props) => {
  const {
    collections,
    disabled,
    settings,
    sort,
    onUpdateListSettings,
    onSort,
    isChecked,
    selected,
    selectedChannelId,
    toggle,
    toggleAll,
    toolbar,
    filterDependency,
  } = props;
  const styles = useStyles(props);
  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={collections}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === CollectionListUrlOrdering.name
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(CollectionListUrlOrdering.name)}
          className={styles.colName ?? ''}
        >
          {m.dashboard_ZsE__() ?? 'Collection Name'}
        </TableCellHeader>
        <TableCellHeader
          direction={
            sort.sort === CollectionListUrlOrdering.productCount
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(CollectionListUrlOrdering.productCount)}
          className={styles.colProducts ?? ''}
        >
          {m.dashboard_WQt_s() ?? 'No. of Products'}
        </TableCellHeader>
        <TooltipTableCellHeader
          direction={
            sort.sort === CollectionListUrlOrdering.available
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          onClick={() => onSort(CollectionListUrlOrdering.available)}
          className={styles.colAvailability ?? ''}
          disabled={!canBeSorted(CollectionListUrlOrdering.available, !!selectedChannelId)}
          tooltip={
            m.dashboard_noFilterSelected({
              filterName: filterDependency?.label,
            }) ?? 'Sorting by this column requires active filter: {{filterName}}'
          }
        >
          <>
            {/* collection availability */}

            {m.dashboard_xdBmI() ?? 'Availability'}
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
          collections,
          (collection) => {
            const isSelected = collection ? isChecked(collection.id) : false;
            const channel = collection?.channelListings?.find(
              (listing) => listing?.channel?.id === selectedChannelId
            );
            return (
              <TableRow
                className={styles.tableRow ?? ''}
                hover={!!collection}
                href={collection && collectionUrl(collection.id)}
                key={collection ? collection.id : 'skeleton'}
                selected={isSelected}
                data-test-id={'id-' + collection.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(collection.id)}
                  />
                </TableCell>
                <TableCell className={styles.colName ?? ''} data-test-id="name">
                  {maybe<ReactNode>(() => collection.name, <Skeleton />)}
                </TableCell>
                <TableCell className={styles.colProducts ?? ''}>
                  {maybe<ReactNode>(() => collection?.products?.totalCount, <Skeleton />)}
                </TableCell>
                <TableCell
                  className={styles.colAvailability ?? ''}
                  data-test-id="availability"
                  data-test-availability={!!collection?.channelListings?.length}
                >
                  {(!collection && <Skeleton />) ||
                    (channel ? (
                      <Pill
                        label={t(...getChannelAvailabilityLabel(channel))}
                        color={getChannelAvailabilityColor(channel)}
                      />
                    ) : (
                      <ChannelsAvailabilityDropdown channels={collection?.channelListings} />
                    ))}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {m.dashboard_w__F_() ?? 'No collections found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

CollectionList.displayName = 'CollectionList';
export default CollectionList;
