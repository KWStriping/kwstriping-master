import type { FilterElement } from '@tempo/dashboard/components/core/Filter';
import type { CustomerListFilterOpts } from '@tempo/dashboard/components/customers/CustomerListPage';
import { CustomerFilterKeys } from '@tempo/dashboard/components/customers/CustomerListPage';
import type { CustomerFilter } from '@tempo/api/generated/graphql';
import type {
  CustomerListUrlFilters,
  CustomerListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/customers/urls';
import { CustomerListUrlFiltersEnum } from '@tempo/dashboard/oldSrc/customers/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';

import {
  createFilterTabUtils,
  createFilterUtils,
  getGteLteVariables,
  getMinMaxQueryParam,
} from '@tempo/dashboard/oldSrc/utils/filters';

export const CUSTOMER_FILTERS_KEY = 'customerFilters';

export function getFilterOpts(params: CustomerListUrlFilters): CustomerListFilterOpts {
  return {
    joined: {
      active: maybe(
        () => [params.joinedFrom, params.joinedTo].some((field) => field !== undefined),
        false
      ),
      value: {
        max: params.joinedTo ?? '',
        min: params.joinedFrom ?? '',
      },
    },
    numberOfOrders: {
      active: maybe(
        () =>
          [params.numberOfOrdersFrom, params.numberOfOrdersTo].some(
            (field) => field !== undefined
          ),
        false
      ),
      value: {
        max: params.numberOfOrdersTo ?? '',
        min: params.numberOfOrdersFrom ?? '',
      },
    },
  };
}

export function getFilterVariables(params: CustomerListUrlFilters): CustomerFilter {
  return {
    dateJoined: getGteLteVariables({
      gte: params.joinedFrom,
      lte: params.joinedTo,
    }),
    numberOfOrders: getGteLteVariables({
      gte: parseInt(params.numberOfOrdersFrom, 10),
      lte: parseInt(params.numberOfOrdersTo, 10),
    }),
    search: params.query,
  };
}

export function getFilterQueryParam(
  filter: FilterElement<CustomerFilterKeys>
): CustomerListUrlFilters {
  const { name } = filter;

  switch (name) {
    case CustomerFilterKeys.joined:
      return getMinMaxQueryParam(
        filter,
        CustomerListUrlFiltersEnum.joinedFrom,
        CustomerListUrlFiltersEnum.joinedTo
      );

    case CustomerFilterKeys.numberOfOrders:
      return getMinMaxQueryParam(
        filter,
        CustomerListUrlFiltersEnum.numberOfOrdersFrom,
        CustomerListUrlFiltersEnum.numberOfOrdersTo
      );
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<CustomerListUrlFilters>(CUSTOMER_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  CustomerListUrlQueryParams,
  CustomerListUrlFilters
>(CustomerListUrlFiltersEnum);
