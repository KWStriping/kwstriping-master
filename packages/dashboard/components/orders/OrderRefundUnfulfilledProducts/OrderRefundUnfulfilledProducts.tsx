import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
import { renderCollection } from '@core/ui/utils';
import CardTitle from '@dashboard/components/core/CardTitle';
import Money from '@dashboard/components/core/Money';
import TableCellAvatar from '@dashboard/components/tables/TableCellAvatar';
import type { OrderRefundDataQuery } from '@core/api/graphql';
import type { FormsetChange } from '@dashboard/hooks/useFormset';
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
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard./y6LC',
          'Unfulfilled Products'
          // section header
        )}
      />
      <CardContent className={styles.cartContent ?? ''}>
        <Typography variant="caption" color="textSecondary" className={styles.notice ?? ''}>
          <>
            {/* section notice */}

            {t('dashboard.UIn50', 'Unfulfilled products will be restocked')}
          </>
        </Typography>
        <Button
          className={styles.setMaximalQuantityButton ?? ''}
          onClick={onSetMaximalQuantities}
          data-test-id="set-maximal-quantity-unfulfilled-button"
        >
          <>
            {/* button */}

            {t('dashboard.W4EBM', 'Set maximal quantities')}
          </>
        </Button>
      </CardContent>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <>
                {/* table column header */}

                {t('dashboard.AAxKp', 'Product')}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* table column header */}

                {t('dashboard.299ST', 'Price')}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* table column header */}

                {t('dashboard.UgqIO', 'Refunded Qty')}
              </>
            </TableCell>
            <TableCell>
              <>
                {/* table column header */}

                {t('dashboard.kKTSL', 'Total')}
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
                            'dashboard.oyCZ/',
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
                <TableCell colSpan={4}>{t('dashboard.1Uzbb', 'No products found')}</TableCell>
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
