import type { GiftCardSettingsFormData } from './types';
import { GiftCardSettingsExpiryType } from '@core/api/constants';
import type { GiftCardSettingsUpdateInput } from '@core/api/graphql';

export const getGiftCardSettingsInputData = ({
  expiryPeriodActive,
  expiryPeriodType,
  expiryPeriodAmount,
}: Pick<
  GiftCardSettingsFormData,
  'expiryPeriodActive' | 'expiryPeriodType' | 'expiryPeriodAmount'
>): GiftCardSettingsUpdateInput => {
  const expiryType = expiryPeriodActive
    ? GiftCardSettingsExpiryType.ExpiryPeriod
    : GiftCardSettingsExpiryType.NeverExpire;

  const expiryPeriod =
    expiryPeriodActive && expiryPeriodType && expiryPeriodAmount
      ? {
          type: expiryPeriodType,
          amount: expiryPeriodAmount,
        }
      : undefined;

  return {
    expiryType,
    expiryPeriod,
  };
};
