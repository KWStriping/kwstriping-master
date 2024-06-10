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
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

export const mediaSection = '/media/';

export const mediaListPath = mediaSection;
export type MediaListUrlDialog =
  | 'publish'
  | 'unpublish'
  | 'remove'
  | 'create-media'
  | TabActionDialog;
export enum MediaListUrlOrdering {
  title = 'title',
  visible = 'visible',
}

export enum MediaListUrlFiltersEnum {
  query = 'query',
}

export enum MediaListUrlFiltersWithMultipleValues {
  mediaTypes = 'mediaTypes',
}

export type MediaListUrlFilters = Filters<MediaListUrlFiltersEnum> &
  FiltersWithMultipleValues<MediaListUrlFiltersWithMultipleValues>;
export type MediaListUrlSort = Sort<MediaListUrlOrdering>;
export type MediaListUrlQueryParams = BulkAction &
  MediaListUrlFilters &
  Dialog<MediaListUrlDialog> &
  MediaListUrlSort &
  Pagination &
  ActiveTab;
export const mediaListUrl = (params?: MediaListUrlQueryParams) => ({
  pathname: mediaListPath,
  query: params,
});

export const mediaPath = (id: string) => urlJoin(mediaSection, id);
export type MediaUrlDialog = 'remove' | 'assign-attribute-value';
export interface MediaCreateUrlMediaType {
  'media-type-id'?: string;
}
export type MediaUrlQueryParams = Dialog<MediaUrlDialog> & SingleAction;
export type MediaCreateUrlQueryParams = Dialog<MediaUrlDialog> &
  SingleAction &
  MediaCreateUrlMediaType;
export const mediaUrl = (id: string, params?: MediaUrlQueryParams) =>
  mediaPath(encodeURIComponent(id)) + '?' + stringifyQs(params);

export const createMediaPath = urlJoin(mediaSection, 'add');
export const createMediaUrl = (params?: MediaCreateUrlQueryParams) => ({
  pathname: createMediaPath,
  query: params,
});
