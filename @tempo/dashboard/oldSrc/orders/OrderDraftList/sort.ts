import { OrderOrdering } from '@tempo/api/generated/constants';
import { OrderDraftListUrlOrdering } from '@tempo/dashboard/oldSrc/orders/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: OrderDraftListUrlOrdering): OrderOrdering {
  switch (sort) {
    case OrderDraftListUrlOrdering.number:
      return OrderOrdering.Number;
    case OrderDraftListUrlOrdering.date:
      return OrderOrdering.CreationDate;
    case OrderDraftListUrlOrdering.customer:
      return OrderOrdering.Customer;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
