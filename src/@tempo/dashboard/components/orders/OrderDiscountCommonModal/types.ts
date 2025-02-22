import type { DiscountValueType } from '@tempo/api/generated/constants';

export const ORDER_DISCOUNT = 'add-order-discount';
export const ORDER_LINE_DISCOUNT = 'add-order-line-discount';

export type OrderDiscountType = typeof ORDER_DISCOUNT | typeof ORDER_LINE_DISCOUNT;

export interface OrderDiscountCommonInput {
  value: number;
  reason: string;
  calculationMode: DiscountValueType;
}
