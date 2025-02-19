import { UserOrdering } from '@tempo/api/generated/constants';
import { CustomerListUrlOrdering } from '@tempo/dashboard/oldSrc/customers/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: CustomerListUrlOrdering): UserOrdering {
  switch (sort) {
    case CustomerListUrlOrdering.email:
      return UserOrdering.Email;
    case CustomerListUrlOrdering.name:
      return UserOrdering.LastName;
    case CustomerListUrlOrdering.orders:
      return UserOrdering.OrderCount;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
