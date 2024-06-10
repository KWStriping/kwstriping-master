import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import type { OperationResult } from '@core/urql';
import Checkbox from '@dashboard/components/core/Checkbox';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import type {
  SearchProductsQuery,
  ShippingPriceExcludeProductMutation,
} from '@core/api/graphql';
import useSearchQuery from '@dashboard/hooks/useSearchQuery';
import type { FetchMoreProps, RelayToFlat } from '@dashboard/oldSrc/types';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TextField,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import { Fragment, useState } from 'react';
import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

const useStyles = makeStyles(
  (theme) => ({
    avatar: {
      paddingLeft: 0,
      width: 64,
    },
    content: {
      overflowY: 'scroll',
      height: 450,
    },
    searchBar: {
      marginBottom: theme.spacing(3),
    },
    loadMoreLoaderContainer: {
      alignItems: 'center',
      display: 'flex',
      height: theme.spacing(3),
      justifyContent: 'center',
      marginTop: theme.spacing(3),
    },
    overflow: {
      overflowY: 'visible',
    },
    productCheckboxCell: {
      '&:first-child': {
        paddingLeft: 0,
        paddingRight: 0,
      },
    },
  }),
  { name: 'ShippingMethodProductsAddDialog' }
);

export interface ShippingMethodProductsAddDialogProps extends FetchMoreProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  products: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  onClose: () => void;
  onFetch: (query: string) => void;
  onSubmit: (ids: string[]) => Promise<OperationResult<ShippingPriceExcludeProductMutation>>;
}

const handleProductAssign = (
  product: RelayToFlat<NonNullable<SearchProductsQuery['search']>>[0],
  isSelected: boolean,
  selectedProducts: RelayToFlat<NonNullable<SearchProductsQuery['search']>>,
  setSelectedProducts: (data: RelayToFlat<NonNullable<SearchProductsQuery['search']>>) => void
) => {
  if (isSelected) {
    setSelectedProducts(
      selectedProducts.filter((selectedProduct) => selectedProduct.id !== product.id)
    );
  } else {
    setSelectedProducts([...selectedProducts, product]);
  }
};

const scrollableTargetId = 'shippingMethodProductsAddScrollableDialog';

const ShippingMethodProductsAddDialog: FC<ShippingMethodProductsAddDialogProps> = (props) => {
  const {
    confirmButtonState,
    open,
    loading,
    hasMore,
    products,
    onFetch,
    onFetchMore,
    onClose,
    onSubmit,
  } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  const [query, onQueryChange, resetQuery] = useSearchQuery(onFetch);
  const [selectedProducts, setSelectedProducts] = useState<
    RelayToFlat<NonNullable<SearchProductsQuery['search']>>
  >([]);

  const handleSubmit = () => {
    onSubmit(selectedProducts.map((product) => product.id)).then(() => {
      setSelectedProducts([]);
      resetQuery();
    });
  };

  const handleClose = () => {
    onClose();
    setSelectedProducts([]);
    resetQuery();
  };

  return (
    <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>{t('dashboard.assignProductsDialogHeader', 'Assign Products')}</DialogTitle>
      <DialogContent>
        <div className={styles.searchBar ?? ''}>
          <TextField
            name="query"
            value={query}
            onChange={onQueryChange}
            label={t('/TF6BZ', 'Search Products')}
            placeholder={t('/TF6BZ', 'Search Products')}
            fullWidth
            InputProps={{
              autoComplete: 'off',
              endAdornment: loading && <CircularProgress size={16} />,
            }}
          />
        </div>
        <div className={styles.content ?? ''} id={scrollableTargetId}>
          <InfiniteScroll
            dataLength={products?.length}
            next={onFetchMore}
            hasMore={hasMore}
            scrollThreshold="100px"
            loader={
              <div key="loader" className={styles.loadMoreLoaderContainer ?? ''}>
                <CircularProgress size={16} />
              </div>
            }
            scrollableTarget={scrollableTargetId}
          >
            <ResponsiveTable key="table">
              <TableBody>
                {renderCollection(
                  products,
                  (product, productIndex) => {
                    const isSelected = selectedProducts.some(
                      (selectedProduct) => selectedProduct.id === product.id
                    );
                    return (
                      <Fragment key={product ? product.id : `skeleton-${productIndex}`}>
                        <TableRow>
                          <TableCell
                            padding="checkbox"
                            className={styles.productCheckboxCell ?? ''}
                          >
                            {product && (
                              <Checkbox
                                checked={isSelected}
                                disabled={loading}
                                onChange={() =>
                                  handleProductAssign(
                                    product,
                                    isSelected,
                                    selectedProducts,
                                    setSelectedProducts
                                  )
                                }
                              />
                            )}
                          </TableCell>
                          <TableCellAvatar
                            className={styles.avatar ?? ''}
                            thumbnail={product?.thumbnail?.url}
                          />
                          <TableCell className={styles.colName ?? ''} colSpan={2}>
                            {product?.name || <Skeleton />}
                          </TableCell>
                        </TableRow>
                      </Fragment>
                    );
                  },
                  () => (
                    <TableRow>
                      <TableCell colSpan={4}>
                        {t('dashboard.ZvuVw', 'No products matching given query')}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </ResponsiveTable>
          </InfiniteScroll>
        </div>
      </DialogContent>
      <DialogActions>
        <BackButton onClick={handleClose} />
        <ConfirmButton
          transitionState={confirmButtonState}
          type="submit"
          disabled={loading || !selectedProducts?.length}
          onClick={handleSubmit}
        >
          <>
            {/* assign products to shipping rate and save, button */}
            {t('dashboard.assignAndSave', 'Assign and save')}
          </>
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
ShippingMethodProductsAddDialog.displayName = 'ShippingMethodProductsAddDialog';
export default ShippingMethodProductsAddDialog;
