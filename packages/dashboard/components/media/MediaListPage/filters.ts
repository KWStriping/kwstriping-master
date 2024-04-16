import { useTranslation } from '@core/i18n';
import type { FilterElement, IFilter } from '@dashboard/components/core/Filter';
import type { MediaType } from '@core/api/graphql';
import type { MediaListUrlFilters, MediaListUrlSort } from '@dashboard/oldSrc/media/urls';
import { MediaListUrlFiltersWithMultipleValues } from '@dashboard/oldSrc/media/urls';
import type {
  ActiveTab,
  AutocompleteFilterOpts,
  FilterOpts,
  Pagination,
  Search,
} from '@dashboard/oldSrc/types';
import {
  createFilterTabUtils,
  createFilterUtils,
  getMultipleValueQueryParam,
} from '@dashboard/oldSrc/utils/filters';
import { createAutocompleteField } from '@dashboard/oldSrc/utils/filters/fields';
import { mapSingleValueNodeToChoice } from '@dashboard/oldSrc/utils/maps';

export enum MediaListFilterKeys {
  mediaTypes = 'mediaTypes',
}

export const MEDIA_FILTERS_KEY = 'mediaFilters';

export interface MediaListFilterOpts {
  mediaType: FilterOpts<string[]> & AutocompleteFilterOpts;
}

interface MediaListFilterOptsProps {
  params: MediaListUrlFilters;
  mediaTypes: MediaType[];
}

export const getFilterOpts = ({
  params,
  mediaTypes,
}: MediaListFilterOptsProps): MediaListFilterOpts => ({
  mediaType: {
    active: !!params?.mediaTypes,
    value: params?.mediaTypes,
    choices: mediaTypes.map((value) => ({ label: value, value })),
    displayValues: mapSingleValueNodeToChoice(mediaTypes),
    initialSearch: '',
  },
});

export function useFilterStructure(opts: MediaListFilterOpts): IFilter<MediaListFilterKeys> {
  const { t } = useTranslation();
  return [
    {
      ...createAutocompleteField(
        MediaListFilterKeys.mediaTypes,
        t('dashboard.mediaType', 'Media Types'),
        opts.mediaType.value,
        opts.mediaType.displayValues,
        true,
        opts.mediaType.choices,
        {
          hasMore: opts.mediaType.hasMore,
          initialSearch: '',
          loading: opts.mediaType.loading,
          onFetchMore: opts.mediaType.onFetchMore,
          onSearchChange: opts.mediaType.onSearchChange,
        }
      ),
      active: opts.mediaType.active,
    },
  ];
}

export function getFilterQueryParam(
  filter: FilterElement<MediaListFilterKeys>
): MediaListUrlFilters {
  const { name } = filter;

  const { mediaTypes } = MediaListFilterKeys;

  switch (name) {
    case mediaTypes:
      return getMultipleValueQueryParam(filter, name);
  }
}

export type MediaListUrlQueryParams = Pagination &
  MediaListUrlFilters &
  MediaListUrlSort &
  ActiveTab &
  Search;

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<MediaListUrlFilters>(MEDIA_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  MediaListUrlQueryParams,
  MediaListUrlFilters
>(MediaListUrlFiltersWithMultipleValues);
