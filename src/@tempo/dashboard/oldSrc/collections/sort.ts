import { CollectionOrdering } from '@tempo/api/generated/constants';
import { CollectionListUrlOrdering } from '@tempo/dashboard/oldSrc/collections/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export const DEFAULT_SORT_KEY = CollectionListUrlOrdering.name;

export function canBeSorted(sort: CollectionListUrlOrdering, isChannelSelected: boolean) {
  switch (sort) {
    case CollectionListUrlOrdering.name:
    case CollectionListUrlOrdering.productCount:
      return true;
    case CollectionListUrlOrdering.available:
      return isChannelSelected;
    default:
      return false;
  }
}

export function getSortQueryField(sort: CollectionListUrlOrdering): CollectionOrdering {
  switch (sort) {
    case CollectionListUrlOrdering.name:
      return CollectionOrdering.Name;
    case CollectionListUrlOrdering.available:
      return CollectionOrdering.Availability;
    case CollectionListUrlOrdering.productCount:
      return CollectionOrdering.ProductCount;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
