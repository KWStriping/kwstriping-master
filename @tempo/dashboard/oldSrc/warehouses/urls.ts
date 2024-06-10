import urlJoin from 'url-join';

import type {
  ActiveTab,
  Dialog,
  Filters,
  Pagination,
  SingleAction,
  Sort,
  TabActionDialog,
} from '../types';

export const warehouseSection = '/warehouses/';

export const warehouseListPath = warehouseSection;
export enum WarehouseListUrlFiltersEnum {
  query = 'query',
}
export type WarehouseListUrlFilters = Filters<WarehouseListUrlFiltersEnum>;
export type WarehouseListUrlDialog = 'delete' | TabActionDialog;
export enum WarehouseListUrlOrdering {
  name = 'name',
}
export type WarehouseListUrlSort = Sort<WarehouseListUrlOrdering>;
export type WarehouseListUrlQueryParams = ActiveTab &
  Dialog<WarehouseListUrlDialog> &
  Pagination &
  WarehouseListUrlFilters &
  WarehouseListUrlSort &
  SingleAction;
export const warehouseListUrl = (params?: WarehouseListUrlQueryParams) => ({
  pathname: warehouseListPath,
  query: params,
});

export const warehousePath = (id: string) => urlJoin(warehouseSection, id);
export type WarehouseUrlDialog = 'delete';
export type WarehouseUrlQueryParams = Dialog<WarehouseUrlDialog> & SingleAction;
export const warehouseUrl = (id: string, params?: WarehouseUrlQueryParams) => ({
  pathname: '/warehouses/[id]',
  query: { ...params, id },
});

export const warehouseAddPath = urlJoin(warehouseSection, 'add');
export const warehouseAddUrl = warehouseAddPath;
