import type { GiftCardErrorFragment } from '@tempo/api/generated/graphql';
import type { GiftCardCreateFormData } from './GiftCardCreateDialogForm';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

export type GiftCardExpiryType = 'EXPIRY_DATE' | 'EXPIRY_PERIOD';

export interface GiftCardCreateFormCustomer {
  name: string;
  email: string;
}

export type GiftCardCreateCommonFormErrors = Record<
  'tags' | 'expiryDate' | 'currency' | 'amount' | 'balance',
  GiftCardErrorFragment
>;

export type GiftCardCreateFormErrors = GiftCardCreateCommonFormErrors &
  Record<'customer', GiftCardErrorFragment>;

export interface GiftCardCreateFormCommonProps {
  change: FormChange;
  toggleValue: FormChange;
  errors: GiftCardCreateFormErrors;
  data: GiftCardCreateFormData;
}
