import { SaleOrdering } from '@core/api/constants';
import { SaleListUrlOrdering } from '@dashboard/oldSrc/discounts/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export const DEFAULT_SORT_KEY = SaleListUrlOrdering.name;

export function canBeSorted(sort: SaleListUrlOrdering, isChannelSelected: boolean) {
  switch (sort) {
    case SaleListUrlOrdering.name:
    case SaleListUrlOrdering.startDate:
    case SaleListUrlOrdering.endDate:
    case SaleListUrlOrdering.type:
      return true;
    case SaleListUrlOrdering.value:
      return isChannelSelected;
    default:
      return false;
  }
}

export function getSortQueryField(sort: SaleListUrlOrdering): SaleOrdering {
  switch (sort) {
    case SaleListUrlOrdering.name:
      return SaleOrdering.Name;
    case SaleListUrlOrdering.startDate:
      return SaleOrdering.StartDate;
    case SaleListUrlOrdering.endDate:
      return SaleOrdering.EndDate;
    case SaleListUrlOrdering.type:
      return SaleOrdering.Type;
    case SaleListUrlOrdering.value:
      return SaleOrdering.Value;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
