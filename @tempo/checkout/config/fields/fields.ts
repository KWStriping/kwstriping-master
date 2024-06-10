import * as m from '@paraglide/messages';
import AppleIcon from '@mui/icons-material/Apple';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import type {
  Customization,
  CustomizationSettings,
  SettingID,
  CustomizationID,
} from '@tempo/checkout/types/common';
import type {
  PaymentMethod,
  PaymentProvider,
  PaymentProviderSettings,
  PaymentProviderID,
} from '@tempo/checkout/types/payments';
import AdyenIcon from './icons/Adyen';
import DummyIcon from './icons/Dummy';
import MollieIcon from './icons/Mollie';
import StripeIcon from './icons/Stripe';
import {
  brandingCustomizationMessages,
  customizationMessages,
  sectionsCustomizationMessages,
} from './messages/customization';
import { paymentMethodsMessages } from './messages/paymentMethods';
import {
  adyenPaymentProviderMessages,
  molliePaymentProviderMessages,
  paymentProvidersMessages,
  stripePaymentProviderMessages,
} from './messages/paymentProviders';
import { withLabels, withNames } from './utils';

const paymentMethods: Omit<PaymentMethod, 'name'>[] = [
  {
    id: 'creditCard',
    logo: CreditCardIcon,
  },
  {
    id: 'applePay',
    logo: AppleIcon,
  },
  // {
  //   id: 'paypal',
  //   logo: PayPalIcon,
  // },
  {
    id: 'dummy',
    logo: DummyIcon,
  },
];

const molliePaymentProvider: Omit<PaymentProviderSettings<'mollie'>, 'label'>[] = [
  {
    id: 'profileId',
    type: 'string',
    encrypt: false,
  },
  {
    id: 'apiKey',
    type: 'string',
    encrypt: true,
  },
];

const adyenPaymentProvider: Omit<PaymentProviderSettings<'adyen'>, 'label'>[] = [
  {
    id: 'merchantAccount',
    type: 'string',
    encrypt: false,
  },
  {
    id: 'apiKey',
    type: 'string',
    encrypt: true,
  },
  {
    id: 'hmac',
    type: 'string',
    encrypt: true,
  },
  {
    id: 'username',
    type: 'string',
    encrypt: true,
  },
  {
    id: 'password',
    type: 'string',
    encrypt: true,
  },
  {
    id: 'clientKey',
    type: 'string',
    encrypt: false,
  },
];

const stripePaymentProvider: Omit<PaymentProviderSettings<'stripe'>, 'label'>[] = [
  {
    id: 'publishableKey',
    type: 'string',
    encrypt: false,
  },
  {
    id: 'secretKey',
    type: 'string',
    encrypt: true,
  },
  {
    id: 'webhookSecret',
    type: 'string',
    encrypt: true,
  },
];

const brandingCustomization: Omit<CustomizationSettings<'branding'>, 'label'>[] = [
  {
    id: 'buttonBgColorPrimary',
    type: 'color',
  },
  {
    id: 'buttonBgColorHover',
    type: 'color',
  },
  {
    id: 'borderColorPrimary',
    type: 'color',
  },
  {
    id: 'errorColor',
    type: 'color',
  },
  {
    id: 'successColor',
    type: 'color',
  },
  {
    id: 'buttonTextColor',
    type: 'color',
  },
  {
    id: 'textColor',
    type: 'color',
  },
  {
    id: 'logoUrl',
    type: 'image',
  },
];

const sectionsCustomization: Omit<CustomizationSettings<'productSettings'>, 'label'>[] = [
  {
    id: 'lowStockThreshold',
    type: 'string',
  },
];

const channelActivePaymentProvidersFields: Record<'anyChannel', any> = {
  anyChannel: paymentMethods,
};
const customizationsFields: Record<CustomizationID, any> = {
  branding: brandingCustomization,
  productSettings: sectionsCustomization,
};
const paymentProviderFields: Record<PaymentProviderID, any> = {
  mollie: molliePaymentProvider,
  adyen: adyenPaymentProvider,
  stripe: stripePaymentProvider,
  dummy: {},
};

export type CommonField = { id: string } & Record<string, any>;
export const fields: Record<SettingID[number], Record<string, CommonField[]>> = {
  channelActivePaymentProviders: channelActivePaymentProvidersFields,
  customizations: customizationsFields,
  paymentProviders: paymentProviderFields,
};

export const usePaymentMethods = (): PaymentMethod[] => {

  return withNames(t, paymentMethodsMessages, paymentMethods);
};

export const useMolliePaymentProvider = (): PaymentProvider<'mollie'> => {

  return {
    id: 'mollie',
    label: (m[paymentProvidersMessages.mollie.id] ?? paymentProvidersMessages.mollie.defaultMessage),
    logo: MollieIcon,
    settings: withLabels(t, molliePaymentProviderMessages, molliePaymentProvider),
  };
};

export const useAdyenPaymentProvider = (): PaymentProvider<'adyen'> => {

  return {
    id: 'adyen',
    label: (m[paymentProvidersMessages.adyen.id] ?? paymentProvidersMessages.adyen.defaultMessage),
    logo: AdyenIcon,
    settings: withLabels(t, adyenPaymentProviderMessages, adyenPaymentProvider),
  };
};

export const useStripePaymentProvider = (): PaymentProvider<'stripe'> => {

  return {
    id: 'stripe',
    label: (m[paymentProvidersMessages.stripe.id] ?? paymentProvidersMessages.stripe.defaultMessage),
    logo: StripeIcon,
    settings: withLabels(t, stripePaymentProviderMessages, stripePaymentProvider),
  };
};

export const useDummyPaymentProvider = (): PaymentProvider<'dummy'> => {

  return {
    id: 'dummy',
    label: (m[paymentProvidersMessages.dummy.id] ?? paymentProvidersMessages.dummy.defaultMessage),
    settings: [],
  };
};

export const usePaymentProviders = (): PaymentProvider<PaymentProviderID>[] => [
  useMolliePaymentProvider(),
  useAdyenPaymentProvider(),
  useStripePaymentProvider(),
];

export const useBrandingCustomization = (): Customization<'branding'> => {

  return {
    id: 'branding',
    label: (m[customizationMessages.branding.id] ?? customizationMessages.branding.defaultMessage),
    settings: withLabels(t, brandingCustomizationMessages, brandingCustomization),
  };
};

export const useSectionsCustomization = (): Customization<'productSettings'> => {

  return {
    id: 'productSettings',
    label: (m[customizationMessages.productSettings.id] ?? customizationMessages.productSettings.defaultMessage),
    settings: withLabels(t, sectionsCustomizationMessages, sectionsCustomization),
  };
};

export const useCustomizations = () => [
  useBrandingCustomization(),
  useSectionsCustomization(),
];
