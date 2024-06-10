import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import { renderCollection } from '@tempo/ui/utils';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Money from '@tempo/dashboard/components/core/Money';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import type { OrderRefundDataQuery } from '@tempo/api/generated/graphql';
import type { FormsetChange } from '@tempo/dashboard/hooks/useFormset';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import type { OrderRefundFormData } from '../OrderRefundPage/form';

const useStyles = makeStyles(
  (theme) => {
    const inputPadding = {
      paddingBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    };

    return {
      cartContent: {
        paddingBottom: 0,
        paddingTop: 0,
      },
      colQuantity: {
        textAlign: 'right',
        width: 210,
      },
      notice: {
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2),
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
        marginTop: theme.spacing(1),
      },
    };
  },
  { name: 'OrderRefundUnfulfilledProducts' }
);

interface OrderRefundUnfulfilledProductsProps {
  unfulfilledLines: OrderRefundDataQuery['order']['lines'];
  data: OrderRefundFormData;
  disabled: boolean;
  onRefundedProductQuantityChange: FormsetChange<string>;
  onSetMaximalQuantities: () => void;
}

const OrderRefundUnfulfilledProducts: FC<OrderRefundUnfulfilledProductsProps> = (props) => {
  const {
    unfulfilledLines,
    data,
    disabled,
    onRefundedProductQuantityChange,
    onSetMaximalQuantities,
  } = props;
  // const styles = useStyles();
  const styles = {};

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard_/y6LC',
          'Unfulfilled Products'
          // section header
        )}
      />
      <CardContent className={styles.cartContent ?? ''}>
        <Typography variant="caption" color="textSecondary" className={styles.notice ?? ''}>
          <>
            {/* section notice */}

            {m.dashboard_UIn__() ?? 'Unfulfilled products will be restocked'}
          </>
        </Typography>
        <Button
          className={styles.setMaximalQuantityButton ?? ''}
          onClick={onSetMaximalQuantities}
          data-test-id="set-maximal-quantity-unfulfilled-button"
        >
          <>
            {/* button */}

            {m.dashboard_W_EBM() ?? 'Set maximal quantities'}
          </>
        </Button>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <>
                {/* table column header */}

                {m.dashboard_AAxKp() ?? 'Product'}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* table column header */}

                {m.dashboard____ST() ?? 'Price'}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* table column header */}

                {m.dashboard_UgqIO() ?? 'Refunded Qty'}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* table column header */}

                {m.dashboard_kKTSL() ?? 'Total'}
              </>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            unfulfilledLines,
            (line) => {
              const selectedLineQuantity = data?.refundedProductQuantities?.find(
                (refundedLine) => refundedLine.id === line.id
              );
              const lineQuantity = line?.quantityToFulfill;
              const isError =
                Number(selectedLineQuantity?.value) > lineQuantity ||
                Number(selectedLineQuantity?.value) < 0;

              return (
                <TableRow key={line?.id}>
                  <TableCellAvatar thumbnail={line?.thumbnail?.url}>
                    {line?.productName ? line?.productName : <Skeleton />}
                  </TableCellAvatar>
                  <TableCell>
                    {line?.unitPrice ? <Money money={line?.unitPrice.gross} /> : <Skeleton />}
                  </TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    {lineQuantity || lineQuantity === 0 ? (
                      <TextField
                        disabled={disabled}
                        type="number"
                        inputProps={{
                          className: styles.quantityInnerInput ?? '',
                          'data-test-id': 'quantity-input' + line?.id,
                          max: lineQuantity.toString(),
                          min: 0,
                          style: { textAlign: 'right' },
                        }}
                        fullWidth
                        value={selectedLineQuantity?.value}
                        onChange={(event) =>
                          onRefundedProductQuantityChange(line.id, event.target.value)
                        }
                        InputProps={{
                          endAdornment: lineQuantity && (
                            <div className={styles.remainingQuantity ?? ''}>/ {lineQuantity}</div>
                          ),
                        }}
                        error={isError}
                        helperText={
                          isError &&
                          t(
                            'dashboard_oyCZ/',
                            'Improper value'
                            // error message
                          )
                        }
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell>
                    {(line?.unitPrice.gross && (
                      <Money
                        money={{
                          ...line.unitPrice.gross,
                          amount:
                            (line.unitPrice.gross.amount ?? 0) *
                            Number(selectedLineQuantity?.value),
                        }}
                      />
                    )) || <Skeleton />}
                  </TableCell>
                </TableRow>
              );
            },
            () => (
              <TableRow>
                <TableCell colSpan={4}>{m.dashboard__Uzbb() ?? 'No products found'}</TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
};
OrderRefundUnfulfilledProducts.displayName = 'OrderRefundUnfulfilledProducts';
export default OrderRefundUnfulfilledProducts;
