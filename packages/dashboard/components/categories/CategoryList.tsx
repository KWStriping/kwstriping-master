import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
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
import type { CategoryFragment } from '@core/api/graphql';
import { CategoryListUrlOrdering, categoryUrl } from '@dashboard/oldSrc/categories/urls';
import type { ListActions, ListProps, SortPage } from '@dashboard/oldSrc/types';
import { getArrowDirection } from '@dashboard/oldSrc/utils/sort';

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
  const { t } = useTranslation();
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
          {t('dashboard.EYtiq', 'Category name')}
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

            {t('dashboard.HQrgz', 'Subcategories')}
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

            {t('dashboard.8ZJ5L', 'No. of Products')}
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
                  ? t('dashboard.M86a2', 'No categories found')
                  : t('dashboard.rbzZt', 'No subcategories found')}
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
