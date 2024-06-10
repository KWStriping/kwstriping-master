import { findValueInEnum } from '@tempo/utils/enums';
import type { CollectionListFilterOpts } from '@tempo/dashboard/components/collections/CollectionListPage';
import { CollectionFilterKeys } from '@tempo/dashboard/components/collections/CollectionListPage';
import type { FilterElement, FilterElementRegular } from '@tempo/dashboard/components/core/Filter';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import { CollectionPublished } from '@tempo/api/generated/constants';
import type { CollectionFilter } from '@tempo/api/generated/graphql';
import type {
  CollectionListUrlFilters,
  CollectionListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/collections/urls';
import { CollectionListUrlFiltersEnum } from '@tempo/dashboard/oldSrc/collections/urls';
import { maybe } from '@tempo/dashboard/oldSrc/misc';

import {
  createFilterTabUtils,
  createFilterUtils,
  getSingleEnumValueQueryParam,
  getSingleValueQueryParam,
} from '@tempo/dashboard/oldSrc/utils/filters';

export const COLLECTION_FILTERS_KEY = 'collectionFilters';

export function getFilterOpts(
  params: CollectionListUrlFilters,
  channels: SingleAutocompleteChoiceType[]
): CollectionListFilterOpts {
  return {
    channel: {
      active: params?.channel !== undefined,
      choices: channels,
      value: params?.channel,
    },
    status: {
      active: maybe(() => params.status !== undefined, false),
      value: maybe(() => findValueInEnum(status, CollectionPublished)),
    },
  };
}

export function getFilterVariables(params: CollectionListUrlFilters): CollectionFilter {
  return {
    published: params.status ? findValueInEnum(params.status, CollectionPublished) : undefined,
    search: params.query,
  };
}

export function getFilterQueryParam(
  filter: FilterElement<CollectionFilterKeys>
): CollectionListUrlFilters {
  const { name } = filter;

  switch (name) {
    case CollectionFilterKeys.status:
      return getSingleEnumValueQueryParam(
        filter as FilterElementRegular<CollectionFilterKeys.status>,
        CollectionListUrlFiltersEnum.status,
        CollectionPublished
      );
    case CollectionFilterKeys.channel:
      return getSingleValueQueryParam(filter, CollectionListUrlFiltersEnum.channel);
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<CollectionListUrlFilters>(COLLECTION_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  CollectionListUrlQueryParams,
  CollectionListUrlFilters
>(CollectionListUrlFiltersEnum);
