import type { ChannelShippingZonesQuery, WarehouseFragment } from '@core/api/graphql';
import type { RelayToFlat } from '@dashboard/oldSrc/types';

export type ChannelShippingZones = RelayToFlat<
  NonNullable<ChannelShippingZonesQuery['shippingZones']>
>;

export type ChannelShippingZone = ChannelShippingZones[0];

export type ChannelWarehouses = WarehouseFragment[];

export type WarehouseChannelListing = ChannelWarehouses[0];
