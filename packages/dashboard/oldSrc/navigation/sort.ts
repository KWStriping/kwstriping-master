import { MenuOrdering } from '@core/api/constants';
import { MenuListUrlOrdering } from '@dashboard/oldSrc/navigation/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

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
