import { GroupOrdering } from '@tempo/api/generated/constants';
import { GroupListUrlOrdering } from '@tempo/dashboard/oldSrc/groups/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: GroupListUrlOrdering): GroupOrdering {
  switch (sort) {
    case GroupListUrlOrdering.name:
      return GroupOrdering.Name;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
