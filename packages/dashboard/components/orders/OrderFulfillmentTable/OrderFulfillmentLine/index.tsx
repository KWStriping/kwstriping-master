import { useTranslation } from '@core/i18n';
import MuiAutocomplete from '@core/ui/components/inputs/MuiAutocomplete';
import Tooltip from '@core/ui/components/Tooltip';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import type {
  OrderFulfillmentLineFragment,
  WarehouseFragment,
} from '@core/api/graphql';
import {
  getAttributesCaption,
  getLineAllocationWithHighestQuantity,
  getOrderLineAvailableQuantity,
  getWarehouseStock,
} from '@dashboard/oldSrc/orders/utils/data';
import WarningIcon from '@mui/icons-material/Warning';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC } from 'react';
import { useMemo } from 'react';
import { useStyles } from './styles';

interface OrderFulfillmentLineProps {
  line: Pick<
    OrderFulfillmentLineFragment,
    'id' | 'productName' | 'thumbnail' | 'allocations' | 'quantityToFulfill' | 'variant'
  >;
  lineIndex: number;
  hideQuantity?: boolean;
  hideStock?: boolean;
  warehouses: Maybe<WarehouseFragment[]>;
}

export const OrderFulfillmentLine: FC<OrderFulfillmentLineProps> = ({
  line,
  lineIndex,
  hideQuantity = false,
  hideStock = false,
  warehouses,
}) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const highestQuantityAllocation = getLineAllocationWithHighestQuantity(line);
  const warehouse =
    highestQuantityAllocation?.warehouse ??
    (warehouses?.length === 1 ? warehouses[0] : undefined);

  const isDeletedVariant = !line?.variant;
  const isPreorder = !!line?.variant?.preorder;
  const quantityToFulfill = isPreorder ? 0 : line.quantityToFulfill;

  const overfulfill = !!quantityToFulfill && quantityToFulfill > line.quantityToFulfill; // TODO

  const warehouseStock = useMemo(() => {
    return (
      warehouse && line?.variant?.stocks && getWarehouseStock(line?.variant?.stocks, warehouse.id)
    );
  }, [warehouse, line]);

  const availableQuantity = getOrderLineAvailableQuantity(line, warehouseStock);
  const isStockExceeded = !!quantityToFulfill && quantityToFulfill > availableQuantity;
  return (
    <TableRow key={line.id}>
      <TableCellAvatar
        className={styles.colName ?? ''}
        thumbnail={line?.thumbnail?.url}
        badge={
          isPreorder || !line?.variant ? (
            <Tooltip
              variant="warning"
              title={
                isPreorder
                  ? t(
                      'dashboard.preorderWarning',
                      'This product is still in preorder. You will be able to fulfill it after it reaches it’s release date'
                    )
                  : t(
                      'dashboard.deletedVariantWarning',
                      'This variant no longer exists. You can still fulfill it.'
                    )
              }
            >
              <div className={styles.warningIcon ?? ''}>
                <WarningIcon />
              </div>
            </Tooltip>
          ) : undefined
        }
      >
        {line.productName}
        <Typography color="textSecondary" variant="caption">
          {getAttributesCaption(line.variant?.attributes)}
        </Typography>
      </TableCellAvatar>
      <TableCell className={styles.colSku ?? ''}>{line.variant?.sku}</TableCell>
      {isPreorder ? (
        <TableCell className={styles.colQuantity ?? ''} />
      ) : (
        <TableCell
          className={clsx(styles.colQuantity ?? '', hideQuantity && 'hidden')}
          key={warehouseStock?.id ?? 'deletedVariant' + lineIndex}
        >
          <TextField
            type="number"
            inputProps={{
              className: clsx(
                styles.quantityInnerInput ?? '',
                !line.variant?.trackInventory && styles.quantityInnerInputNoRemaining
              ),
              min: 0,
              style: { textAlign: 'right' },
            }}
            fullWidth
            value={quantityToFulfill}
            onChange={(event) =>
              warehouse &&
              formsetChange(line.id, [
                {
                  quantity: parseInt(event.target.value, 10),
                  warehouse: warehouse,
                },
              ])
            }
            error={overfulfill}
            variant="outlined"
            InputProps={{
              classes: {
                ...(isStockExceeded &&
                  !overfulfill && {
                    notchedOutline: styles.warning ?? '',
                  }),
              },
              endAdornment: (
                <div className={styles.remainingQuantity ?? ''}>/ {line.quantityToFulfill}</div>
              ),
            }}
          />
        </TableCell>
      )}
      <TableCell className={clsx(styles.colStock ?? '', hideStock && 'hidden')} key="total">
        {warehouse ? (isPreorder || isDeletedVariant ? undefined : availableQuantity) : '-'}
      </TableCell>
      <TableCell className={styles.colWarehouse ?? ''}>
        {isPreorder ? (
          '-'
        ) : (
          <MuiAutocomplete
            options={warehouses ?? []}
            disableClearable={true}
            value={warehouse}
            getOptionLabel={(option) =>
              option ? (typeof option === 'string' ? option : option.name) : ''
            }
            isOptionEqualToValue={(option, value) =>
              typeof value === 'string' ? option.id === value : option.id === value?.id
            }
            renderInput={({ InputProps, inputProps, ...params }) => {
              const readOnly = warehouses?.length === 1;
              return (
                <TextField
                  label={''}
                  name={'warehouse'}
                  value={warehouse?.name}
                  {...params}
                  InputProps={{
                    ...InputProps,
                    readOnly,
                  }}
                  inputProps={{
                    ...inputProps,
                    readOnly,
                  }}
                />
              );
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};
OrderFulfillmentLine.displayName = 'OrderFulfillmentLine';
export default OrderFulfillmentLine;
