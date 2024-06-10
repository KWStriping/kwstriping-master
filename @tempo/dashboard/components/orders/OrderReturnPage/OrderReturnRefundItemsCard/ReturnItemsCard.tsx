import * as m from '@paraglide/messages';
import { ResponsiveTable } from '@tempo/ui/components/table/ResponsiveTable';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import { getById } from '@tempo/utils';
import Money from '@tempo/dashboard/components/core/Money';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import type {
  OrderDetailsFragment,
  OrderErrorFragment,
  OrderLineFragment,
} from '@tempo/api/generated/graphql';
import type { FormsetChange } from '@tempo/dashboard/hooks/useFormset';
import { Card, Checkbox } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC, CSSProperties } from 'react';

import OrderCardTitle from '../../OrderCardTitle';
import type { FormsetQuantityData, FormsetReplacementData } from '../form';
import { getQuantityDataFromItems, getReplacementDataFromItems } from '../utils';
import MaximalButton from './MaximalButton';
import ProductErrorCell from './ProductErrorCell';

const useStyles = makeStyles(
  (theme) => {
    const inputPadding: CSSProperties = {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    };

    return {
      cartContent: {
        paddingBottom: 0,
        paddingTop: 0,
      },

      notice: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
      },

      quantityField: {
        minWidth: '80px',
      },
      quantityInnerInput: {
        ...inputPadding,
      },
      quantityInnerInputNoRemaining: {
        paddingRight: 0,
      },
      remainingQuantity: {
        ...inputPadding,
        color: theme.vars.palette.text.secondary,
        whiteSpace: 'nowrap',
      },
      setMaximalQuantityButton: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
        padding: 0,
      },
    };
  },
  { name: 'ItemsCard' }
);

const messages = {
  improperValue: {
    id: 'xoyCZ/',
    defaultMessage: 'Improper value',
    description: 'error message',
  },

  titleFulfilled: {
    id: 'NxRsHQ',
    defaultMessage: 'Fulfillment - #{fulfilmentId}',
    description: 'section header',
  },
  titleUnfulfilled: {
    id: 'BkFke9',
    defaultMessage: 'Unfulfilled Items',
    description: 'section header',
  },
};

interface OrderReturnRefundLinesCardProps {
  onChangeQuantity: FormsetChange<number>;
  fulfilmentId?: string;
  canReplace?: boolean;
  errors: OrderErrorFragment[];
  lines: OrderLineFragment[];
  order: Maybe<OrderDetailsFragment>;
  itemsSelections: FormsetReplacementData;
  itemsQuantities: FormsetQuantityData;
  onChangeSelected: FormsetChange<boolean>;
  onSetMaxQuantity();
}

const ItemsCard: FC<OrderReturnRefundLinesCardProps> = ({
  lines,
  onSetMaxQuantity,
  onChangeQuantity,
  onChangeSelected,
  itemsSelections,
  itemsQuantities,
  fulfilmentId,
  order,
}) => {
  // const styles = useStyles();
  const styles = {};

  const handleChangeQuantity = (id: string) => (event: ChangeEvent<HTMLInputElement>) =>
    onChangeQuantity(id, parseInt(event.target.value, 10));

  const fulfillment = order?.fulfillments.find(getById(fulfilmentId));

  return (
    <Card>
      <OrderCardTitle
        orderNumber={order?.number}
        lines={lines}
        fulfillmentOrder={fulfillment?.fulfillmentOrder}
        status={fulfillment?.status}
      />
      <CardContent className={styles.cartContent ?? ''}>
        <MaximalButton onClick={onSetMaxQuantity} />
      </CardContent>
      <CardContent>
        <ResponsiveTable>
          <TableHead>
            <TableRow>
              <TableCell>
                <>
                  {/* table column header */}

                  {m.dashboard_AAxKp() ?? 'Product'}
                </>
              </TableCell>
              <TableCell />
              <TableCell align="right">
                <>
                  {/* table column header */}

                  {m.dashboard____ST() ?? 'Price'}
                </>
              </TableCell>
              <TableCell align="right">
                <>
                  {/* table column header */}

                  {m.dashboard_qg__z() ?? 'Return'}
                </>
              </TableCell>
              <TableCell align="center">
                <>
                  {/* table column header */}

                  {m.dashboard_kM__B() ?? 'Replace'}
                </>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(
              lines,
              (line) => {
                const {
                  quantity,
                  quantityToFulfill,
                  id,
                  thumbnail,
                  unitPrice,
                  productName,
                  variant,
                } = line;
                // const styles = useStyles();
                const styles = {};
                const isValueError = false;
                const { isRefunded, currentQuantity } = getQuantityDataFromItems(
                  itemsQuantities,
                  id
                );
                const { isSelected } = getReplacementDataFromItems(itemsSelections, id);
                const isReplacable = !!variant && !isRefunded;
                const isReturnable = !!variant;
                const isPreorder = !!variant?.preorder;
                const lineQuantity = fulfilmentId ? quantity : quantityToFulfill;
                const anyLineWithoutVariant = lines.some(({ variant }) => !variant);
                const productNameCellWidth = anyLineWithoutVariant ? '30%' : '50%';

                return (
                  <TableRow key={id}>
                    <TableCellAvatar
                      thumbnail={thumbnail?.url}
                      style={{ width: productNameCellWidth }}
                    >
                      {productName || <Skeleton />}
                    </TableCellAvatar>
                    <ProductErrorCell hasVariant={isReturnable} />
                    <TableCell align="right">
                      <Money
                        money={{
                          amount: unitPrice.gross.amount,
                          currency: unitPrice.gross.currency,
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      {isReturnable && (
                        <TextField
                          className={styles.quantityField ?? ''}
                          type="number"
                          inputProps={{
                            className: styles.quantityInnerInput ?? '',
                            'data-test': 'quantityInput',
                            'data-test-id': id,
                            max: lineQuantity.toString(),
                            min: 0,
                            style: { textAlign: 'right' },
                          }}
                          fullWidth
                          value={currentQuantity}
                          onChange={handleChangeQuantity(id)}
                          InputProps={{
                            endAdornment: lineQuantity && (
                              <div className={styles.remainingQuantity ?? ''}>
                                / {lineQuantity}
                              </div>
                            ),
                          }}
                          error={isValueError}
                          helperText={
                            isValueError && (m.dashboard_mproperValue() ?? 'Improper value')
                          }
                        />
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {isReplacable && !isPreorder && (
                        <Checkbox
                          checked={isSelected}
                          onChange={() => onChangeSelected(id, !isSelected)}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                );
              },
              () => (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Skeleton />
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </ResponsiveTable>
      </CardContent>
    </Card>
  );
};

export default ItemsCard;
