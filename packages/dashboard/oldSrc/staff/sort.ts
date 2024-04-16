import { UserOrdering } from '@core/api/constants';
import { StaffListUrlOrdering } from '@dashboard/oldSrc/staff/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: StaffListUrlOrdering): UserOrdering {
  switch (sort) {
    case StaffListUrlOrdering.name:
      return UserOrdering.LastName;
    case StaffListUrlOrdering.email:
      return UserOrdering.Email;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
