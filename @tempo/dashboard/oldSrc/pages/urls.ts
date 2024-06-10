import urlJoin from 'url-join';

import type {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  FiltersWithMultipleValues,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from '../types';

export const pagesSection = '/pages/';

export const pageListPath = pagesSection;
export type PageListUrlDialog =
  | 'publish'
  | 'unpublish'
  | 'remove'
  | 'create-page'
  | TabActionDialog;
export enum PageListUrlOrdering {
  title = 'title',
  slug = 'slug',
  visible = 'visible',
}

export enum PageListUrlFiltersEnum {
  query = 'query',
}

export enum PageListUrlFiltersWithMultipleValues {
  pageKlasses = '/page-types',
}

export type PageListUrlFilters = Filters<PageListUrlFiltersEnum> &
  FiltersWithMultipleValues<PageListUrlFiltersWithMultipleValues>;
export type PageListUrlSort = Sort<PageListUrlOrdering>;
export type PageListUrlQueryParams = BulkAction &
  PageListUrlFilters &
  Dialog<PageListUrlDialog> &
  PageListUrlSort &
  Pagination &
  ActiveTab;
export const pageListUrl = (params?: PageListUrlQueryParams) => ({
  pathname: pageListPath,
  query: params,
});

export const pagePath = (id: string) => urlJoin(pagesSection, id);
export type PageUrlDialog = 'remove' | 'assign-attribute-value';
export interface PageCreateUrlPageKlass {
  'page-type-id'?: string;
}
export type PageUrlQueryParams = Dialog<PageUrlDialog> & SingleAction;
export type PageCreateUrlQueryParams = Dialog<PageUrlDialog> &
  SingleAction &
  PageCreateUrlPageKlass;
export const pageUrl = (id: string, params?: PageUrlQueryParams) => ({
  pathname: '/pages/[id]',
  query: { ...params, id },
});

export const createPagePath = urlJoin(pagesSection, 'add');
export const createPageUrl = (params?: PageCreateUrlQueryParams) => ({
  pathname: createPagePath,
  query: params,
});
