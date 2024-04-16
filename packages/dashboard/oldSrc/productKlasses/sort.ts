import { ProductKlassOrdering } from '@core/api/constants';
import { ProductKlassListUrlOrdering } from '@dashboard/oldSrc/productKlasses/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: ProductKlassListUrlOrdering): ProductKlassOrdering {
  switch (sort) {
    case ProductKlassListUrlOrdering.name:
      return ProductKlassOrdering.Name;
    case ProductKlassListUrlOrdering.digital:
      return ProductKlassOrdering.Digital;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
