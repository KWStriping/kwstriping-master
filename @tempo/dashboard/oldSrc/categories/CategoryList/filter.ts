import type { CategoryFilter } from '@tempo/api/generated/graphql';
import type {
  CategoryListUrlFilters,
  CategoryListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/categories/urls';
import { CategoryListUrlFiltersEnum } from '@tempo/dashboard/oldSrc/categories/urls';

import { createFilterTabUtils, createFilterUtils } from '@tempo/dashboard/oldSrc/utils/filters';

export const CATEGORY_FILTERS_KEY = 'categoryFilters';

export function getFilterVariables(params: CategoryListUrlFilters): CategoryFilter {
  return {
    search: params.query,
  };
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<CategoryListUrlFilters>(CATEGORY_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  CategoryListUrlQueryParams,
  CategoryListUrlFilters
>(CategoryListUrlFiltersEnum);
