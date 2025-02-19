import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import type {
  OrderDetailsFragment,
  OrderErrorFragment,
  OrderRefundDataQuery,
} from '@tempo/api/generated/graphql';
import { Card, CardContent, Divider, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

import type { OrderRefundFormData } from '../OrderRefundPage/form';
import { OrderRefundAmountCalculationMode, OrderRefundType } from '../OrderRefundPage/form';
import type { OrderReturnFormData } from '../OrderReturnPage/form';
import styles from './index.module.css';
import type { OrderRefundAmountValuesProps } from './OrderRefundReturnAmountValues';
import OrderRefundAmountValues from './OrderRefundReturnAmountValues';
import RefundAmountInput from './RefundAmountInput';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

const messages = {
  refundButton: {
    id: 'QkFeOa',
    defaultMessage: 'Refund',
    description: 'order refund amount button',
  },
  refundCannotBeFulfilled: {
    id: 'AKv2BI',
    defaultMessage: "Refunded items can't be fulfilled",
    description: 'order refund subtitle',
  },
  returnButton: {
    id: 'bgO+7G',
    defaultMessage: 'Return & Replace products',
    description: 'order return amount button',
  },
  returnCannotBeFulfilled: {
    id: 'Uo5/Ov',
    defaultMessage: "Returned items can't be fulfilled",
    description: 'order return subtitle',
  },
};

interface OrderRefundAmountProps {
  data: OrderRefundFormData | OrderReturnFormData;
  order: OrderRefundDataQuery['order'] | OrderDetailsFragment;
  disabled: boolean;
  disableSubmitButton?: boolean;
  isReturn?: boolean;
  errors: OrderErrorFragment[];
  amountData: OrderRefundAmountValuesProps;
  allowNoRefund?: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
  onRefund: () => void;
}

const OrderRefundAmount: FC<OrderRefundAmountProps> = (props) => {
  const {
    data,
    order,
    disabled,
    errors,
    onChange,
    onRefund,
    isReturn = false,
    amountData,
    disableSubmitButton,
    allowNoRefund = false,
  } = props;

  const { type = OrderRefundType.ProductS } = data as OrderRefundFormData;

  const amountCurrency = order?.total?.gross?.currency;

  const {
    amountAuthorized,
    maxRefund,
    previouslyRefunded,
    proposedRefundAmount,
    refundTotalAmount,
    selectedProductsValue,
    shipmentCost,
    replacedProductsValue,
  } = amountData;

  const isRefundAutomatic =
    type === OrderRefundType.ProductS &&
    data?.amountCalculationMode === OrderRefundAmountCalculationMode.Automatic;

  const selectedRefundAmount = isRefundAutomatic ? refundTotalAmount?.amount : data?.amount;

  const isAmountTooSmall = selectedRefundAmount && selectedRefundAmount <= 0;
  const isAmountTooBig = selectedRefundAmount > maxRefund?.amount;

  const parsedRefundTotalAmount = isAmountTooBig ? maxRefund : refundTotalAmount;

  const shouldRefundButtonBeDisabled = () => {
    if (isAmountTooSmall) {
      return true;
    }

    if (
      data?.amountCalculationMode === OrderRefundAmountCalculationMode.Manual ||
      type === OrderRefundType.Miscellaneous
    ) {
      if (isAmountTooBig) {
        return true;
      }
    }

    if (isReturn) {
      return disableSubmitButton;
    }
    return !selectedRefundAmount;
  };

  const disableRefundButton = shouldRefundButtonBeDisabled();

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard_oo+BT',
          'Refunded Amount'
          // section header
        )}
      />
      <CardContent className={styles.content ?? ''}>
        {type === OrderRefundType.ProductS && (
          <RadioGroup
            value={data?.amountCalculationMode}
            onChange={onChange}
            name="amountCalculationMode"
          >
            {allowNoRefund && (
              <FormControlLabel
                disabled={disabled}
                value={OrderRefundAmountCalculationMode.None}
                control={<Radio color="primary" />}
                label={
                  m.dashboard_zfj_H() ?? 'No refund'
                  // label
                }
              />
            )}
            <FormControlLabel
              disabled={disabled}
              value={OrderRefundAmountCalculationMode.Automatic}
              control={<Radio color="primary" />}
              label={
                m.dashboard_EIN__() ?? 'Automatic Amount'
                // label
              }
            />
            {data?.amountCalculationMode === OrderRefundAmountCalculationMode.None && (
              <>
                <CardSpacer />
                <OrderRefundAmountValues
                  amountAuthorized={amountAuthorized}
                  previouslyRefunded={previouslyRefunded}
                  maxRefund={maxRefund}
                  shipmentCost={data?.refundShipmentCosts && shipmentCost}
                />
              </>
            )}
            {data?.amountCalculationMode === OrderRefundAmountCalculationMode.Automatic && (
              <>
                <ControlledCheckbox
                  checked={data?.refundShipmentCosts}
                  label={t(
                    'dashboard_P+jcU',
                    'Refund shipment costs'
                    // checkbox
                  )}
                  name="refundShipmentCosts"
                  onChange={onChange}
                />
                <CardSpacer />
                <OrderRefundAmountValues
                  amountAuthorized={amountAuthorized}
                  previouslyRefunded={previouslyRefunded}
                  maxRefund={maxRefund}
                  selectedProductsValue={selectedProductsValue}
                  refundTotalAmount={parsedRefundTotalAmount}
                  shipmentCost={data?.refundShipmentCosts && shipmentCost}
                  replacedProductsValue={replacedProductsValue}
                />
              </>
            )}
            <Divider />
            <FormControlLabel
              disabled={disabled}
              value={OrderRefundAmountCalculationMode.Manual}
              control={<Radio color="primary" />}
              label={t(
                'dashboard_OehC/',
                'Manual Amount'
                // label
              )}
            />
            {data?.amountCalculationMode === OrderRefundAmountCalculationMode.Manual && (
              <>
                <ControlledCheckbox
                  disabled={disabled}
                  checked={data?.refundShipmentCosts}
                  label={t(
                    'dashboard_P+jcU',
                    'Refund shipment costs'
                    // checkbox
                  )}
                  name="refundShipmentCosts"
                  onChange={onChange}
                />
                <OrderRefundAmountValues
                  amountAuthorized={amountAuthorized}
                  previouslyRefunded={previouslyRefunded}
                  maxRefund={maxRefund}
                  selectedProductsValue={selectedProductsValue}
                  proposedRefundAmount={proposedRefundAmount}
                  shipmentCost={data?.refundShipmentCosts && shipmentCost}
                  replacedProductsValue={replacedProductsValue}
                />
                <RefundAmountInput
                  data={data as OrderRefundFormData}
                  maxRefund={maxRefund}
                  amountTooSmall={isAmountTooSmall}
                  amountTooBig={isAmountTooBig}
                  currencySymbol={amountCurrency}
                  disabled={disabled}
                  onChange={onChange}
                  errors={errors}
                />
              </>
            )}
          </RadioGroup>
        )}
        {type === OrderRefundType.Miscellaneous && (
          <>
            <OrderRefundAmountValues
              amountAuthorized={amountAuthorized}
              previouslyRefunded={previouslyRefunded}
              maxRefund={maxRefund}
            />
            <RefundAmountInput
              data={data as OrderRefundFormData}
              maxRefund={maxRefund}
              amountTooSmall={isAmountTooSmall}
              amountTooBig={isAmountTooBig}
              currencySymbol={amountCurrency}
              disabled={disabled}
              onChange={onChange}
              errors={errors}
            />
          </>
        )}
        <Button
          color="primary"
          fullWidth
          onClick={onRefund}
          className={styles.refundButton ?? ''}
          disabled={disableRefundButton}
          data-test-id="submit"
        >
          {!disableRefundButton && !isReturn ? (
            <>
              {
                (m.dashboard_F_D_H() ?? 'Refund {currency} {amount}',
                // "order refund amount, input button"
                {
                  amount: isRefundAutomatic
                    ? parsedRefundTotalAmount.amount.toFixed(2)
                    : Number(selectedRefundAmount).toFixed(2),
                  currency: amountCurrency,
                })
              }
            </>
          ) : (
            t(
              'dashboard_refundButton',
              isReturn ? messages.returnButton : messages.refundButton.defaultMessage
            )
          )}
        </Button>
        <Typography
          variant="caption"
          color="textSecondary"
          className={styles.refundCaution ?? ''}
        >
          {m[isReturn ? messages.returnCannotBeFulfilled : messages.refundCannotBeFulfilled]}
        </Typography>
      </CardContent>
    </Card>
  );
};
OrderRefundAmount.displayName = 'OrderRefundAmount';
export default OrderRefundAmount;
