import type { AttributeListFilterOpts } from '@tempo/dashboard/components/attributes/AttributeListPage';
import { AttributeFilterKeys } from '@tempo/dashboard/components/attributes/AttributeListPage';
import type { FilterElement } from '@tempo/dashboard/components/core/Filter';
import type { AttributeFilter } from '@tempo/api/generated/graphql';
import type {
  AttributeListUrlFilters,
  AttributeListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/attributes/urls';
import { AttributeListUrlFiltersEnum } from '@tempo/dashboard/oldSrc/attributes/urls';

import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam,
} from '@tempo/dashboard/oldSrc/utils/filters';

export const ATTRIBUTE_FILTERS_KEY = 'attributeFilters';

export function getFilterOpts(params: AttributeListUrlFilters): AttributeListFilterOpts {
  return {
    filterableInStorefront: {
      active: params.filterableInStorefront !== undefined,
      value: params.filterableInStorefront ?? true,
    },
    isVariantOnly: {
      active: params.isVariantOnly !== undefined,
      value: params.isVariantOnly ?? true,
    },
    valueRequired: {
      active: params.valueRequired !== undefined,
      value: params.valueRequired ?? true,
    },
    visibleInStorefront: {
      active: params.visibleInStorefront !== undefined,
      value: params.visibleInStorefront ?? true,
    },
  };
}

export function getFilterVariables(params: AttributeListUrlFilters): AttributeFilter {
  return {
    filterableInStorefront:
      params.filterableInStorefront !== undefined ? !!params.filterableInStorefront : undefined,
    isVariantOnly: params.isVariantOnly !== undefined ? !!params.isVariantOnly : undefined,
    search: params.query,
    valueRequired: params.valueRequired !== undefined ? !!params.valueRequired : undefined,
    visibleInStorefront:
      params.visibleInStorefront !== undefined ? !!params.visibleInStorefront : undefined,
  };
}

export function getFilterQueryParam(
  filter: FilterElement<AttributeFilterKeys>
): AttributeListUrlFilters {
  const { name } = filter;

  switch (name) {
    case AttributeFilterKeys.filterableInStorefront:
      return getSingleValueQueryParam(filter, AttributeListUrlFiltersEnum.filterableInStorefront);

    case AttributeFilterKeys.isVariantOnly:
      return getSingleValueQueryParam(filter, AttributeListUrlFiltersEnum.isVariantOnly);

    case AttributeFilterKeys.valueRequired:
      return getSingleValueQueryParam(filter, AttributeListUrlFiltersEnum.valueRequired);

    case AttributeFilterKeys.visibleInStorefront:
      return getSingleValueQueryParam(filter, AttributeListUrlFiltersEnum.visibleInStorefront);
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<AttributeListUrlFilters>(ATTRIBUTE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  AttributeListUrlQueryParams,
  AttributeListUrlFilters
>(AttributeListUrlFiltersEnum);
