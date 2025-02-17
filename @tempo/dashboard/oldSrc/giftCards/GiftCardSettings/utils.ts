import { GiftCardSettingsExpiryType } from '@tempo/api/generated/constants';
import type { GiftCardSettingsUpdateInput } from '@tempo/api/generated/graphql';
import type { GiftCardSettingsFormData } from './types';

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
