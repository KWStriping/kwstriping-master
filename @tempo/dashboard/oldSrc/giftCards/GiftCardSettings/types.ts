import type { TimePeriodType } from '@tempo/api/generated/constants';

export interface GiftCardSettingsFormData {
  expiryPeriodActive: boolean;
  expiryPeriodType: TimePeriodType;
  expiryPeriodAmount: number;
}
