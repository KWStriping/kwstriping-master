import urlJoin from 'url-join';

import type {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  Sort,
  TabActionDialog,
} from '../types';
import type { ChannelsAction } from '@tempo/dashboard/oldSrc/channels/urls';

const collectionSectionUrl = '/collections/';

export const collectionListPath = collectionSectionUrl;
export enum CollectionListUrlFiltersEnum {
  status = 'status',
  query = 'query',
  channel = 'channel',
}
export type CollectionListUrlFilters = Filters<CollectionListUrlFiltersEnum>;
export type CollectionListUrlDialog = 'remove' | TabActionDialog;
export enum CollectionListUrlOrdering {
  name = 'name',
  available = 'available',
  productCount = 'products',
}
export type CollectionListUrlSort = Sort<CollectionListUrlOrdering>;
export type CollectionListUrlQueryParams = ActiveTab &
  BulkAction &
  CollectionListUrlFilters &
  CollectionListUrlSort &
  Dialog<CollectionListUrlDialog> &
  Pagination;
export const collectionListUrl = (params?: CollectionListUrlQueryParams) => ({
  pathname: collectionSectionUrl,
  query: params,
});

export const collectionPath = (id: string) => urlJoin(collectionSectionUrl, id);
export type CollectionUrlDialog =
  | 'remove'
  | 'removeImage'
  | 'assign'
  | 'unassign'
  | ChannelsAction;
export type CollectionUrlQueryParams = BulkAction & Dialog<CollectionUrlDialog>;
export type CollectionCreateUrlQueryParams = Dialog<ChannelsAction>;
export const collectionUrl = (id: string, params?: CollectionUrlQueryParams) => ({
  pathname: '/collections/[id]',
  query: { ...params, id },
});

export const collectionAddPath = urlJoin(collectionSectionUrl, 'add');
export const collectionAddUrl = (params?: CollectionCreateUrlQueryParams) => ({
  pathname: collectionAddPath,
  query: params,
});
