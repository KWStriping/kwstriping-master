import { useTranslation } from '@core/i18n';
import BackButton from '@core/ui/components/buttons/BackButton';
import ConfirmButton from '@core/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Checkbox from '@dashboard/components/core/Checkbox';
import Money from '@dashboard/components/core/Money';
import ResponsiveTable from '@dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import type { SearchProductsQuery } from '@core/api/graphql';
import useSearchQuery from '@dashboard/hooks/useSearchQuery';
import { renderCollection } from '@core/ui/utils';
import useScrollableDialogStyle from '@dashboard/oldSrc/styles/useScrollableDialogStyle';
import type { DialogProps, FetchMoreProps, RelayToFlat } from '@dashboard/oldSrc/types';
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TableRow,
  TextField,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { Fragment, useState } from 'react';
import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import styles from './index.module.css';
import type { SearchVariant } from './utils';
import {
  handleProductAssign,
  handleVariantAssign,
  hasAllVariantsSelected,
  isVariantSelected,
} from './utils';

export interface AssignVariantDialogFormData {
  products: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  query: string;
}
export interface AssignVariantDialogProps extends FetchMoreProps, DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  products: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  loading: boolean;
  onFetch: (value: string) => void;
  onSubmit: (data: string[]) => void;
}

const scrollableTargetId = 'assignVariantScrollableDialog';

const AssignVariantDialog: FC<AssignVariantDialogProps> = ({
  confirmButtonState,
  hasMore,
  open,
  loading,
  products,
  onClose,
  onFetch,
  onFetchMore,
  onSubmit,
}) => {
  const scrollableDialogClasses = useScrollableDialogStyle({});

  const { t } = useTranslation();
  const [query, onQueryChange] = useSearchQuery(onFetch);
  const [variants, setVariants] = useState<SearchVariant[]>([]);

  const productChoices = products?.filter((product) => !!product?.variants?.length) || [];

  const selectedVariantsToProductsMap = productChoices
    ? productChoices.map((product) =>
        product.variants?.map((variant) => isVariantSelected(variant, variants))
      )
    : [];

  const productsWithAllVariantsSelected = productChoices
    ? productChoices.map((product) => hasAllVariantsSelected(product.variants, variants))
    : [];

  const handleSubmit = () => onSubmit(variants.map((variant) => variant.id));

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{ paper: scrollableDialogClasses.dialog }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{t('dashboard.assignVariantDialogHeader', 'Assign Variant')}</DialogTitle>
      <DialogContent>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={t(
            'dashboard.assignVariantDialogSearch',
            'Search by product name, attribute, product type etc...'
          )}
          placeholder={t('dashboard.assignVariantDialogContent', 'Search Variants')}
          fullWidth
          InputProps={{
            autoComplete: 'off',
            endAdornment: loading && <CircularProgress size={16} />,
          }}
        />
      </DialogContent>
      <DialogContent className={scrollableDialogClasses.scrollArea} id={scrollableTargetId}>
        <InfiniteScroll
          dataLength={variants?.length}
          next={onFetchMore}
          hasMore={hasMore}
          scrollThreshold="100px"
          loader={
            <div className={scrollableDialogClasses.loadMoreLoaderContainer}>
              <CircularProgress size={16} />
            </div>
          }
          scrollableTarget={scrollableTargetId}
        >
          <ResponsiveTable key="table">
            <TableBody>
              {renderCollection(
                productChoices,
                (product, productIndex) =>
                  !product ? null : (
                    <Fragment key={product ? product.id : 'skeleton'}>
                      <TableRow>
                        <TableCell
                          padding="checkbox"
                          className={styles.productCheckboxCell ?? ''}
                        >
                          <Checkbox
                            checked={productsWithAllVariantsSelected[productIndex]}
                            disabled={loading}
                            onChange={() =>
                              handleProductAssign(
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
                      {(product.variants ?? []).map((variant, variantIndex) =>
                        !variant ? null : (
                          <TableRow key={variant.id} data-test-id="assign-variant-table-row">
                            <TableCell />
                            <TableCell className={styles.colVariantCheckbox ?? ''}>
                              <Checkbox
                                className={styles.variantCheckbox ?? ''}
                                checked={
                                  selectedVariantsToProductsMap[productIndex][variantIndex]
                                }
                                disabled={loading}
                                onChange={() =>
                                  handleVariantAssign(
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
                              <div className={styles.grayText ?? ''}>
                                {t('dashboard.assignVariantDialogSKU', 'SKU: {{sku}}', {
                                  sku: variant.sku,
                                })}
                              </div>
                            </TableCell>
                            <TableCell className={styles.textRight ?? ''}>
                              {variant?.channelListings?.[0]?.price && (
                                <Money money={variant.channelListings[0].price} />
                              )}
                            </TableCell>
                          </TableRow>
                        )
                      )}
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
      </DialogContent>
      <DialogActions>
        <BackButton onClick={onClose} />
        <ConfirmButton
          data-test-id="submit"
          transitionState={confirmButtonState}
          type="submit"
          onClick={handleSubmit}
        >
          {t('dashboard.assignVariantDialogButton', 'Assign and save')}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignVariantDialog.displayName = 'AssignVariantDialog';
export default AssignVariantDialog;
