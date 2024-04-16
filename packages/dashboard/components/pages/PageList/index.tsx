import { useTranslation } from '@core/i18n';
import Pill from '@core/ui/components/pill/Pill';
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
import type { PageFragment } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import { PageListUrlOrdering, pageUrl } from '@dashboard/oldSrc/pages/urls';
import type { ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

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

  const { t } = useTranslation();

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
                'dashboard.2+HTM',
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

              {t('dashboard.8dAAe', 'Slug')}
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

              {t('dashboard.GSYCR', 'Visibility')}
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
                                  'dashboard.1KzEx',
                                  'Published'
                                  // page status
                                )
                              : t(
                                  'dashboard.N3qWD',
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
                  {t('dashboard.MJka8', 'No pages found')}
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
