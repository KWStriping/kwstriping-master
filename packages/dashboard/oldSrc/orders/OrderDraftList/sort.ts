import { OrderOrdering } from '@core/api/constants';
import { OrderDraftListUrlOrdering } from '@dashboard/oldSrc/orders/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

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
