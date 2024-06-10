import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import type { PageKlassFragment } from '@tempo/api/generated/graphql';
import { PageKlassListUrlOrdering, pageKlassUrl } from '@tempo/dashboard/oldSrc/pageKlasses/urls';
import type { ListActions, ListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  {
    link: {
      cursor: 'pointer',
    },
  },
  { name: 'PageKlassList' }
);

interface PageKlassListProps extends ListProps, ListActions, SortPage<PageKlassListUrlOrdering> {
  pageKlasses: PageKlassFragment[];
}

const PageKlassList: FC<PageKlassListProps> = (props) => {
  const { disabled, pageKlasses, onSort, isChecked, selected, sort, toggle, toggleAll, toolbar } =
    props;
  const styles = useStyles(props);
  const numberOfColumns = pageKlasses?.length === 0 ? 1 : 2;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={pageKlasses}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            sort.sort === PageKlassListUrlOrdering.name ? getArrowDirection(!!sort.asc) : undefined
          }
          arrowPosition="right"
          onClick={() => onSort(PageKlassListUrlOrdering.name)}
          className={styles.colName ?? ''}
        >
          <>
            {/* page type name */}

            {m.dashboard_Q_NVl() ?? 'Content Type Name'}
          </>
        </TableCellHeader>
      </TableHead>
      <TableFooter>
        <TableRow>
          <TablePaginationWithContext colSpan={numberOfColumns} disabled={disabled} />
        </TableRow>
      </TableFooter>
      <TableBody>
        {renderCollection(
          pageKlasses,
          (pageKlass) => {
            const isSelected = pageKlass ? isChecked(pageKlass.id) : false;
            return (
              <TableRow
                className={pageKlass ? styles.link : undefined}
                hover={!!pageKlass}
                key={pageKlass ? pageKlass.id : 'skeleton'}
                href={pageKlass && pageKlassUrl(pageKlass.id)}
                selected={isSelected}
                data-test-id={'id-' + pageKlass?.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(pageKlass.id)}
                  />
                </TableCell>
                <TableCell className={styles.colName ?? ''}>
                  {pageKlass ? <span data-test-id="name">pageKlass.name}</span> : <Skeleton />}
                </TableCell>
              </TableRow>
            );
          },
          () => (
            <TableRow>
              <TableCell colSpan={numberOfColumns}>
                {m.dashboard_fORLY() ?? 'No page types found'}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
PageKlassList.displayName = 'PageKlassList';
export default PageKlassList;
