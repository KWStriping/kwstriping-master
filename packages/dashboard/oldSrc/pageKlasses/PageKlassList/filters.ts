import type { PageKlassFilter } from '@core/api/graphql';

import type {
  PageKlassListUrlFilters,
  PageKlassListUrlQueryParams,
} from '@dashboard/oldSrc/pageKlasses/urls';
import { PageKlassListUrlFiltersEnum } from '@dashboard/oldSrc/pageKlasses/urls';
import { createFilterTabUtils, createFilterUtils } from '@dashboard/oldSrc/utils/filters';

export const PAGE_TYPE_FILTERS_KEY = 'pageKlassFilters';

export function getFilterVariables(params: PageKlassListUrlFilters): PageKlassFilter {
  return {
    search: params.query,
  };
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<PageKlassListUrlFilters>(PAGE_TYPE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  PageKlassListUrlQueryParams,
  PageKlassListUrlFilters
>(PageKlassListUrlFiltersEnum);
