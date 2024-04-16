import { joinDateTime } from '@core/utils/datetime';
import { findValueInEnum } from '@core/utils/enums';
import type { FilterElement, FilterElementRegular } from '@dashboard/components/core/Filter';
import type { VoucherListFilterOpts } from '@dashboard/components/discounts/VoucherListPage';
import { VoucherFilterKeys } from '@dashboard/components/discounts/VoucherListPage';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import { DiscountStatus, VoucherDiscountType } from '@core/api/constants';
import type { VoucherFilter } from '@core/api/graphql';
import type {
  VoucherListUrlFilters,
  VoucherListUrlQueryParams,
} from '@dashboard/oldSrc/discounts/urls';
import {
  VoucherListUrlFiltersEnum,
  VoucherListUrlFiltersWithMultipleValues,
} from '@dashboard/oldSrc/discounts/urls';
import { maybe } from '@dashboard/oldSrc/misc';

import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables,
  getMinMaxQueryParam,
  getMultipleEnumValueQueryParam,
  getSingleValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';

export const VOUCHER_FILTERS_KEY = 'voucherFilters';

export function getFilterOpts(
  params: VoucherListUrlFilters,
  channels: SingleAutocompleteChoiceType[]
): VoucherListFilterOpts {
  return {
    channel: {
      active: params?.channel !== undefined,
      choices: channels,
      value: params?.channel,
    },
    saleType: {
      active: !!params.type,
      value: dedupeFilter(
        params.type?.map((type) => findValueInEnum(type, VoucherDiscountType)) || []
      ),
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
    timesUsed: {
      active: maybe(
        () => [params.timesUsedFrom, params.timesUsedTo].some((field) => field !== undefined),
        false
      ),
      value: {
        max: params.timesUsedTo ?? '',
        min: params.timesUsedFrom ?? '',
      },
    },
  };
}

export function getFilterVariables(params: VoucherListUrlFilters): VoucherFilter {
  return {
    discountType:
      params.type && params.type.map((type) => findValueInEnum(type, VoucherDiscountType)),
    search: params.query,
    started: getGteLteVariables({
      gte: joinDateTime(params.startedFrom),
      lte: joinDateTime(params.startedTo),
    }),
    status:
      params.status && params.status.map((status) => findValueInEnum(status, DiscountStatus)),
    timesUsed: getGteLteVariables({
      gte: parseInt(params.timesUsedFrom, 10),
      lte: parseInt(params.timesUsedTo, 10),
    }),
  };
}

export function getFilterQueryParam(
  filter: FilterElement<VoucherFilterKeys>
): VoucherListUrlFilters {
  const { name } = filter;

  switch (name) {
    case VoucherFilterKeys.saleType:
      return getMultipleEnumValueQueryParam(
        filter as FilterElementRegular<VoucherFilterKeys.saleType>,
        VoucherListUrlFiltersWithMultipleValues.type,
        VoucherDiscountType
      );

    case VoucherFilterKeys.started:
      return getMinMaxQueryParam(
        filter,
        VoucherListUrlFiltersEnum.startedFrom,
        VoucherListUrlFiltersEnum.startedTo
      );

    case VoucherFilterKeys.timesUsed:
      return getMinMaxQueryParam(
        filter,
        VoucherListUrlFiltersEnum.timesUsedFrom,
        VoucherListUrlFiltersEnum.timesUsedTo
      );

    case VoucherFilterKeys.status:
      return getMultipleEnumValueQueryParam(
        filter as FilterElementRegular<VoucherFilterKeys.status>,
        VoucherListUrlFiltersWithMultipleValues.status,
        DiscountStatus
      );

    case VoucherFilterKeys.channel:
      return getSingleValueQueryParam(filter, VoucherListUrlFiltersEnum.channel);
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<VoucherListUrlFilters>(VOUCHER_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  VoucherListUrlQueryParams,
  VoucherListUrlFilters
>({
  ...VoucherListUrlFiltersEnum,
  ...VoucherListUrlFiltersWithMultipleValues,
});
