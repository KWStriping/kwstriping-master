import { useTranslation } from '@core/i18n';
import Link from '@core/ui/components/Link';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import { AVATAR_MARGIN } from '@dashboard/components/tables/TableCellAvatar/Avatar';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { CategoryDetailsQuery } from '@core/api/graphql';
import { productUrl } from '@dashboard/oldSrc/products/urls';
import type { ListActions, ListProps, RelayToFlat } from '@dashboard/oldSrc/types';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    [theme.breakpoints.up('lg')]: {
      colName: {
        width: 'auto',
      },
    },
    colFill: {
      padding: 0,
      width: '100%',
    },
    colNameHeader: {
      marginLeft: AVATAR_MARGIN,
    },
    link: {
      cursor: 'pointer',
    },
    table: {
      tableLayout: 'fixed',
    },
    tableContainer: {
      overflowX: 'scroll',
    },
  }),
  {
    name: 'CategoryProductList',
  }
);

interface CategoryProductListProps extends ListProps, ListActions {
  products: RelayToFlat<CategoryDetailsQuery['category']['products']>;
}

export const CategoryProductList: FC<CategoryProductListProps> = (props) => {
  const { disabled, isChecked, products, selected, toggle, toggleAll, toolbar } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  const numberOfColumns = 2;

  return (
    <div className={styles.tableContainer ?? ''}>
      <ResponsiveTable className={styles.table ?? ''}>
        <colgroup>
          <col />
          <col className={styles.colName ?? ''} />
        </colgroup>
        <TableHead
          colSpan={numberOfColumns}
          selected={selected}
          disabled={disabled}
          items={products}
          toggleAll={toggleAll}
          toolbar={toolbar}
        >
          <TableCell className={styles.colName ?? ''}>
            <span className={styles.colNameHeader ?? ''}>
              {t('dashboard.productName', 'Name')}
            </span>
          </TableCell>
        </TableHead>
        <TableFooter>
          <TableRow>
            <TablePaginationWithContext colSpan={numberOfColumns} />
          </TableRow>
        </TableFooter>
        <TableBody>
          {renderCollection(
            products,
            (product) => {
              const isSelected = product ? isChecked(product.id) : false;
              return (
                <TableRow
                  data-test-id="product-row"
                  selected={isSelected}
                  hover={!!product}
                  key={product ? product.id : 'skeleton'}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      disabled={disabled}
                      disableClickPropagation
                      onChange={() => toggle(product.id)}
                    />
                  </TableCell>
                  <TableCellAvatar
                    className={styles.colName ?? ''}
                    thumbnail={product.thumbnail.url}
                  >
                    {product ? (
                      <Link href={product && productUrl(product.id)} className={'block'}>
                        {product.name}
                      </Link>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCellAvatar>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {t('dashboard.1Uzbb', 'No products found')}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </div>
  );
};

CategoryProductList.displayName = 'CategoryProductList';
export default CategoryProductList;
