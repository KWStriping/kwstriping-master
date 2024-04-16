import { findValueInEnum } from '@core/utils/enums';
import type { FilterElement } from '@dashboard/components/core/Filter';
import type { ProductKlassListFilterOpts } from '@dashboard/components/productKlasses/ProductKlassListPage';
import { ProductKlassFilterKeys } from '@dashboard/components/productKlasses/ProductKlassListPage';
import { ProductKlassConfigurable, ProductKlass } from '@core/api/constants';
import type { ProductKlassFilter } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';

import type {
  ProductKlassListUrlFilters,
  ProductKlassListUrlQueryParams,
} from '@dashboard/oldSrc/productKlasses/urls';
import { ProductKlassListUrlFiltersEnum } from '@dashboard/oldSrc/productKlasses/urls';
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';

export const PRODUCT_TYPE_FILTERS_KEY = 'productKlassFilters';

export function getFilterOpts(params: ProductKlassListUrlFilters): ProductKlassListFilterOpts {
  return {
    configurable: {
      active: !!params.configurable,
      value: maybe(() => findValueInEnum(params.configurable, ProductKlassConfigurable)),
    },
    type: {
      active: !!params.type,
      value: maybe(() => findValueInEnum(params.type, ProductKlass)),
    },
  };
}

export function getFilterVariables(params: ProductKlassListUrlFilters): ProductKlassFilter {
  return {
    configurable: params.configurable
      ? findValueInEnum(params.configurable, ProductKlassConfigurable)
      : undefined,
    productKlass: params.type ? findValueInEnum(params.type, ProductKlass) : undefined,
    search: params.query,
  };
}

export function getFilterQueryParam(
  filter: FilterElement<ProductKlassFilterKeys>
): ProductKlassListUrlFilters {
  const { name } = filter;

  switch (name) {
    case ProductKlassFilterKeys.configurable:
      return getSingleValueQueryParam(filter, ProductKlassListUrlFiltersEnum.configurable);

    case ProductKlassFilterKeys.type:
      return getSingleValueQueryParam(filter, ProductKlassListUrlFiltersEnum.type);
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<ProductKlassListUrlFilters>(PRODUCT_TYPE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  ProductKlassListUrlQueryParams,
  ProductKlassListUrlFilters
>(ProductKlassListUrlFiltersEnum);
