import type { SettingType } from '@tempo/next/types/settings';

export const PAYMENT_PROVIDERS = [
  'adyen',
  // 'applePay',
  // 'braintree',
  // 'cash',
  // 'check',
  'mollie',
  'stripe',
  'dummy',
  // 'paypal',
  // 'square',
] as const;
export type PaymentProviderID = (typeof PAYMENT_PROVIDERS)[number];

export const PAYMENT_METHODS = [
  'applePay',
  'creditCard',
  // 'invoice',
  'dummy',
] as const;
export type PaymentMethodID = (typeof PAYMENT_METHODS)[number];

export interface PaymentMethod {
  id: PaymentMethodID;
  name: string;
  logo?: any; // TODO
}

export type MollieProviderSettingID = 'profileId' | 'apiKey';

export const adyenProviderSettingIDs = [
  'merchantAccount',
  'hmac',
  'username',
  'password',
  'apiKey',
  'clientKey',
] as const;
export type AdyenProviderSettingID = (typeof adyenProviderSettingIDs)[number];
export type StripeProviderSettingID = 'publishableKey' | 'secretKey' | 'webhookSecret';

export type PaymentProviderToSettings = {
  mollie: MollieProviderSettingID;
  adyen: AdyenProviderSettingID;
  stripe: StripeProviderSettingID;
  dummy: 'dummyKey';
};

export type PaymentProviderSettingID<P extends PaymentProviderID> = PaymentProviderToSettings[P];

export interface PaymentProviderSettings<P extends PaymentProviderID> {
  id: PaymentProviderSettingID<P>;
  label: string;
  type: SettingType;
  value?: string;
  encrypt: boolean;
}

export interface PaymentProvider<P extends PaymentProviderID> {
  id: P;
  label: string;
  logo?: any; // TODO
  settings: PaymentProviderSettings<P>[];
}
