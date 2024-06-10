import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import IconButton from '@tempo/ui/components/buttons/IconButton';
import { makeStyles } from '@tempo/ui/theme/styles';

import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import TableHead from '@tempo/dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@tempo/dashboard/components/tables/TablePagination';
import type { ShippingZoneQuery } from '@tempo/api/generated/graphql';
import { renderCollection } from '@tempo/ui/utils';
import type { ListActions, ListProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    colAction: {
      '&:last-child': {
        paddingRight: theme.spacing(3),
      },
      textAlign: 'right',
      width: 100,
    },
    colName: {
      width: 'auto',
    },
    colProductName: {
      paddingLeft: 0,
    },
    table: {
      tableLayout: 'fixed',
    },
  }),
  { name: 'ShippingMethodProducts' }
);

export interface ShippingMethodProductsProps
  extends Pick<ListProps, Exclude<keyof ListProps, 'getRowHref'>>,
    ListActions {
  products: RelayToFlat<
    ShippingZoneQuery['shippingZone']['shippingMethods'][0]['excludedProducts']
  >;
  onProductAssign: () => void;
  onProductUnassign: (ids: string[]) => void;
}

const numberOfColumns = 3;

const ShippingMethodProducts: FC<ShippingMethodProductsProps> = (props) => {
  const {
    disabled,
    products,
    onProductAssign,
    onProductUnassign,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  // const styles = useStyles();
  const styles = {};

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard__aiWF() ?? 'Excluded Products'
          // section header
        }
        toolbar={
          <Button color="secondary" onClick={onProductAssign}>
            <>
              {/* button */}

              {m.dashboard__eeLW() ?? 'Assign products'}
            </>
          </Button>
        }
      />
      <ResponsiveTable className={styles.table ?? ''}>
        {!!products?.length && (
          <>
            <TableHead
              colSpan={numberOfColumns}
              selected={selected}
              disabled={disabled}
              items={products}
              toggleAll={toggleAll}
              toolbar={toolbar}
            >
              <TableCell className={styles.colProductName ?? ''}>
                {m.dashboard_Ic_lM() ?? 'Product Name'}
              </TableCell>
              <TableCell className={styles.colAction ?? ''}>
                {m.dashboard_L_VAE() ?? 'Actions'}
              </TableCell>
            </TableHead>
            <TableFooter>
              <TableRow>
                <TablePaginationWithContext colSpan={numberOfColumns} disabled={disabled} />
              </TableRow>
            </TableFooter>
          </>
        )}
        <TableBody>
          {products?.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5}>{m.dashboard_g_() + K7 ?? 'No Products'}</TableCell>
            </TableRow>
          ) : (
            renderCollection(products, (product) => {
              const isSelected = product ? isChecked(product.id) : false;
              // const styles = useStyles();
              const styles = {};
              return (
                <TableRow key={product ? product.id : 'skeleton'}>
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
                    thumbnail={product?.thumbnail?.url}
                  >
                    {product?.name ? (
                      <Typography variant="body2">{product.name}</Typography>
                    ) : (
                      <Skeleton />
                    )}
                  </TableCellAvatar>
                  <TableCell className={styles.colAction ?? ''}>
                    <IconButton color="secondary" onClick={() => onProductUnassign([product.id])}>
                      <DeleteIcon color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
ShippingMethodProducts.displayName = 'ShippingMethodProducts';
export default ShippingMethodProducts;
