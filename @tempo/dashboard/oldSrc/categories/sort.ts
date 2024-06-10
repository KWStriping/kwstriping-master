import { CategoryOrdering } from '@tempo/api/generated/constants';
import { CategoryListUrlOrdering } from '@tempo/dashboard/oldSrc/categories/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

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
