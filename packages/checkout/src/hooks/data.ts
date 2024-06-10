import type { ChannelFragment } from '@core/api';
import { findById } from '@core/utils';
import {
  useCustomizations,
  useDummyPaymentProvider,
  usePaymentMethods,
  usePaymentProviders,
} from '@core/checkout/config/fields';
import type {
  ChannelActivePaymentProviders,
  ChannelPaymentOptions,
  UnknownPrivateSettingsValues,
  UnknownPublicSettingsValues,
} from '@core/checkout/types/api';
import type {
  Customization,
  CustomizationID,
  CustomizationSettings,
} from '@core/checkout/types/common';
import type {
  PaymentProvider,
  PaymentProviderID,
  PaymentProviderSettings,
} from '@core/checkout/types/payments';

export const useCustomizationSettings = (
  settingsValues: UnknownPublicSettingsValues
): Customization<CustomizationID>[] => {
  const customizations = useCustomizations();
  return customizations.map((customization) => ({
    ...customization,
    settings: customization.settings.map((setting: CustomizationSettings<CustomizationID>) => ({
      ...setting,
      value: settingsValues[customization.id]![setting.id]!, // TODO
    })),
  }));
};

export const usePaymentProviderSettings = (
  settingsValues: UnknownPrivateSettingsValues<'unencrypted'>
): PaymentProvider<PaymentProviderID>[] => {
  const paymentProviders = usePaymentProviders();
  return paymentProviders.map((provider) => ({
    ...provider,
    settings: provider.settings.map((setting: PaymentProviderSettings<PaymentProviderID>) => ({
      ...setting,
      value: settingsValues[provider.id]![setting.id]!, // TODO
    })),
  }));
};

export const useChannelPaymentOptionsList = (
  channels: ChannelFragment[],
  activePaymentProviders?: ChannelActivePaymentProviders
): ChannelPaymentOptions[] => {
  const paymentMethods = usePaymentMethods();
  const paymentProviders = usePaymentProviders();
  const dummyPaymentProvider = useDummyPaymentProvider();

  return channels.map((channel) => ({
    id: channel.id,
    channel: channel,
    paymentOptions: paymentMethods.map((method) => {
      const methodProviders = method.id === 'dummy' ? [dummyPaymentProvider] : paymentProviders;
      const channelActiveProviders = activePaymentProviders?.[channel.id];
      const activeProviderId =
        channelActiveProviders?.[method.id as keyof typeof channelActiveProviders] ?? null;
      const activeProvider = activeProviderId
        ? findById(methodProviders, activeProviderId) ?? null
        : null;

      return {
        id: method.id,
        method,
        availableProviders: methodProviders,
        activeProvider,
      };
    }),
  }));
};
export const useChannelPaymentOptions = (
  channels: ChannelFragment[],
  activePaymentProviders?: ChannelActivePaymentProviders,
  channelId?: string
) =>
  useChannelPaymentOptionsList(channels, activePaymentProviders).find(
    (channelPayments) => channelPayments.channel.id === channelId
  );
