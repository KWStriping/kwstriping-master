import type { OutputData } from '@editorjs/editorjs';
import type { ShippingMethod } from '@tempo/api/generated/constants';
import type { MetadataFormData } from '@tempo/dashboard/components/core/Metadata';
import type { ChannelShippingData } from '@tempo/dashboard/oldSrc/channels/utils';

export interface ShippingZoneRateCommonFormData {
  channelListings: ChannelShippingData[];
  name: string;
  description: OutputData | null;
  orderValueRestricted: boolean;
  minValue: string;
  maxValue: string;
  minDays: string;
  maxDays: string;
  type: ShippingMethod;
  taxClassId: string;
}

export type ShippingZoneRateUpdateFormData = ShippingZoneRateCommonFormData & MetadataFormData;
