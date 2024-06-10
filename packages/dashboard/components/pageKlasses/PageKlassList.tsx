import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@dashboard/components/tables/TableCellHeader';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { PageKlassFragment } from '@core/api/graphql';
import { PageKlassListUrlOrdering, pageKlassUrl } from '@dashboard/oldSrc/pageKlasses/urls';
import type { ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

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
  const { t } = useTranslation();
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

            {t('dashboard.Q2NVl', 'Content Type Name')}
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
                {t('dashboard.fORLY', 'No page types found')}
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
