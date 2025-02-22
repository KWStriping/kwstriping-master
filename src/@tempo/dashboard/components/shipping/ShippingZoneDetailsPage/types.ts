import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';

export interface ShippingZoneUpdateFormData extends MetadataFormData {
  name: string;
  description: string;
  warehouses: string[];
  channels: string[];
}
