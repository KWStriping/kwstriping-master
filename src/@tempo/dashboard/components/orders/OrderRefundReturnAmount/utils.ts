import type { OrderDetailsFragment, OrderRefundDataQuery } from '@tempo/api/generated/graphql';

import type { OrderRefundFormData } from '../OrderRefundPage/form';
import type { LineItemData, OrderReturnFormData } from '../OrderReturnPage/form';
import type { OrderRefundAmountValuesProps } from './OrderRefundReturnAmountValues';
import {
  getAllFulfillmentLinesPriceSum,
  getPreviouslyRefundedPrice,
  getRefundedLinesPriceSum,
  getReplacedProductsAmount,
  getReturnSelectedProductsAmount,
} from '@tempo/dashboard/oldSrc/orders/utils/data';
import type { FormsetData } from '@tempo/dashboard/hooks/useFormset';
import type { IMoney } from '@tempo/dashboard/components/core/Money';

export const getMiscellaneousAmountValues = (
  order: OrderRefundDataQuery['order']
): OrderRefundAmountValuesProps => {
  const amountAuthorized = order?.total?.gross;
  const previouslyRefunded = getPreviouslyRefundedPrice(order);
  const maxRefund = order?.totalCaptured;

  return {
    amountAuthorized,
    maxRefund,
    previouslyRefunded,
  };
};

const getAuthorizedAmount = (order: OrderRefundDataQuery['order']) => order?.total?.gross;

const getShipmentCost = (order: OrderRefundDataQuery['order']) =>
  getAuthorizedAmount(order)?.currency &&
  (order?.shippingPrice?.gross || {
    amount: 0,
    currency: getAuthorizedAmount(order)?.currency,
  });

const getMaxRefund = (order: OrderRefundDataQuery['order']) => order?.totalCaptured;

export const getProductsAmountValues = ({
  order,
  fulfilledItemsQuantities,
  waitingItemsQuantities,
  unfulfilledItemsQuantities,
  refundShipmentCosts,
}: {
  order: OrderRefundDataQuery['order'];
  fulfilledItemsQuantities: FormsetData<null | LineItemData, string | number>;
  waitingItemsQuantities: FormsetData<null | LineItemData, string | number>;
  unfulfilledItemsQuantities: FormsetData<null | LineItemData, string | number>;
  refundShipmentCosts: unknown;
}): OrderRefundAmountValuesProps => {
  const amountAuthorized = getAuthorizedAmount(order);
  const shipmentCost = getShipmentCost(order);

  const previouslyRefunded = getPreviouslyRefundedPrice(order);
  const maxRefund = getMaxRefund(order);
  const refundedLinesSum = getRefundedLinesPriceSum(
    order?.lines,
    unfulfilledItemsQuantities as FormsetData<null, string>
  );
  const waitingLinesSum = getAllFulfillmentLinesPriceSum(
    order?.fulfillments,
    waitingItemsQuantities as FormsetData<null, string>
  );
  const allFulfillmentLinesSum = getAllFulfillmentLinesPriceSum(
    order?.fulfillments,
    fulfilledItemsQuantities as FormsetData<null, string>
  );
  const allLinesSum = refundedLinesSum + allFulfillmentLinesSum + waitingLinesSum;
  const calculatedTotalAmount = getCalculatedTotalAmount({
    allLinesSum,
    maxRefund,
    previouslyRefunded,
    shipmentCost,
    shipmentCosts: refundShipmentCosts,
  });

  const selectedProductsValue = amountAuthorized?.currency && {
    amount: allLinesSum,
    currency: amountAuthorized.currency,
  };

  const proposedRefundAmount = amountAuthorized?.currency && {
    amount: calculatedTotalAmount,
    currency: amountAuthorized.currency,
  };
  const refundTotalAmount = amountAuthorized?.currency && {
    amount: calculatedTotalAmount,
    currency: amountAuthorized.currency,
  };

  return {
    amountAuthorized,
    maxRefund,
    previouslyRefunded,
    proposedRefundAmount,
    refundTotalAmount,
    selectedProductsValue,
    shipmentCost,
  };
};

const getCalculatedTotalAmount = ({
  shipmentCost,
  shipmentCosts,
  allLinesSum,
  maxRefund,
}: {
  shipmentCost: IMoney;
  shipmentCosts: IMoney;
  allLinesSum: number;
  previouslyRefunded: IMoney;
  maxRefund: IMoney;
}) => {
  if (maxRefund?.amount === 0) {
    return 0;
  }

  const shipmentCostValue = shipmentCost ? shipmentCost.amount : 0;

  return shipmentCosts ? allLinesSum + shipmentCostValue : allLinesSum;
};

const getReturnTotalAmount = ({
  selectedProductsValue,
  refundShipmentCosts,
  order,
  maxRefund,
}: {
  order: Maybe<OrderDetailsFragment>;
  selectedProductsValue: IMoney;
  refundShipmentCosts: boolean;
  maxRefund: IMoney;
}) => {
  if (maxRefund?.amount === 0) {
    return 0;
  }

  if (refundShipmentCosts) {
    const totalValue = selectedProductsValue?.amount + getShipmentCost(order)?.amount;
    return totalValue || 0;
  }

  return selectedProductsValue?.amount || 0;
};

export const getReturnProductsAmountValues = (
  order: OrderDetailsFragment,
  formData: OrderReturnFormData
) => {
  const amountAuthorized = getAuthorizedAmount(order);

  const {
    fulfilledItemsQuantities,
    waitingItemsQuantities,
    unfulfilledItemsQuantities,
    refundShipmentCosts,
  } = formData;

  const replacedProductsValue = amountAuthorized?.currency && {
    amount: getReplacedProductsAmount(order, formData),
    currency: amountAuthorized.currency,
  };

  const selectedProductsValue = amountAuthorized?.currency && {
    amount: getReturnSelectedProductsAmount(order, formData),
    currency: amountAuthorized.currency,
  };

  const refundTotalAmount = amountAuthorized?.currency && {
    amount: getReturnTotalAmount({
      maxRefund: getMaxRefund(order),
      order,
      refundShipmentCosts,
      selectedProductsValue,
    }),
    currency: amountAuthorized.currency,
  };

  return {
    ...getProductsAmountValues({
      order,
      fulfilledItemsQuantities,
      waitingItemsQuantities,
      unfulfilledItemsQuantities,
      refundShipmentCosts,
    }),
    refundTotalAmount,
    replacedProductsValue,
    selectedProductsValue,
  };
};

export const getRefundProductsAmountValues = (
  order: OrderRefundDataQuery['order'],
  {
    refundedFulfilledProductQuantities,
    refundShipmentCosts,
    refundedProductQuantities,
  }: OrderRefundFormData
) =>
  getProductsAmountValues({
    order,
    fulfilledItemsQuantities: refundedFulfilledProductQuantities,
    waitingItemsQuantities: [],
    unfulfilledItemsQuantities: refundedProductQuantities,
    refundShipmentCosts,
  });
