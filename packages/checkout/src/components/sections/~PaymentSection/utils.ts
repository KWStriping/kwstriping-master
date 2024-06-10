import type { PaymentMethodID, PaymentProviderID } from '@core/checkout/types/payments';
import type { ChannelActivePaymentProvidersByChannel } from '@core/checkout/types/payments-api';

export const getParsedPaymentMethods = (
  activePaymentProvidersByChannel: Maybe<ChannelActivePaymentProvidersByChannel>
): PaymentMethodID[] => {
  if (!activePaymentProvidersByChannel) return [];
  return Object.entries(activePaymentProvidersByChannel)
    .filter(([, paymentProviderId]) => !!paymentProviderId)
    .map(([paymentMethodId]) => paymentMethodId) as PaymentMethodID[];
};

export const getParsedPaymentProviders = (
  activePaymentProvidersByChannel: Maybe<ChannelActivePaymentProvidersByChannel>
): readonly PaymentProviderID[] => {
  if (!activePaymentProvidersByChannel) return [];
  return Object.values(activePaymentProvidersByChannel).filter(
    (paymentProviderId): paymentProviderId is Exclude<typeof paymentProviderId, ''> =>
      !!paymentProviderId
  );
};
