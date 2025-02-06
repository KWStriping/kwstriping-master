import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Money from '@tempo/dashboard/components/core/Money';
import TableCellAvatar from '@tempo/dashboard/components/tables/TableCellAvatar';
import type { OrderRefundDataQuery } from '@tempo/api/generated/graphql';
import type { FormsetChange } from '@tempo/dashboard/hooks/useFormset';
import { renderCollection } from '@tempo/ui/utils';
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
import { getTitle } from './messages';

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
      orderNumber: {
        display: 'inline',
        marginLeft: theme.spacing(1),
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
  { name: 'OrderRefundFulfilledProducts' }
);

interface OrderRefundFulfilledProductsProps {
  fulfillment: OrderRefundDataQuery['order']['fulfillments'][0];
  data: OrderRefundFormData;
  disabled: boolean;
  orderNumber: string;
  onRefundedProductQuantityChange: FormsetChange<string>;
  onSetMaximalQuantities: () => void;
}

const OrderRefundFulfilledProducts: FC<OrderRefundFulfilledProductsProps> = (props) => {
  const {
    fulfillment,
    data,
    disabled,
    orderNumber,
    onRefundedProductQuantityChange,
    onSetMaximalQuantities,
  } = props;
  const styles = {};

  return (
    <Card>
      <CardTitle
        title={
          <>
            {getTitle(fulfillment.status, t)}
            {fulfillment && (
              <Typography className={styles.orderNumber ?? ''} variant="body1">
                {`#${orderNumber}-${fulfillment?.fulfillmentOrder}`}
              </Typography>
            )}
          </>
        }
      />
      <CardContent className={styles.cartContent ?? ''}>
        <Button
          className={styles.setMaximalQuantityButton ?? ''}
          onClick={onSetMaximalQuantities}
          data-test-id={'set-maximal-quantity-fulfilled-button-' + fulfillment?.id}
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
            fulfillment?.lines,
            (line) => {
              const selectedLineQuantity = data?.refundedFulfilledProductQuantities?.find(
                (refundedLine) => refundedLine.id === line.id
              );
                          const styles = {};
              const isError =
                Number(selectedLineQuantity?.value) > line?.quantity ||
                Number(selectedLineQuantity?.value) < 0;

              return (
                <TableRow key={line?.id}>
                  <TableCellAvatar thumbnail={line?.orderLine?.thumbnail?.url}>
                    {line?.orderLine?.productName ? line?.orderLine?.productName : <Skeleton />}
                  </TableCellAvatar>
                  <TableCell>
                    {line?.orderLine?.unitPrice ? (
                      <Money money={line?.orderLine?.unitPrice.gross} />
                    ) : (
                      <Skeleton />
                    )}
                  </TableCell>
                  <TableCell className={styles.colQuantity ?? ''}>
                    {line?.quantity ? (
                      <TextField
                        disabled={disabled}
                        type="number"
                        inputProps={{
                          className: styles.quantityInnerInput ?? '',
                          'data-test-id': 'quantityInput' + line?.id,
                          max: (line?.quantity).toString(),
                          min: 0,
                          style: { textAlign: 'right' },
                        }}
                        fullWidth
                        value={selectedLineQuantity?.value}
                        onChange={(event) =>
                          onRefundedProductQuantityChange(line.id, event.target.value)
                        }
                        InputProps={{
                          endAdornment: line?.quantity && (
                            <div className={styles.remainingQuantity ?? ''}>
                              / {line?.quantity}
                            </div>
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
                    {(line?.quantity && line?.orderLine?.unitPrice.gross && (
                      <Money
                        money={{
                          ...line?.orderLine.unitPrice.gross,
                          amount:
                            (line?.orderLine.unitPrice.gross.amount || 0) *
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
OrderRefundFulfilledProducts.displayName = 'OrderRefundFulfilledProducts';
export default OrderRefundFulfilledProducts;
