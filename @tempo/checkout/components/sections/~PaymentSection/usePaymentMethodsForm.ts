import { useCallback, useEffect, useState } from 'react';
import { usePaymentMethods } from '@tempo/checkout/hooks/usePaymentMethods';
import type { PaymentMethodID } from '@tempo/checkout/types/payments';

export const usePaymentMethodsForm = () => {
  const setPaymentData = (data: any) => null;

  // possibly change to form once we switch to formik
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodID | null>(
    null
  );

  const {
    methods: availablePaymentMethods,
    providers: availablePaymentProviders,
    // activePaymentProvidersByChannel,
    loading,
  } = usePaymentMethods('default'); // TODO

  const handleSelect = useCallback(
    (paymentMethod: PaymentMethodID) => {
      setSelectedPaymentMethod(paymentMethod);
      setPaymentData({
        paymentMethod,
      });
    },
    [setPaymentData]
  );

  const firstAvailableMethod = availablePaymentMethods[0];

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!availablePaymentMethods.length) {
      throw new Error('No available payment providers');
    } else if (!selectedPaymentMethod && firstAvailableMethod) {
      handleSelect(firstAvailableMethod);
    }
  }, [
    loading,
    availablePaymentMethods.length,
    selectedPaymentMethod,
    handleSelect,
    firstAvailableMethod,
  ]);

  return {
    onSelectPaymentMethod: handleSelect,
    availablePaymentMethods,
    availablePaymentProviders,
    selectedPaymentMethod,
  };
};
