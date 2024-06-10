import { OrderOrdering } from '@core/api/constants';
import { OrderListUrlOrdering } from '@dashboard/oldSrc/orders/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

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
