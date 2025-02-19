import type { WarehouseFilter } from '@tempo/api/generated/graphql';

import { createFilterTabUtils, createFilterUtils } from '@tempo/dashboard/oldSrc/utils/filters';
import type {
  WarehouseListUrlFilters,
  WarehouseListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/warehouses/urls';
import { WarehouseListUrlFiltersEnum } from '@tempo/dashboard/oldSrc/warehouses/urls';

export const WAREHOUSE_FILTERS_KEY = 'warehouseFilters';

export function getFilterVariables(params: WarehouseListUrlFilters): WarehouseFilter {
  return {
    search: params.query,
  };
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<WarehouseListUrlFilters>(WAREHOUSE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  WarehouseListUrlQueryParams,
  WarehouseListUrlFilters
>(WarehouseListUrlFiltersEnum);
