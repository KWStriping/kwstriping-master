import type { CategoryFilter } from '@core/api/graphql';
import type {
  CategoryListUrlFilters,
  CategoryListUrlQueryParams,
} from '@dashboard/oldSrc/categories/urls';
import { CategoryListUrlFiltersEnum } from '@dashboard/oldSrc/categories/urls';

import { createFilterTabUtils, createFilterUtils } from '@dashboard/oldSrc/utils/filters';

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
