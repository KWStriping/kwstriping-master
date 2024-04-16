import type { FilterElement } from '@dashboard/components/orders/Filter';
import type { OrderDraftListFilterOpts } from '@dashboard/components/orders/OrderDraftListPage';
import { OrderDraftFilterKeys } from '@dashboard/components/orders/OrderDraftListPage';
import type { OrderDraftFilter } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';

import type {
  OrderDraftListUrlFilters,
  OrderDraftListUrlQueryParams,
} from '@dashboard/oldSrc/orders/urls';
import { OrderDraftListUrlFiltersEnum } from '@dashboard/oldSrc/orders/urls';
import {
  createFilterTabUtils,
  createFilterUtils,
  getGteLteVariables,
  getMinMaxQueryParam,
  getSingleValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';

export const ORDER_DRAFT_FILTERS_KEY = 'orderDraftFilters';

export function getFilterOpts(params: OrderDraftListUrlFilters): OrderDraftListFilterOpts {
  return {
    created: {
      active: maybe(
        () => [params.createdFrom, params.createdTo].some((field) => field !== undefined),
        false
      ),
      value: {
        max: params.createdTo,
        min: params.createdFrom,
      },
    },
    customer: {
      active: !!params.customer,
      value: params.customer,
    },
  };
}

export function getFilterVariables(params: OrderDraftListUrlFilters): OrderDraftFilter {
  return {
    created: getGteLteVariables({
      gte: params.createdFrom,
      lte: params.createdTo,
    }),
    customer: params.customer,
    search: params.query,
  };
}

export function getFilterQueryParam(
  filter: FilterElement<OrderDraftFilterKeys>
): OrderDraftListUrlFilters {
  const { name } = filter;

  switch (name) {
    case OrderDraftFilterKeys.created:
      return getMinMaxQueryParam(
        filter,
        OrderDraftListUrlFiltersEnum.createdFrom,
        OrderDraftListUrlFiltersEnum.createdTo
      );

    case OrderDraftFilterKeys.customer:
      return getSingleValueQueryParam(filter, OrderDraftListUrlFiltersEnum.customer);
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<OrderDraftListUrlFilters>(ORDER_DRAFT_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  OrderDraftListUrlQueryParams,
  OrderDraftListUrlFilters
>(OrderDraftListUrlFiltersEnum);
