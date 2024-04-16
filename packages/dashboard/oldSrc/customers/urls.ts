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
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

export const customerSection = '/customers/';

export const customerListPath = customerSection;
export enum CustomerListUrlFiltersEnum {
  joinedFrom = 'joinedFrom',
  joinedTo = 'joinedTo',
  numberOfOrdersFrom = 'numberOfOrdersFrom',
  numberOfOrdersTo = 'numberOfOrdersTo',
  query = 'query',
}
export type CustomerListUrlFilters = Filters<CustomerListUrlFiltersEnum>;
export type CustomerListUrlDialog = 'remove' | TabActionDialog;
export enum CustomerListUrlOrdering {
  name = 'name',
  email = 'email',
  orders = 'orders',
}
export type CustomerListUrlSort = Sort<CustomerListUrlOrdering>;
export type CustomerListUrlQueryParams = ActiveTab &
  BulkAction &
  CustomerListUrlFilters &
  CustomerListUrlSort &
  Dialog<CustomerListUrlDialog> &
  Pagination;
export const customerListUrl = (params?: CustomerListUrlQueryParams) => ({
  pathname: customerListPath,
  query: params,
});

export const customerPath = (id: string) => urlJoin(customerSection, id);
export type CustomerUrlDialog = 'remove';
export type CustomerUrlQueryParams = Dialog<CustomerUrlDialog>;
export const customerUrl = (id: string, params?: CustomerUrlQueryParams) => ({
  pathname: '/customers/[id]',
  query: { ...params, id },
});

export const customerAddPath = urlJoin(customerSection, 'add');
export const customerAddUrl = customerAddPath;

export const customerAddressesPath = (id: string) => urlJoin(customerPath(id), 'addresses');
export type CustomerAddressesUrlDialog = 'add' | 'edit' | 'remove';
export type CustomerAddressesUrlQueryParams = Dialog<CustomerAddressesUrlDialog> & SingleAction;
export const customerAddressesUrl = (id: string, params?: CustomerAddressesUrlQueryParams) =>
  customerAddressesPath(encodeURIComponent(id)) + '?' + stringifyQs(params);
