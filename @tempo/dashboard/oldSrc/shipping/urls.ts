import { assert } from 'tsafe/assert';
import urlJoin from 'url-join';

import type { ShippingMethod } from '@tempo/api/generated/constants';
import type { BulkAction, Dialog, Pagination, SingleAction } from '../types';
import type { ChannelsAction } from '@tempo/dashboard/oldSrc/channels/urls';

export const shippingSection = '/shipping/';

export const shippingZonesListPath = shippingSection;
export type ShippingZonesListUrlDialog = 'remove' | 'remove-many';
export type ShippingZonesListUrlQueryParams = BulkAction &
  Dialog<ShippingZonesListUrlDialog> &
  Pagination &
  SingleAction;
export const shippingZonesListUrl = (params?: ShippingZonesListUrlQueryParams) => ({
  pathname: shippingZonesListPath,
  query: params,
});

export const shippingZonePath = (id: string) => urlJoin(shippingZonesListPath, id);
export type ShippingZoneUrlDialog =
  | 'add-rate'
  | 'add-warehouse'
  | 'assign-country'
  | 'edit-rate'
  | 'remove'
  | 'remove-rate'
  | 'unassign-country';

export type ShippingMethodActions = 'assign-product' | 'unassign-product';

export interface ShippingZoneUrlQueryParams
  extends Dialog<ShippingZoneUrlDialog>,
    SingleAction<'key'>,
    Partial<{
      type: ShippingMethod;
    }> {}

export const shippingZoneUrl = (id: string, params?: ShippingZoneUrlQueryParams) => ({
  pathname: '/shipping/[id]',
  query: { ...params, id },
});

type ZipCodeRangeActions = 'add-range' | 'remove-range';
export type ShippingRateUrlDialog =
  | ZipCodeRangeActions
  | 'remove'
  | ShippingMethodActions
  | ChannelsAction;

export type ShippingRateUrlQueryParams = Dialog<ShippingRateUrlDialog> &
  SingleAction &
  BulkAction;
export type ShippingRateCreateUrlDialog = ZipCodeRangeActions | ChannelsAction;
export type ShippingRateCreateUrlQueryParams = Dialog<ShippingRateCreateUrlDialog> &
  SingleAction &
  Partial<{
    type: ShippingMethod;
  }>;

export const shippingRateCreatePath = (id: string) => urlJoin(shippingZonePath(id), 'add');
export const shippingRateCreateUrl = (id: string, params?: ShippingRateCreateUrlQueryParams) => ({
  pathname: '/shipping/[id]/add',
  query: { id, ...params },
});

export const shippingRateEditPath = (id: string, rateId: string) =>
  urlJoin(shippingZonePath(id), rateId);
export const shippingRateEditUrl = (
  id: string,
  rateId: string,
  params?: ShippingRateUrlQueryParams
) => {
  assert(!!rateId, 'rateId is required');
  assert(!!id, 'id is required');
  return {
    pathname: '/shipping/[id]/rates/[rateId]',
    query: { ...params, id, rateId },
  };
};

export const shippingZoneAddPath = urlJoin(shippingZonesListPath, 'add');
export const shippingZoneAddUrl = shippingZoneAddPath + '?';
