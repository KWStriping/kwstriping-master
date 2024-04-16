import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { MediaFragment } from '@core/api/graphql';
import { MediaListUrlOrdering, mediaUrl } from '@dashboard/oldSrc/media/urls';
import { maybe } from '@dashboard/oldSrc/misc';
import type { ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

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
  const { t } = useTranslation();
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
                'dashboard.2+HTM',
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

              {t('dashboard.F408H', 'Visibility')}
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
                  {t('dashboard.SCjCg', 'No items found')}
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
