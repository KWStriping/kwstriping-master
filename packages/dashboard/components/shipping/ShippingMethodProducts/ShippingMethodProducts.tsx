import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton';
import { makeStyles } from '@core/ui/theme/styles';

import CardTitle from '@dashboard/components/core/CardTitle';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { ShippingZoneQuery } from '@core/api/graphql';
import { renderCollection } from '@core/ui/utils';
import type { ListActions, ListProps, RelayToFlat } from '@dashboard/oldSrc/types';
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
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.3aiWF',
          'Excluded Products'
          // section header
        )}
        toolbar={
          <Button color="secondary" onClick={onProductAssign}>
            <>
              {/* button */}

              {t('dashboard.8eeLW', 'Assign products')}
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
                {t('dashboard.Ic5lM', 'Product Name')}
              </TableCell>
              <TableCell className={styles.colAction ?? ''}>
                {t('dashboard.L7VAE', 'Actions')}
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
              <TableCell colSpan={5}>{t('dashboard.g4+K7', 'No Products')}</TableCell>
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
