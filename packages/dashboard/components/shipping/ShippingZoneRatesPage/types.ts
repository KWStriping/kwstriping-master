import type { OutputData } from '@editorjs/editorjs';
import type { MetadataFormData } from '@dashboard/components/core/Metadata';
import type { ShippingMethod } from '@core/api/constants';
import type { ChannelShippingData } from '@dashboard/oldSrc/channels/utils';

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
