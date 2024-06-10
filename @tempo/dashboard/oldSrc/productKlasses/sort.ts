import { ProductKlassOrdering } from '@tempo/api/generated/constants';
import { ProductKlassListUrlOrdering } from '@tempo/dashboard/oldSrc/productKlasses/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

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
