import { findValueInEnum } from '@tempo/utils/enums';
import { ProductKlassConfigurable, ProductKlass } from '@tempo/api/generated/constants';
import type { ProductKlassFilter } from '@tempo/api/generated/graphql';
import type { FilterElement } from '@tempo/dashboard/components/core/Filter';
import type { ProductKlassListFilterOpts } from '@tempo/dashboard/components/productKlasses/ProductKlassListPage';
import { ProductKlassFilterKeys } from '@tempo/dashboard/components/productKlasses/ProductKlassListPage';
import { maybe } from '@tempo/dashboard/oldSrc/misc';

import type {
  ProductKlassListUrlFilters,
  ProductKlassListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/productKlasses/urls';
import { ProductKlassListUrlFiltersEnum } from '@tempo/dashboard/oldSrc/productKlasses/urls';
import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleValueQueryParam,
} from '@tempo/dashboard/oldSrc/utils/filters';

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
