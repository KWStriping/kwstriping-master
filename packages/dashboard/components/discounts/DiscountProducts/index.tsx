import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import IconButton from '@core/ui/components/buttons/IconButton/IconButton';
import { renderCollection } from '@core/ui/utils';
import { ChannelsAvailabilityDropdown } from '@dashboard/components/channels/ChannelsAvailabilityDropdown';
import CardTitle from '@dashboard/components/core/CardTitle';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import { TableButtonWrapper } from '@dashboard/components/tables/TableButtonWrapper/TableButtonWrapper';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import TableHead from '@dashboard/components/tables/TableHead';
import { TablePaginationWithContext } from '@dashboard/components/tables/TablePagination';
import type { SaleDetailsFragment, VoucherDetailsFragment } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import { productUrl } from '@dashboard/oldSrc/products/urls';
import type { ListActions, ListProps, RelayToFlat } from '@dashboard/oldSrc/types';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import type { FC, ReactNode } from 'react';

export interface SaleProductsProps extends ListProps, ListActions {
  products:
    | RelayToFlat<SaleDetailsFragment['products']>
    | RelayToFlat<VoucherDetailsFragment['products']>;
  onProductAssign: () => void;
  onProductUnassign: (id: string) => void;
}

const numberOfColumns = 5;

const DiscountProducts: FC<SaleProductsProps> = (props) => {
  const {
    products,
    disabled,
    onProductAssign,
    onProductUnassign,
    isChecked,
    selected,
    toggle,
    toggleAll,
    toolbar,
  } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t('dashboard.discountProductsHeader', 'Eligible Products')}
        toolbar={
          <Button onClick={onProductAssign} data-test-id="assign-products">
            {t('dashboard.discountProductsButton', 'Assign products')}
          </Button>
        }
      />
      <ResponsiveTable>
        <colgroup>
          <col />
          <col className={styles.colName ?? ''} />
          <col className={styles.colType ?? ''} />
          <col className={styles.colPublished ?? ''} />
          <col className={styles.colActions ?? ''} />
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
            <span className={!!products?.length && styles.colNameLabel}>
              {t('dashboard.discountProductsTableProductHeader', 'Product Name')}
            </span>
          </TableCell>
          <TableCell className={styles.colType ?? ''}>
            {t('dashboard.discountProductsTableTypeHeader', 'Product Type')}
          </TableCell>
          <TableCell className={styles.colPublished ?? ''}>
            {t('dashboard.discountProductsTableAvailabilityHeader', 'Availability')}
          </TableCell>
          <TableCell className={styles.colActions ?? ''} />
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
                  hover={!!product}
                  key={product ? product.id : 'skeleton'}
                  href={product && productUrl(product.id)}
                  className={styles.tableRow ?? ''}
                  selected={isSelected}
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
                    {maybe<ReactNode>(() => product.name, <Skeleton />)}
                  </TableCellAvatar>
                  <TableCell className={styles.colType ?? ''}>
                    {maybe<ReactNode>(() => product.productKlass.name, <Skeleton />)}
                  </TableCell>
                  <TableCell className={styles.colType ?? ''}>
                    {product && !product?.channelListings?.length ? (
                      '-'
                    ) : product?.channelListings !== undefined ? (
                      <ChannelsAvailabilityDropdown channels={product?.channelListings} />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={styles.colActions ?? ''}>
                    <TableButtonWrapper>
                      <IconButton
                        color="secondary"
                        disabled={!product || disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          onProductUnassign(product.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={numberOfColumns}>
                  {t('dashboard.discountProductsNotFound', 'No products found')}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
DiscountProducts.displayName = 'DiscountProducts';
export default DiscountProducts;
