import { MenuOrdering } from '@tempo/api/generated/constants';
import { MenuListUrlOrdering } from '@tempo/dashboard/oldSrc/navigation/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: MenuListUrlOrdering): MenuOrdering {
  switch (sort) {
    case MenuListUrlOrdering.name:
      return MenuOrdering.Name;
    case MenuListUrlOrdering.items:
      return MenuOrdering.ItemsCount;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
