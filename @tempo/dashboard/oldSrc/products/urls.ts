import urlJoin from 'url-join';

import type {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  FiltersAsDictWithMultipleValues,
  FiltersWithKeyValueValues,
  FiltersWithMultipleValues,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from '../types';
import { stringifyQs } from '../utils/urls';
import type { ChannelsAction } from '@tempo/dashboard/oldSrc/channels/urls';

const productSection = '/products/';

export const productAddPath = urlJoin(productSection, 'add');
export const productAddUrl = (params?: ProductCreateUrlQueryParams) => ({
  pathname: productAddPath,
  query: params,
});

export const productListPath = productSection;
export type ProductListUrlDialog = 'delete' | 'export' | 'create-product' | TabActionDialog;
export enum ProductListUrlFiltersEnum {
  priceFrom = 'priceFrom',
  priceTo = 'priceTo',
  status = 'status',
  stockStatus = 'stockStatus',
  query = 'query',
  channel = 'channel',
  productKind = 'productKind',
}
export enum ProductListUrlFiltersWithMultipleValues {
  categories = 'categories',
  collections = 'collections',
  productKlasses = 'productKlasses',
}
export const ProductListUrlFiltersAsDictWithMultipleValues = {
  booleanAttributes: 'boolean-attributes',
  dateAttributes: 'date-attributes',
  dateTimeAttributes: 'datetime-attributes',
  numericAttributes: 'numeric-attributes',
  stringAttributes: 'string-attributes',
} as const;
export type ProductListUrlFiltersAsDictWithMultipleValues =
  (typeof ProductListUrlFiltersAsDictWithMultipleValues)[keyof typeof ProductListUrlFiltersAsDictWithMultipleValues];
export enum ProductListUrlFiltersWithKeyValueValues {
  metadata = 'metadata',
}
export type ProductListUrlFilters = Filters<ProductListUrlFiltersEnum> &
  FiltersWithMultipleValues<ProductListUrlFiltersWithMultipleValues> &
  FiltersWithKeyValueValues<ProductListUrlFiltersWithKeyValueValues> &
  FiltersAsDictWithMultipleValues<ProductListUrlFiltersAsDictWithMultipleValues>;
export enum ProductListUrlOrdering {
  attribute = 'attribute',
  name = 'name',
  productKlass = 'productKlass',
  status = 'status',
  price = 'price',
  rank = 'rank',
  date = 'date',
}
export type ProductListUrlSort = Sort<ProductListUrlOrdering>;
export interface ProductListUrlQueryParams
  extends BulkAction,
    Dialog<ProductListUrlDialog>,
    ProductListUrlFilters,
    ProductListUrlSort,
    Pagination,
    ActiveTab {
  attributeId?: string;
}
export const productListUrl = (params?: ProductListUrlQueryParams): string => ({
  pathname: productListPath,
  query: params,
});

export const productPath = (id: string) => urlJoin(productSection + id);
export type ProductUrlDialog = 'remove' | 'assign-attribute-value' | ChannelsAction;
export type ProductUrlQueryParams = BulkAction & Dialog<ProductUrlDialog> & SingleAction;
export type ProductCreateUrlDialog = 'assign-attribute-value' | ChannelsAction;
export interface ProductCreateUrlProductKlass {
  'product-type-id'?: string;
}
export type ProductCreateUrlQueryParams = Dialog<ProductCreateUrlDialog> &
  SingleAction &
  ProductCreateUrlProductKlass;
export const productUrl = (id: string, params?: ProductUrlQueryParams) => ({
  pathname: '/products/[id]',
  query: { ...params, id },
});

export const productVariantEditPath = (productId: string) =>
  urlJoin(productSection, productId, 'variant', productId);
export type ProductEditUrlDialog = 'remove' | 'assign-attribute-value';
export type ProductEditUrlQueryParams = Dialog<ProductEditUrlDialog> & SingleAction;
export const productVariantEditUrl = (productId: string, params?: ProductEditUrlQueryParams) =>
  productVariantEditPath(encodeURIComponent(productId), encodeURIComponent(productId)) +
  '?' +
  stringifyQs(params);

export type ProductAddUrlDialog = 'assign-attribute-value';
export type ProductAddUrlQueryParams = Dialog<ProductAddUrlDialog> & SingleAction;
export const productVariantAddPath = (productId: string) =>
  urlJoin(productSection, productId, 'variants/add');
export const productVariantAddUrl = (
  productId: string,
  params?: ProductAddUrlQueryParams
): string => productVariantAddPath(encodeURIComponent(productId)) + '?' + stringifyQs(params);

export const productImagePath = (productId: string, imageId: string) =>
  urlJoin(productSection, productId, 'image', imageId);
export type ProductImageUrlDialog = 'remove';
export type ProductImageUrlQueryParams = Dialog<'remove'>;
export const productImageUrl = (
  productId: string,
  imageId: string,
  params?: ProductImageUrlQueryParams
) =>
  productImagePath(encodeURIComponent(productId), encodeURIComponent(imageId)) +
  '?' +
  stringifyQs(params);
