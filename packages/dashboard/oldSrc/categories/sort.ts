import { CategoryOrdering } from '@core/api/constants';
import { CategoryListUrlOrdering } from '@dashboard/oldSrc/categories/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: CategoryListUrlOrdering): CategoryOrdering {
  switch (sort) {
    case CategoryListUrlOrdering.name:
      return CategoryOrdering.Name;
    case CategoryListUrlOrdering.productCount:
      return CategoryOrdering.ProductCount;
    case CategoryListUrlOrdering.subcategoryCount:
      return CategoryOrdering.SubcategoryCount;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
