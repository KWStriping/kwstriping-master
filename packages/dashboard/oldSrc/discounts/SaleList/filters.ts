import { joinDateTime } from '@core/utils/datetime';
import { findValueInEnum } from '@core/utils/enums';
import type { FilterElement, FilterElementRegular } from '@dashboard/components/core/Filter';
import type { SaleListFilterOpts } from '@dashboard/components/discounts/SaleListPage';
import { SaleFilterKeys } from '@dashboard/components/discounts/SaleListPage';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import { DiscountStatus, DiscountValueType } from '@core/api/constants';
import type { SaleFilter } from '@core/api/graphql';
import type {
  SaleListUrlFilters,
  SaleListUrlQueryParams,
} from '@dashboard/oldSrc/discounts/urls';
import {
  SaleListUrlFiltersEnum,
  SaleListUrlFiltersWithMultipleValues,
} from '@dashboard/oldSrc/discounts/urls';
import { maybe } from '@dashboard/oldSrc/misc';

import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables,
  getMinMaxQueryParam,
  getMultipleEnumValueQueryParam,
  getSingleEnumValueQueryParam,
  getSingleValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';

export const SALE_FILTERS_KEY = 'saleFilters';

export function getFilterOpts(
  params: SaleListUrlFilters,
  channels: SingleAutocompleteChoiceType[]
): SaleListFilterOpts {
  return {
    channel: {
      active: params?.channel !== undefined,
      choices: channels,
      value: params?.channel,
    },
    saleType: {
      active: !!params.type,
      value: maybe(() => findValueInEnum(params.type, DiscountValueType)),
    },
    started: {
      active: maybe(
        () => [params.startedFrom, params.startedTo].some((field) => field !== undefined),
        false
      ),
      value: {
        max: params.startedTo ?? '',
        min: params.startedFrom ?? '',
      },
    },
    status: {
      active: !!params.status,
      value: dedupeFilter(
        params.status?.map((status) => findValueInEnum(status, DiscountStatus)) || []
      ),
    },
  };
}

export function getFilterVariables(params: SaleListUrlFilters): SaleFilter {
  return {
    saleType: params.type && findValueInEnum(params.type, DiscountValueType),
    search: params.query,
    started: getGteLteVariables({
      gte: joinDateTime(params.startedFrom),
      lte: joinDateTime(params.startedTo),
    }),
    status:
      params.status && params.status.map((status) => findValueInEnum(status, DiscountStatus)),
  };
}

export function getFilterQueryParam(filter: FilterElement<SaleFilterKeys>): SaleListUrlFilters {
  const { name } = filter;

  switch (name) {
    case SaleFilterKeys.saleType:
      return getSingleEnumValueQueryParam(
        filter as FilterElementRegular<SaleFilterKeys.saleType>,
        SaleListUrlFiltersEnum.type,
        DiscountValueType
      );

    case SaleFilterKeys.started:
      return getMinMaxQueryParam(
        filter,
        SaleListUrlFiltersEnum.startedFrom,
        SaleListUrlFiltersEnum.startedTo
      );

    case SaleFilterKeys.status:
      return getMultipleEnumValueQueryParam(
        filter as FilterElementRegular<SaleFilterKeys.status>,
        SaleListUrlFiltersWithMultipleValues.status,
        DiscountStatus
      );

    case SaleFilterKeys.channel:
      return getSingleValueQueryParam(filter, SaleListUrlFiltersEnum.channel);
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<SaleListUrlFilters>(SALE_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  SaleListUrlQueryParams,
  SaleListUrlFilters
>({
  ...SaleListUrlFiltersEnum,
  ...SaleListUrlFiltersWithMultipleValues,
});
