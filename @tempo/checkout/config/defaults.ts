import type {
  CustomizationSettingsValues,
  PaymentProviderSettingsValues,
  PrivateSettingsValues,
  PublicSettingsValues,
} from '@tempo/checkout/types/api';
import type { ChannelActivePaymentProvidersByChannel } from '@tempo/checkout/types/payments-api';

export const defaultActiveChannelPaymentProviders: ChannelActivePaymentProvidersByChannel = {
  applePay: '',
  creditCard: '',
  // paypal: '',
  // dropin: '',
  dummy: 'dummy',
};

export const defaultPaymentProviderSettings: PaymentProviderSettingsValues<'unencrypted'> = {
  mollie: {
    apiKey: '',
    profileId: '',
  },
  adyen: {
    merchantAccount: '',
    clientKey: '',
    apiKey: '',
    hmac: '',
    password: '',
    username: '',
  },
  stripe: {
    publishableKey: '',
    secretKey: '',
    webhookSecret: '',
  },
  dummy: {
    dummyKey: '',
  },
};

export const defaultCustomizationSettings: CustomizationSettingsValues = {
  branding: {
    buttonBgColorPrimary: '#394052',
    buttonBgColorHover: '#FAFAFA',
    borderColorPrimary: '#394052',
    errorColor: '#B65757',
    successColor: '#2C9B2A',
    buttonTextColor: '#ffffff',
    textColor: '#000000',
    logoUrl: '',
  },
  productSettings: {
    lowStockThreshold: '',
  },
};

export const defaultPublicSettings: PublicSettingsValues = {
  customizations: defaultCustomizationSettings,
  channelActivePaymentProviders: {},
};
export const defaultPrivateSettings: PrivateSettingsValues<'unencrypted'> = {
  paymentProviders: defaultPaymentProviderSettings,
};
