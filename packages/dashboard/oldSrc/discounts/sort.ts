import { VoucherOrdering } from '@core/api/constants';
import { VoucherListUrlOrdering } from '@dashboard/oldSrc/discounts/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export const DEFAULT_SORT_KEY = VoucherListUrlOrdering.code;

export function canBeSorted(sort: VoucherListUrlOrdering, isChannelSelected: boolean) {
  switch (sort) {
    case VoucherListUrlOrdering.code:
    case VoucherListUrlOrdering.startDate:
    case VoucherListUrlOrdering.endDate:
    case VoucherListUrlOrdering.type:
    case VoucherListUrlOrdering.limit:
      return true;
    case VoucherListUrlOrdering.value:
    case VoucherListUrlOrdering.minSpent:
      return isChannelSelected;
    default:
      return false;
  }
}

export function getSortQueryField(sort: VoucherListUrlOrdering): VoucherOrdering {
  switch (sort) {
    case VoucherListUrlOrdering.code:
      return VoucherOrdering.Code;
    case VoucherListUrlOrdering.endDate:
      return VoucherOrdering.EndDate;
    case VoucherListUrlOrdering.minSpent:
      return VoucherOrdering.MinimumSpentAmount;
    case VoucherListUrlOrdering.limit:
      return VoucherOrdering.UsageLimit;
    case VoucherListUrlOrdering.startDate:
      return VoucherOrdering.StartDate;
    case VoucherListUrlOrdering.type:
      return VoucherOrdering.Type;
    case VoucherListUrlOrdering.value:
      return VoucherOrdering.Value;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
