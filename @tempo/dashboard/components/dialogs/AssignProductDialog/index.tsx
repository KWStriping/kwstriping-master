import * as m from '@paraglide/messages';
import BackButton from '@tempo/ui/components/buttons/BackButton';
import ConfirmButton from '@tempo/ui/components/buttons/ConfirmButton';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { SearchProductsQuery } from '@tempo/api/generated/graphql';
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
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import type { FC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import ResponsiveTable from '@tempo/dashboard/components/tables/ResponsiveTable';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import useModalDialogOpen from '@tempo/dashboard/hooks/useModalDialogOpen';
import useSearchQuery from '@tempo/dashboard/hooks/useSearchQuery';
import useScrollableDialogStyle from '@tempo/dashboard/oldSrc/styles/useScrollableDialogStyle';
import type { DialogProps, FetchMoreProps, RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export interface AssignProductDialogFormData {
  products: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  query: string;
}

export interface AssignProductDialogProps extends FetchMoreProps, DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  products: RelayToFlat<NonNullable<SearchProductsQuery['search']>>;
  selectedIds?: Record<string, boolean>;
  loading: boolean;
  onFetch: (value: string) => void;
  onSubmit: (data: string[]) => void;
}

const scrollableTargetId = 'assignProductScrollableDialog';

const AssignProductDialog: FC<AssignProductDialogProps> = (props) => {
  const {
    confirmButtonState,
    hasMore,
    open,
    loading,
    products,
    onClose,
    onFetch,
    onFetchMore,
    onSubmit,
    selectedIds,
  } = props;
  const styles = useStyles(props);
  const scrollableDialogClasses = useScrollableDialogStyle({});
  const [query, onQueryChange, queryReset] = useSearchQuery(onFetch);
  const [productsDict, setProductsDict] = useState(selectedIds || {});

  useEffect(() => {
    if (selectedIds) {
      setProductsDict((prev) => {
        const prevIds = Object.keys(prev);
        const newIds = Object.keys(selectedIds);

        const preSelected = newIds
          .filter((n) => !prevIds.includes(n))
          .reduce((p, c) => ({ ...p, [c]: true }), {});

        return { ...prev, ...preSelected };
      });
    }
  }, [selectedIds]);

  useModalDialogOpen(open, {
    onOpen: () => {
      queryReset();
      setProductsDict(selectedIds || {});
    },
  });

  const handleSubmit = () => {
    const selectedProductsAsArray = Object.keys(productsDict)
      .filter((key) => productsDict[key])
      .map((key) => key);

    onSubmit(selectedProductsAsArray);
  };

  const handleChange = (productId) => {
    setProductsDict((prev) => ({
      ...prev,
      [productId]: !prev[productId] ?? true,
    }));
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      classes={{ paper: scrollableDialogClasses.dialog }}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>{m.dashboard_assignVariantDialogHeader() ?? 'Assign product'}</DialogTitle>
      <DialogContent>
        <TextField
          name="query"
          value={query}
          onChange={onQueryChange}
          label={
            m.dashboard_assignProductDialogSearch() ??
            'Search by product name, attribute, product type etc...'
          }
          placeholder={m.dashboard_assignProductDialogContent() ?? 'Search products'}
          fullWidth
          InputProps={{
            autoComplete: 'off',
            endAdornment: loading && <CircularProgress size={16} />,
          }}
        />
      </DialogContent>
      <DialogContent className={scrollableDialogClasses.scrollArea} id={scrollableTargetId}>
        <InfiniteScroll
          dataLength={products?.length ?? 0}
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
              {products &&
                products.map((product) => {
                  const isSelected = productsDict[product.id] || false;

                  return (
                    <TableRow key={product.id} data-test-id="assign-product-table-row">
                      <TableCellAvatar
                        className={styles.avatar ?? ''}
                        thumbnail={product.thumbnail.url}
                      />
                      <TableCell className={styles.colName ?? ''}>{product.name}</TableCell>
                      <TableCell padding="checkbox" className={styles.checkboxCell ?? ''}>
                        <Checkbox
                          checked={isSelected}
                          onChange={() => handleChange(product.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
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
          {m.dashboard_assignProductDialogButton() ?? 'Assign and save'}
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
AssignProductDialog.displayName = 'AssignProductDialog';
export default AssignProductDialog;
