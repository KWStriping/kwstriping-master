import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import type { MediaFragment } from '@tempo/api/generated/graphql';
import { MediaListUrlOrdering, mediaUrl } from '@tempo/dashboard/oldSrc/media/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type { ListActions, ListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const styles = {};

export interface MediaListProps extends ListProps, ListActions, SortPage<MediaListUrlOrdering> {
  media: MediaFragment[];
}

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colSlug: {
        width: 250,
      },
      colTitle: {},
      colVisibility: {
        width: 200,
      },
    },
    colSlug: {},
    colTitle: {},
    colVisibility: {},
    link: {
      cursor: 'pointer',
    },
  }),
  { name: 'MediaList' }
);

const numberOfColumns = 2;

const MediaList: FC<MediaListProps> = (props) => {
  const {
    settings,
    media,
    disabled,
    onSort,
    onUpdateListSettings,
    isChecked,
    selected,
    sort,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  // const styles = useStyles(props);

  return (
    <Card>
      <ResponsiveTable>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={media}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            direction={
              sort.sort === MediaListUrlOrdering.title ? getArrowDirection(!!sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(MediaListUrlOrdering.title)}
            className={styles.colTitle ?? ''}
          >
            <>
              {t(
                'dashboard_2+HTM',
                'Title'
                // dialog header
              )}
            </>
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === MediaListUrlOrdering.visible
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(MediaListUrlOrdering.visible)}
            className={styles.colVisibility ?? ''}
          >
            <>
              {/* media status */}

              {m.dashboard_F___H() ?? 'Visibility'}
            </>
          </TableCellHeader>
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
            media,
            (item) => {
              const isSelected = item ? isChecked(item.id) : false;
              return (
                <TableRow
                  hover={!!item}
                  className={item ? styles.link : undefined}
                  key={item ? item.id : 'skeleton'}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(item.id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colTitle ?? ''}>
                    {item ? (
                      <Link href={mediaUrl(item.id)} className={'block'}>
                        {item.title}
                      </Link>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={styles.colVisibility ?? ''}>
                    {maybe<ReactNode>(() => (item.isPublished ? 'y' : 'n'), <Skeleton />)}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_SCjCg() ?? 'No items found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
MediaList.displayName = 'MediaList';
export default MediaList;
