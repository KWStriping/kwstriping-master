import { useEffect, useState } from 'react';
import type {
  ChannelActivePaymentProvidersByChannel,
  PaymentMethodID,
  PaymentProviderID,
} from '@tempo/checkout';

type AvailablePaymentMethods = PaymentMethodID[];

type PaymentProvider = PaymentProviderID | undefined | '';

export interface UsePaymentMethods {
  selectedPaymentMethod: PaymentMethodID | undefined;
  setSelectedPaymentMethod: (value: PaymentMethodID) => void;
  availablePaymentMethods: AvailablePaymentMethods;
  selectedPaymentProvider: PaymentProvider;
  isValidProviderSelected: boolean;
}

const entries = <T extends object>(obj: T) => Object.entries(obj) as [keyof T, T[keyof T]][];

const getAllPaymentMethods = (
  allPaymentMethods: ChannelActivePaymentProvidersByChannel | null | undefined
) => {
  if (!allPaymentMethods) {
    return [];
  }

  return entries(allPaymentMethods).reduce<AvailablePaymentMethods>(
    (availablePaymentMethods, [paymentMethodId, paymentProviderId]) => {
      return paymentProviderId
        ? [...availablePaymentMethods, paymentMethodId]
        : availablePaymentMethods;
    },
    [] as AvailablePaymentMethods
  );
};

export const usePaymentMethods = (channelId?: string) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    PaymentMethodID | undefined
  >();

  const [{ data: allPaymentMethods, fetching: loading }] = [] as any; // TODO

  const availablePaymentMethods = getAllPaymentMethods(allPaymentMethods as any); // TODO

  useEffect(() => {
    if (!loading && allPaymentMethods && !availablePaymentMethods.length) {
      throw new Error('No available payment providers');
    }
  }, [loading, allPaymentMethods, availablePaymentMethods.length]);

  const selectedPaymentProvider =
    selectedPaymentMethod && allPaymentMethods?.[selectedPaymentMethod];

  const isValidProviderSelected = !!(selectedPaymentMethod && selectedPaymentProvider);

  return {
    isValidProviderSelected,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    availablePaymentMethods,
    selectedPaymentProvider,
  };
};
