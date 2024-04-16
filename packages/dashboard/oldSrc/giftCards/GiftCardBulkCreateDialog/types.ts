import type { GiftCardExpiryType } from '../GiftCardCreateDialog/types';
import type { GiftCardErrorFragment, TimePeriodType } from '@core/api/constants';
import type { FormChange } from '@dashboard/hooks/useForm';

export type GiftCardErrorKey =
  | 'tags'
  | 'expiryDate'
  | 'currency'
  | 'expiryPeriod'
  | 'amount'
  | 'balance'
  | 'count';

export const createGiftCardsErrorKeys: GiftCardErrorKey[] = [
  'tags',
  'expiryDate',
  'currency',
  'amount',
  'balance',
  'count',
];

export interface GiftCardBulkCreateFormData extends GiftCardCreateCommonFormData {
  cardsAmount: number;
}

export type GiftCardBulkCreateFormError = Pick<GiftCardErrorFragment, 'code' | 'field'>;

export type GiftCardBulkCreateFormErrors = Partial<
  Record<GiftCardErrorKey, GiftCardBulkCreateFormError>
>;

export interface GiftCardBulkCreateFormCommonProps {
  change: FormChange;
  toggleValue: FormChange;
  errors: GiftCardBulkCreateFormErrors;
  data: GiftCardBulkCreateFormData;
}

export interface GiftCardCreateCommonFormData {
  expirySelected: boolean;
  expiryType: GiftCardExpiryType;
  expiryPeriodType: TimePeriodType;
  expiryPeriodAmount: number;
  requiresActivation: boolean;
  tags: string[];
  balanceAmount: number;
  balanceCurrency: string;
  expiryDate: string;
}

export interface GiftCardBulkCreateFormData extends GiftCardCreateCommonFormData {
  cardsAmount: number;
}
