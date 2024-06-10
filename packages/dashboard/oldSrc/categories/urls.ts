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

const categorySectionUrl = '/categories/';

export const categoryListPath = categorySectionUrl;
export enum CategoryListUrlFiltersEnum {
  query = 'query',
}
export type CategoryListUrlFilters = Filters<CategoryListUrlFiltersEnum>;
export type CategoryListUrlDialog = 'delete' | TabActionDialog;
export enum CategoryListUrlOrdering {
  name = 'name',
  productCount = 'products',
  subcategoryCount = 'subcategories',
}
export type CategoryListUrlSort = Sort<CategoryListUrlOrdering>;
export type CategoryListUrlQueryParams = ActiveTab &
  BulkAction &
  CategoryListUrlFilters &
  CategoryListUrlSort &
  Dialog<CategoryListUrlDialog> &
  Pagination;
export const categoryListUrl = (params?: CategoryListUrlQueryParams) => ({
  pathname: categorySectionUrl,
  query: params,
});

export const categoryPath = (id: string) => urlJoin(categorySectionUrl, id);
export type CategoryUrlDialog = 'delete' | 'delete-categories' | 'delete-products';
export type CategoryUrlQueryParams = BulkAction & Dialog<CategoryUrlDialog>;
export const categoryUrl = (id: string, params?: CategoryUrlQueryParams) => ({
  pathname: '/categories/[id]',
  query: { id, ...params },
});

export const categoryAddPath = (parentId?: string) => {
  if (parentId) {
    return urlJoin(categoryPath(parentId), 'add');
  }
  return urlJoin(categorySectionUrl, 'add');
};
export const categoryAddUrl = (parentId?: string) =>
  categoryAddPath(parentId ? encodeURIComponent(parentId) : undefined);
