import type { ReactNode } from 'react';
import type { MoneyFragment, TaxedMoneyFragment } from '@tempo/api/generated/graphql';

import type { OrderLineDiscountContextConsumerProps } from './OrderLineDiscountProvider';
import type { OrderDiscountCommonInput } from '@tempo/dashboard/components/orders/OrderDiscountCommonModal/types';

export interface OrderDiscountData extends OrderDiscountCommonInput {
  amount: Maybe<MoneyFragment>;
}

export type GetOrderLineDiscountContextConsumerProps = (
  orderLineId: string
) => OrderLineDiscountContextConsumerProps;

export interface OrderLineDiscountData extends OrderDiscountCommonInput {
  moneyValue: Maybe<MoneyFragment>;
  undiscountedPrice: Maybe<TaxedMoneyFragment>;
}

export interface OrderDiscountConsumerCommonProps {
  openDialog: () => void;
  closeDialog: () => void;
  isDialogOpen: boolean;
  undiscountedPrice: Maybe<MoneyFragment>;
  discountedPrice: Maybe<MoneyFragment>;
}

export interface OrderLineDiscountConsumerProps {
  children: (values: OrderLineDiscountContextConsumerProps) => ReactNode;
  orderLineId: string;
}
