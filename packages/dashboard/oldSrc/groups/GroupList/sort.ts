import { GroupOrdering } from '@core/api/constants';
import { GroupListUrlOrdering } from '@dashboard/oldSrc/groups/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: GroupListUrlOrdering): GroupOrdering {
  switch (sort) {
    case GroupListUrlOrdering.name:
      return GroupOrdering.Name;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
