import type { TimePeriodType } from '@core/api/constants';

export interface GiftCardSettingsFormData {
  expiryPeriodActive: boolean;
  expiryPeriodType: TimePeriodType;
  expiryPeriodAmount: number;
}
