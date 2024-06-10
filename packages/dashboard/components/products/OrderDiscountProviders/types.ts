import type { ReactNode } from 'react';
import type { OrderDiscountCommonInput } from '@dashboard/components/orders/OrderDiscountCommonModal/types';
import type { MoneyFragment, TaxedMoneyFragment } from '@core/api/graphql';

import type { OrderLineDiscountContextConsumerProps } from './OrderLineDiscountProvider';

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
