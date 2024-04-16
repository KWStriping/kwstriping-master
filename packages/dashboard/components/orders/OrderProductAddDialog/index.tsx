import { Trans, useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import { renderCollection } from '@core/ui/utils';
import Checkbox from '@dashboard/components/core/Checkbox';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import type { OrderErrorFragment, SearchOrderVariantQuery } from '@core/api/graphql';
import useModalDialogErrors from '@dashboard/hooks/useModalDialogErrors';
import useModalDialogOpen from '@dashboard/hooks/useModalDialogOpen';
import useSearchQuery from '@dashboard/hooks/useSearchQuery';
import type { FetchMoreProps, RelayToFlat } from '@dashboard/oldSrc/types';
import getOrderErrorMessage from '@dashboard/oldSrc/utils/errors/order';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TableBody,
  TableCell,
  TextField,
} from '@mui/material';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import OrderPriceLabel from '../OrderPriceLabel/OrderPriceLabel';

import { messages } from './messages';
import { hasAllVariantsSelected, isVariantSelected, onProductAdd, onVariantAdd } from './utils';

export interface OrderProductAddDialogProps extends FetchMoreProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  products: RelayToFlat<NonNullable<SearchOrderVariantQuery['search']>>;
  onClose: () => void;
  onFetch: (query: string) => void;
  onSubmit: (data: SearchOrderVariantQuery['search']['edges'][0]['node']['variants']) => void;
}

const scrollableTargetId = 'orderProductAddScrollableDialog';

const OrderProductAddDialog: FC<OrderProductAddDialogProps> = (props) => {
  const {
    confirmButtonState,
    errors: apiErrors,
    open,
    loading,
    hasMore,
    products,
    onFetch,
    onFetchMore,
    onClose,
    onSubmit,
  } = props;
  const { t } = useTranslation();
  const [query, onQueryChange] = useSearchQuery(onFetch);
  const [variants, setVariants] = useState<
    SearchOrderVariantQuery['search']['edges'][0]['node']['variants']
  >([]);
  const errors = useModalDialogErrors(apiErrors, open);

  useModalDialogOpen(open, {
    onClose: () => setVariants([]),
  });

  const isValidVariant = ({
    pricing,
  }: SearchOrderVariantQuery['search']['edges'][0]['node']['variants'][0]) => !!pricing;

  const getValidProducts = ({
    variants,
  }: SearchOrderVariantQuery['search']['edges'][0]['node']) => variants.filter(isValidVariant);

  const productChoices =
    products?.filter((product) => getValidProducts(product).length > 0) || [];

  const selectedVariantsToProductsMap = productChoices
    ? productChoices.map((product) =>
        getValidProducts(product).map((variant) => isVariantSelected(variant, variants))
      )
    : [];

  const productsWithAllVariantsSelected = productChoices
    ? productChoices.map((product) =>
        hasAllVariantsSelected(getValidProducts(product), variants)
      )
    : [];

  const handleSubmit = () => onSubmit(variants);

  const productChoicesWithValidVariants = productChoices.filter(({ variants }) =>
    variants.some(isValidVariant)
  );

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{ paper: styles.overflow }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t('dashboard.title', 'Add product')}</DialogTitle>
      <DialogContent data-test-id="search-query">
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={t('dashboard.search', 'Search products')}
          placeholder={t(
            'dashboard.searchPlaceholder',
            'Search by product name, attribute, product type etc...'
          )}
          fullWidth
          InputProps={{
            autoComplete: 'off',
            endAdornment: loading && <CircularProgress size={16} />,
          }}
        />
      </DialogContent>
      <DialogContent className={styles.content ?? ''} id={scrollableTargetId}>
        <InfiniteScroll
          dataLength={productChoicesWithValidVariants?.length}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <div className={styles.loadMoreLoaderContainer ?? ''}>
              <CircularProgress size={16} />
            </div>
          }
          scrollableTarget={scrollableTargetId}
        >
          <ResponsiveTable key="table">
            <TableBody>
              {renderCollection(
                productChoicesWithValidVariants,
                (product, productIndex) => (
                  <Fragment key={product ? product.id : 'skeleton'}>
                    <TableRow>
                      <TableCell padding="checkbox" className={styles.productCheckboxCell ?? ''}>
                        <Checkbox
                          checked={productsWithAllVariantsSelected[productIndex]}
                          disabled={loading}
                          onChange={() =>
                            onProductAdd(
                              product,
                              productIndex,
                              productsWithAllVariantsSelected,
                              variants,
                              setVariants
                            )
                          }
                        />
                      </TableCell>
                      <TableCellAvatar
                        className={styles.avatar ?? ''}
                        thumbnail={product.thumbnail.url}
                      />
                      <TableCell className={styles.colName ?? ''} colSpan={2}>
                        {product.name}
                      </TableCell>
                    </TableRow>
                    {(product.variants ?? [])
                      .filter(isValidVariant)
                      .map((variant, variantIndex) => (
                        <TableRow key={variant.id}>
                          <TableCell />
                          <TableCell className={styles.colVariantCheckbox ?? ''}>
                            <Checkbox
                              className={styles.variantCheckbox ?? ''}
                              checked={selectedVariantsToProductsMap[productIndex][variantIndex]}
                              disabled={loading}
                              onChange={() =>
                                onVariantAdd(
                                  variant,
                                  variantIndex,
                                  productIndex,
                                  variants,
                                  selectedVariantsToProductsMap,
                                  setVariants
                                )
                              }
                            />
                          </TableCell>
                          <TableCell className={styles.colName ?? ''}>
                            <div>{variant.name}</div>
                            {variant.sku && (
                              <div className={styles.grayText ?? ''}>
                                <Trans
                                  {...messages.sku}
                                  values={{
                                    sku: variant.sku,
                                  }}
                                />
                              </div>
                            )}
                          </TableCell>
                          <TableCell className={styles.textRight ?? ''}>
                            <OrderPriceLabel pricing={variant.pricing} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </Fragment>
                ),
                () => (
                  <Typography className={styles.noContentText ?? ''}>
                    {query
                      ? t(
                          'dashboard.noProductsInQuery',
                          'No products are available matching query in the channel assigned to this order.'
                        )
                      : t(
                          'dashboard.noProductsInChannel',
                          'No products are available in the channel assigned to this order.'
                        )}
                  </Typography>
                )
              )}
            </TableBody>
          </ResponsiveTable>
        </InfiniteScroll>
        {!!errors?.length && (
          <>
            <FormSpacer />
            {errors.map((err, index) => (
              <DialogContentText color="error" key={index}>
                {getOrderErrorMessage(err, t)}
              </DialogContentText>
            ))}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton transitionState={confirmButtonState} type="submit" onClick={handleSubmit}>
          {t('dashboard.onfirm', 'Confirm')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderProductAddDialog.displayName = 'OrderProductAddDialog';
export default OrderProductAddDialog;
