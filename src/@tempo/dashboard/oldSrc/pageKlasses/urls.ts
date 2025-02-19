import urlJoin from 'url-join';

import type {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from '../types';

const pageKlassesSection = '/page-types/';

export const pageKlassesListPath = pageKlassesSection;
export enum PageKlassListUrlFiltersEnum {
  type = 'type',
  query = 'query',
}
export type PageKlassListUrlFilters = Filters<PageKlassListUrlFiltersEnum>;
export type PageKlassListUrlDialog = 'remove' | TabActionDialog;
export enum PageKlassListUrlOrdering {
  name = 'name',
}
export type PageKlassListUrlSort = Sort<PageKlassListUrlOrdering>;
export type PageKlassListUrlQueryParams = ActiveTab &
  BulkAction &
  Dialog<PageKlassListUrlDialog> &
  Pagination &
  PageKlassListUrlFilters &
  PageKlassListUrlSort;
export const pageKlassesListUrl = (params?: PageKlassListUrlQueryParams) => ({
  pathname: pageKlassesListPath,
  query: params,
});

export const pageKlassesAddPath = urlJoin(pageKlassesSection, 'add');
export const pageKlassesAddUrl = pageKlassesAddPath;

export const pageKlassesPath = (id: string) => urlJoin(pageKlassesSection, id);
export type PageKlassUrlDialog =
  | 'assign-attribute'
  | 'unassign-attribute'
  | 'unassign-attributes'
  | 'remove';
export type PageKlassUrlQueryParams = BulkAction &
  Dialog<PageKlassUrlDialog> &
  SingleAction & {
    type?: string;
  };
export const pageKlassUrl = (id: string, params?: PageKlassUrlQueryParams) =>
  ({ pathname: '/page-types/[id]', query: { id, ...params } }) as const;
