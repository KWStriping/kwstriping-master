import { PageKlassOrdering } from '@tempo/api/generated/constants';
import { PageKlassListUrlOrdering } from '@tempo/dashboard/oldSrc/pageKlasses/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: PageKlassListUrlOrdering): PageKlassOrdering {
  switch (sort) {
    case PageKlassListUrlOrdering.name:
      return PageKlassOrdering.Name;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
