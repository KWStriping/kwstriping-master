import type { OrderDiscountCommonInput } from '@dashboard/components/orders/OrderDiscountCommonModal/types';
import { OrderDiscountType } from '@core/api/constants';
import type { OrderDetailsQuery } from '@core/api/graphql';
import { useState } from 'react';

import type { OrderLineDiscountData } from './types';

export const useDiscountDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const closeDialog = () => setIsDialogOpen(false);
  const openDialog = () => setIsDialogOpen(true);

  return { closeDialog, isDialogOpen, openDialog };
};
export const getManualOrderDiscount = (order: OrderDetailsQuery['order']) =>
  order ? getOrderDiscount(order, OrderDiscountType.Manual) : null;

export const getOrderDiscount = (
  order: OrderDetailsQuery['order'],
  discountType: OrderDiscountType
): OrderDetailsQuery['order']['discounts'][0] =>
  order.discounts.find(({ type }) => type === discountType);

export const getOrderLineDiscount = (
  order: OrderDetailsQuery['order'],
  orderLineId: string
): OrderLineDiscountData => {
  const {
    unitDiscount: moneyValue,
    unitDiscountReason: reason,
    unitDiscountValue: value,
    undiscountedUnitPrice: undiscountedPrice,
    unitDiscountType: calculationMode,
  } = order.lines.find(({ id }: OrderDetailsQuery['order']['lines'][0]) => id === orderLineId);

  if (!value) return null;

  return {
    calculationMode,
    moneyValue,
    reason,
    undiscountedPrice,
    value,
  };
};

export const getParsedDiscountData = ({
  value,
  calculationMode,
  reason,
}: OrderDiscountCommonInput) => ({ reason, value, valueType: calculationMode });
