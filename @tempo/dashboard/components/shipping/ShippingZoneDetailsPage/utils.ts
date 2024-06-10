import type { ShippingZoneQuery } from '@tempo/api/generated/graphql';
import { mapMetadataItemToInput } from '@tempo/dashboard/oldSrc/utils/maps';

import type { ShippingZoneUpdateFormData } from './types';

export const getInitialFormData = (
  shippingZone?: ShippingZoneQuery['shippingZone']
): ShippingZoneUpdateFormData => ({
  description: shippingZone?.description || '',
  metadata: shippingZone?.metadata?.map(mapMetadataItemToInput),
  name: shippingZone?.name || '',
  privateMetadata: shippingZone?.privateMetadata?.map(mapMetadataItemToInput),
  warehouses: shippingZone?.warehouses?.map((warehouse) => warehouse.id) || [],
  channels: shippingZone?.channels.map(({ id }) => id) || [],
});
