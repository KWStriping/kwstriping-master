import * as m from '@paraglide/messages';
import { Trans, useTranslation } from '@tempo/next/i18n';
import Button from '@tempo/ui/components/buttons/Button';
import Debounce from '@tempo/ui/components/Debounce';
import DialogHeader from '@tempo/ui/components/dialog/DialogHeader';
import DialogTable from '@tempo/ui/components/dialog/DialogTable';
import { ScrollShadow } from '@tempo/ui/components/ScrollShadow';
import {
  isScrolledToBottom,
  isScrolledToTop,
  useElementScroll,
} from '@tempo/ui/components/tools';
import { useSearch } from '@tempo/api/hooks';
import { getById } from '@tempo/utils';
import type {
  OrderFulfillmentLineFragment,
  WarehouseFragment,
} from '@tempo/api/generated/graphql';
import { SearchWarehousesDocument } from '@tempo/api/generated/graphql';
import { getLineAvailableQuantityInWarehouse } from '@tempo/dashboard/oldSrc/orders/utils/data';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import SearchIcon from '@mui/icons-material/Search';
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  InputAdornment,
  Radio,
  RadioGroup,
  TableCell,
  TextField,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';
import { changeWarehouseDialogMessages as messages } from './messages';
import { useStyles } from './styles';

export interface OrderChangeWarehouseDialogProps {
  open: boolean;
  line: Maybe<OrderFulfillmentLineFragment>;
  currentWarehouseId: string;
  onConfirm: (warehouse: WarehouseFragment) => void;
  onClose: () => void;
}

export const OrderChangeWarehouseDialog: FC<OrderChangeWarehouseDialogProps> = ({
  open,
  line,
  currentWarehouseId,
  onConfirm,
  onClose,
}) => {
  const styles = useStyles();
  const { anchor, position, setAnchor } = useElementScroll();
  const topShadow = isScrolledToTop(anchor, position, 20) === false;
  const bottomShadow = isScrolledToBottom(anchor, position, 20) === false;

  const [query, setQuery] = useState<string>('');
  const [selectedWarehouseId, setSelectedWarehouseId] = useState<string | null>(null);

  useEffect(() => {
    if (currentWarehouseId) {
      setSelectedWarehouseId(currentWarehouseId);
    }
  }, [currentWarehouseId]);

  const {
    result: warehousesOpts,
    loadMore,
    search,
  } = useSearch(SearchWarehousesDocument, {
    variables: {
      after: null,
      first: 20,
      query: '',
    },
  });
  const filteredWarehouses = mapEdgesToItems(warehousesOpts?.data?.search);

  const selectedWarehouse = filteredWarehouses?.find(getById(selectedWarehouseId ?? ''));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedWarehouseId(e.target.value);
  };
  const handleSubmit = () => {
    onConfirm(selectedWarehouse);
    onClose();
  };

  useEffect(() => {
    if (!bottomShadow) {
      // loadMore();
    }
  }, [bottomShadow]);

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <ScrollShadow variant="top" show={topShadow}>
        <DialogHeader onClose={onClose}>
          {m.dashboard_ialogTitle() ?? 'Change warehouse'}
        </DialogHeader>

        <DialogContent className={styles.container ?? ''}>
          <Trans
            {...messages.dialogDescription}
            values={{
              productName: line?.productName,
            }}
          />
          <Debounce debounceFn={search}>
            {(debounceSearchChange) => {
              const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setQuery(value);
                debounceSearchChange(value);
              };
              return (
                <TextField
                  className={styles.searchBox ?? ''}
                  value={query}
                  variant="outlined"
                  onChange={handleSearchChange}
                  placeholder={m.dashboard_searchFieldPlaceholder() ?? 'Search warehouses'}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{ className: styles.searchInput }}
                />
              );
            }}
          </Debounce>

          <Typography className={styles.supportHeader ?? ''}>
            {m.dashboard_warehouseListLabel() ?? 'Warehouses A to Z'}
          </Typography>
        </DialogContent>
      </ScrollShadow>

      <DialogTable ref={setAnchor}>
        {filteredWarehouses ? (
          <RadioGroup
            value={selectedWarehouseId}
            onChange={handleChange}
            className={styles.tableBody ?? ''}
          >
            {filteredWarehouses.map((warehouse) => {
              const lineQuantityInWarehouse = getLineAvailableQuantityInWarehouse(
                line,
                warehouse
              );
              return (
                <TableRow key={warehouse.id}>
                  <TableCell className={styles.tableCell ?? ''}>
                    <FormControlLabel
                      value={warehouse.id}
                      control={<Radio color="primary" />}
                      label={
                        <div className={styles.radioLabelContainer ?? ''}>
                          <span className={styles.warehouseName ?? ''}>{warehouse.name}</span>
                          <Typography className={styles.supportText ?? ''}>
                            <Trans
                              {...messages.productAvailability}
                              values={{
                                productCount: lineQuantityInWarehouse,
                              }}
                            />
                          </Typography>
                        </div>
                      }
                    />
                    {currentWarehouseId === warehouse?.id && (
                      <Typography className={styles.helpText ?? ''}>
                        {m.dashboard_urrentSelection() ?? 'currently selected'}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </RadioGroup>
        ) : (
          <Skeleton />
        )}
      </DialogTable>
      <ScrollShadow variant="bottom" show={bottomShadow}>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary" disabled={!selectedWarehouse}>
            {m.dashboard_select() ?? 'Select'}
          </Button>
        </DialogActions>
      </ScrollShadow>
    </Dialog>
  );
};
OrderChangeWarehouseDialog.displayName = 'OrderChangeWarehouseDialog';
export default OrderChangeWarehouseDialog;
