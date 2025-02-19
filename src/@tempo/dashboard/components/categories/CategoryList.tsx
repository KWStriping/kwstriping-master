import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';
import type { CategoryFragment } from '@tempo/api/generated/graphql';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellHeader from '@tempo/dashboard/components/tables/TableCellHeader';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import { CategoryListUrlOrdering, categoryUrl } from '@tempo/dashboard/oldSrc/categories/urls';
import type { ListActions, ListProps, SortPage } from '@tempo/dashboard/oldSrc/types';
import { getArrowDirection } from '@tempo/dashboard/oldSrc/utils/sort';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colName: {
        width: 'auto',
      },
      colProducts: {
        width: 160,
      },
      colSubcategories: {
        width: 160,
      },
    },
    colProducts: {
      textAlign: 'center',
    },
    colSubcategories: {
      textAlign: 'center',
    },
    tableRow: {
      cursor: 'pointer',
    },
  }),
  { name: 'CategoryList' }
);

interface CategoryListProps extends ListProps, ListActions, SortPage<CategoryListUrlOrdering> {
  categories?: Maybe<CategoryFragment[]>;
  isRoot: boolean;
}

const CategoryList: FC<CategoryListProps> = (props) => {
  const {
    categories,
    disabled,
    settings,
    sort,
    isChecked,
    isRoot,
    selected,
    toggle,
    toggleAll,
    toolbar,
    onUpdateListSettings,
    onSort,
  } = props;
  // const styles = useStyles();
  const styles = {};
  const numberOfColumns = categories?.length === 0 ? 3 : 4;

  return (
    <ResponsiveTable>
      <TableHead
        colSpan={numberOfColumns}
        selected={selected}
        disabled={disabled}
        items={categories}
        toggleAll={toggleAll}
        toolbar={toolbar}
      >
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlOrdering.name
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          arrowPosition="right"
          className={styles.colName ?? ''}
          disabled={!isRoot}
          onClick={() => isRoot && onSort(CategoryListUrlOrdering.name)}
        >
          {m.dashboard_EYtiq() ?? 'Category name'}
        </TableCellHeader>
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlOrdering.subcategoryCount
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          className={styles.colSubcategories ?? ''}
          disabled={!isRoot}
          onClick={() => isRoot && onSort(CategoryListUrlOrdering.subcategoryCount)}
        >
          <>
            {/* number of subcategories */}

            {m.dashboard_HQrgz() ?? 'Subcategories'}
          </>
        </TableCellHeader>
        <TableCellHeader
          direction={
            isRoot && sort.sort === CategoryListUrlOrdering.productCount
              ? getArrowDirection(!!sort.asc)
              : undefined
          }
          className={styles.colProducts ?? ''}
          disabled={!isRoot}
          onClick={() => isRoot && onSort(CategoryListUrlOrdering.productCount)}
        >
          <>
            {/* number of products */}

            {m.dashboard__ZJ_L() ?? 'No. of Products'}
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
          categories,
          (category) => {
            const isSelected = category ? isChecked(category.id) : false;

            return (
              <TableRow
                className={styles.tableRow ?? ''}
                hover={!!category}
                key={category ? category.id : 'skeleton'}
                selected={isSelected}
                data-test-id={'id-' + category.id}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={isSelected}
                    disabled={disabled}
                    disableClickPropagation
                    onChange={() => toggle(category.id)}
                  />
                </TableCell>
                <TableCell className={styles.colName ?? ''} data-test-id="name">
                  <Link href={category && categoryUrl(category.id)}>
                    {category && category.name ? category.name : <Skeleton />}
                  </Link>
                </TableCell>
                <TableCell className={styles.colSubcategories ?? ''}>
                  {category && category.children && category.children.totalCount !== undefined ? (
                    category.children.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={styles.colProducts ?? ''}>
                  {category && category.products && category.products.totalCount !== undefined ? (
                    category.products.totalCount
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
                {isRoot
                  ? (m.dashboard_M__a_() ?? 'No categories found')
                  : (m.dashboard_rbzZt() ?? 'No subcategories found')}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </ResponsiveTable>
  );
};

CategoryList.displayName = 'CategoryList';
export default CategoryList;
