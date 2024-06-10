import * as m from '@paraglide/messages';
import type { FilterElement, IFilter } from '@tempo/dashboard/components/core/Filter';
import type { SearchPageKlassesQuery } from '@tempo/api/generated/graphql';
import type { SearchWithFetchMoreProps } from '@tempo/dashboard/oldSrc/giftCards/GiftCardsList/GiftCardListSearchAndFilters/types';
import type { PageListUrlFilters, PageListUrlSort } from '@tempo/dashboard/oldSrc/pages/urls';
import { PageListUrlFiltersWithMultipleValues } from '@tempo/dashboard/oldSrc/pages/urls';
import type {
  ActiveTab,
  AutocompleteFilterOpts,
  FilterOpts,
  Pagination,
  Search,
} from '@tempo/dashboard/oldSrc/types';
import {
  createFilterTabUtils,
  createFilterUtils,
  getMultipleValueQueryParam,
} from '@tempo/dashboard/oldSrc/utils/filters';
import { createAutocompleteField } from '@tempo/dashboard/oldSrc/utils/filters/fields';
import { mapNodeToChoice, mapSingleValueNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';

export enum PageListFilterKeys {
  pageKlasses = '/page-types',
}

export const PAGES_FILTERS_KEY = 'pagesFilters';

export interface PageListFilterOpts {
  pageKlass: FilterOpts<string[]> & AutocompleteFilterOpts;
}

interface PageListFilterOptsProps {
  params: PageListUrlFilters;
  pageKlasses: Array<SearchPageKlassesQuery['search']['edges'][0]['node']>;
  pageKlassesProps: SearchWithFetchMoreProps;
}

export const getFilterOpts = ({
  params,
  pageKlasses,
  pageKlassesProps,
}: PageListFilterOptsProps): PageListFilterOpts => ({
  pageKlasses: {
    active: !!params?.pageKlasses,
    value: params?.pageKlasses,
    choices: mapNodeToChoice(pageKlasses),
    displayValues: mapSingleValueNodeToChoice(pageKlasses),
    initialSearch: '',
    hasMore: pageKlassesProps.hasMore,
    loading: pageKlassesProps.loading,
    onFetchMore: pageKlassesProps.onFetchMore,
    onSearchChange: pageKlassesProps.onSearchChange,
  },
});

export function useFilterStructure(opts: PageListFilterOpts): IFilter<PageListFilterKeys> {
  return [
    {
      ...createAutocompleteField(
        PageListFilterKeys.pageKlasses,
        (m.dashboard_pageKlasses() ?? 'Page Types'),
        opts.pageKlasses.value,
        opts.pageKlasses.displayValues,
        true,
        opts.pageKlasses.choices,
        {
          hasMore: opts.pageKlasses.hasMore,
          initialSearch: '',
          loading: opts.pageKlasses.loading,
          onFetchMore: opts.pageKlasses.onFetchMore,
          onSearchChange: opts.pageKlasses.onSearchChange,
        }
      ),
      active: opts.pageKlasses.active,
    },
  ];
}

export function getFilterQueryParam(
  filter: FilterElement<PageListFilterKeys>
): PageListUrlFilters {
  const { name } = filter;

  const { pageKlasses } = PageListFilterKeys;

  switch (name) {
    case pageKlasses:
      return getMultipleValueQueryParam(filter, name);
  }
}

export type PageListUrlQueryParams = Pagination &
  PageListUrlFilters &
  PageListUrlSort &
  ActiveTab &
  Search;

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<PageListUrlFilters>(PAGES_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  PageListUrlQueryParams,
  PageListUrlFilters
>(PageListUrlFiltersWithMultipleValues);
