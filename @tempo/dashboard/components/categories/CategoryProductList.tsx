import * as m from '@paraglide/messages';
import Link from '@tempo/ui/components/Link';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import { AVATAR_MARGIN } from '@tempo/dashboard/components/tables/TableCellAvatar/Avatar';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import type { CategoryDetailsQuery } from '@tempo/api/generated/graphql';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import type { ListActions, ListProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';
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
              {m.dashboard_productName() ?? 'Name'}
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
                  {m.dashboard__Uzbb() ?? 'No products found'}
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
