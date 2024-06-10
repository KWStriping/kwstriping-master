import * as m from '@paraglide/messages';
import Pill from '@tempo/ui/components/pill/Pill';
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
import type { PageFragment } from '@tempo/api/generated/graphql';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { PageListUrlOrdering, pageUrl } from '@tempo/dashboard/oldSrc/pages/urls';
import type { ListActions, ListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

export interface PageListProps extends ListProps, ListActions, SortPage<PageListUrlOrdering> {
  pages: PageFragment[];
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
  { name: 'PageList' }
);

const numberOfColumns = 4;

const PageList: FC<PageListProps> = (props) => {
  const {
    settings,
    pages,
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
  const styles = useStyles(props);

  return (
    <Card>
      <ResponsiveTable>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={pages}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCellHeader
            direction={
              sort.sort === PageListUrlOrdering.title ? getArrowDirection(!!sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(PageListUrlOrdering.title)}
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
              sort.sort === PageListUrlOrdering.slug ? getArrowDirection(!!sort.asc) : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(PageListUrlOrdering.slug)}
            className={styles.colSlug ?? ''}
          >
            <>
              {/* page internal name */}

              {m.dashboard__dAAe() ?? 'Slug'}
            </>
          </TableCellHeader>
          <TableCellHeader
            direction={
              sort.sort === PageListUrlOrdering.visible
                ? getArrowDirection(!!sort.asc)
                : undefined
            }
            arrowPosition="right"
            onClick={() => onSort(PageListUrlOrdering.visible)}
            className={styles.colVisibility ?? ''}
          >
            <>
              {/* page status */}

              {m.dashboard_GSYCR() ?? 'Visibility'}
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
            pages,
            (page) => {
              const isSelected = page ? isChecked(page.id) : false;

              return (
                <TableRow
                  hover={!!page}
                  className={page ? styles.link : undefined}
                  href={page && pageUrl(page.id)}
                  key={page ? page.id : 'skeleton'}
                  selected={isSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(page.id)}
                    />
                  </TableCell>
                  <TableCell className={styles.colTitle ?? ''}>
                    {maybe<ReactNode>(() => page.title, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colSlug ?? ''}>
                    {maybe<ReactNode>(() => page.slug, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colVisibility ?? ''}>
                    {maybe<ReactNode>(
                      () => (
                        <Pill
                          label={
                            page.isPublished
                              ? t(
                                  'dashboard_1KzEx',
                                  'Published'
                                  // page status
                                )
                              : t(
                                  'dashboard_N3qWD',
                                  'Not Published'
                                  // page status
                                )
                          }
                          color={page.isPublished ? 'success' : 'error'}
                        />
                      ),
                      <Skeleton />
                    )}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {m.dashboard_MJka_() ?? 'No pages found'}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
PageList.displayName = 'PageList';
export default PageList;
