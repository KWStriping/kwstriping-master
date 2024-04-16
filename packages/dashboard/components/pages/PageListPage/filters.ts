import { useTranslation } from '@core/i18n';
import type { FilterElement, IFilter } from '@dashboard/components/core/Filter';
import type { SearchPageKlassesQuery } from '@core/api/graphql';
import type { SearchWithFetchMoreProps } from '@dashboard/oldSrc/giftCards/GiftCardsList/GiftCardListSearchAndFilters/types';
import type { PageListUrlFilters, PageListUrlSort } from '@dashboard/oldSrc/pages/urls';
import { PageListUrlFiltersWithMultipleValues } from '@dashboard/oldSrc/pages/urls';
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
import { mapNodeToChoice, mapSingleValueNodeToChoice } from '@dashboard/oldSrc/utils/maps';

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
  const { t } = useTranslation();
  return [
    {
      ...createAutocompleteField(
        PageListFilterKeys.pageKlasses,
        t('dashboard.pageKlasses', 'Page Types'),
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
