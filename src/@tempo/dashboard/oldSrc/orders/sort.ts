import { OrderOrdering } from '@tempo/api/generated/constants';
import { OrderListUrlOrdering } from '@tempo/dashboard/oldSrc/orders/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export const DEFAULT_SORT_KEY = OrderListUrlOrdering.number;

export function getSortQueryField(sort: OrderListUrlOrdering): OrderOrdering {
  switch (sort) {
    case OrderListUrlOrdering.number:
      return OrderOrdering.Number;
    case OrderListUrlOrdering.date:
      return OrderOrdering.CreationDate;
    case OrderListUrlOrdering.customer:
      return OrderOrdering.Customer;
    case OrderListUrlOrdering.fulfillment:
      return OrderOrdering.FulfillmentStatus;
    case OrderListUrlOrdering.payment:
      return OrderOrdering.Payment;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
