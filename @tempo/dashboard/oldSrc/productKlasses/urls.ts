import urlJoin from 'url-join';

import type { ProductAttributeType, ProductKlassKind } from '@tempo/api/generated/constants';
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

const productKlassSection = '/product-types/';

export const productKlassListPath = productKlassSection;
export enum ProductKlassListUrlFiltersEnum {
  configurable = 'configurable',
  type = 'type',
  query = 'query',
}
export type ProductKlassListUrlFilters = Filters<ProductKlassListUrlFiltersEnum>;
export type ProductKlassListUrlDialog = 'remove' | TabActionDialog;
export enum ProductKlassListUrlOrdering {
  name = 'name',
  digital = 'digital',
}
export type ProductKlassListUrlSort = Sort<ProductKlassListUrlOrdering>;
export type ProductKlassListUrlQueryParams = ActiveTab &
  BulkAction &
  Dialog<ProductKlassListUrlDialog> &
  Pagination &
  ProductKlassListUrlFilters &
  ProductKlassListUrlSort;
export const productKlassListUrl = (params?: ProductKlassListUrlQueryParams) => ({
  pathname: productKlassListPath,
  query: params,
});

export interface ProductKlassAddUrlKind {
  kind?: ProductKlassKind;
}
export type ProductKlassAddUrlQueryParams = ProductKlassAddUrlKind;
export const productKlassAddPath = urlJoin(productKlassSection, 'add');
export const productKlassAddUrl = (params?: ProductKlassAddUrlQueryParams) => ({
  pathname: productKlassAddPath,
  query: params,
});

export const productKlassPath = (id: string) => urlJoin(productKlassSection, id);
export type ProductKlassUrlDialog =
  | 'assign-attribute'
  | 'unassign-attribute'
  | 'unassign-attributes'
  | 'remove';
export type ProductKlassUrlQueryParams = BulkAction &
  Dialog<ProductKlassUrlDialog> &
  SingleAction & {
    type?: ProductAttributeType;
  };
export const productKlassUrl = (id: string, params?: ProductKlassUrlQueryParams) => ({
  pathname: '/product-types/[id]',
  query: { id, ...params },
});
