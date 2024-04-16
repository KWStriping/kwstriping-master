import { PageKlassOrdering } from '@core/api/constants';
import { PageKlassListUrlOrdering } from '@dashboard/oldSrc/pageKlasses/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: PageKlassListUrlOrdering): PageKlassOrdering {
  switch (sort) {
    case PageKlassListUrlOrdering.name:
      return PageKlassOrdering.Name;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
