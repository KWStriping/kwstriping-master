import urlJoin from 'url-join';

import type { BulkAction, Dialog, Pagination, SingleAction, Sort } from '../types';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export const navigationSection = '/navigation';

export const menuListPath = navigationSection;
export type MenuListUrlDialog = 'add' | 'remove' | 'remove-many';
export enum MenuListUrlOrdering {
  name = 'name',
  items = 'items',
}
export type MenuListUrlSort = Sort<MenuListUrlOrdering>;
export type MenuListUrlQueryParams = BulkAction &
  Dialog<MenuListUrlDialog> &
  MenuListUrlSort &
  Pagination &
  SingleAction;
export const menuListUrl = (params?: MenuListUrlQueryParams) => ({
  pathname: menuListPath,
  query: params,
});

export const menuPath = (id: string) => urlJoin(navigationSection, id);
export type MenuUrlDialog = 'add-item' | 'edit-item' | 'remove';
export type MenuUrlQueryParams = Dialog<MenuUrlDialog> & SingleAction;
export const menuUrl = (id: string, params?: MenuUrlQueryParams) =>
  menuPath(encodeURIComponent(id)) + '?' + stringifyQs(params);
