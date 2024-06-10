import type { ChannelShippingZonesQuery, WarehouseFragment } from '@tempo/api/generated/graphql';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';

export type ChannelShippingZones = RelayToFlat<
  NonNullable<ChannelShippingZonesQuery['shippingZones']>
>;

export type ChannelShippingZone = ChannelShippingZones[0];

export type ChannelWarehouses = WarehouseFragment[];

export type WarehouseChannelListing = ChannelWarehouses[0];
