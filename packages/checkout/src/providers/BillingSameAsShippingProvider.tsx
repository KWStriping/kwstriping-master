import type { ReactNode, FC } from 'react';
import { createContext, useState } from 'react';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';

interface BillingSameAsShippingContextConsumerProps {
  isBillingSameAsShippingAddress: boolean;
  setIsBillingSameAsShippingAddress: (value: boolean) => void;
  hasBillingSameAsShippingAddressChanged: boolean;
  setHasBillingSameAsShippingAddressChanged: (value: boolean) => void;
}

export const BillingSameAsShippingContext = createContext(
  {} as BillingSameAsShippingContextConsumerProps
);

export const BillingSameAsShippingProvider: FC<{
  children: ReactNode;
}> = ({ children }) => {
  const { checkout } = useCheckout();

  const [isBillingSameAsShippingAddress, setIsBillingSameAsShippingAddress] = useState(
    !checkout?.billingAddress
  );

  const [
    hasBillingSameAsShippingAddressChanged,
    setHasBillingSameAsShippingAddressChanged,
  ] = useState(false);

  const providerValues: BillingSameAsShippingContextConsumerProps = {
    isBillingSameAsShippingAddress,
    setIsBillingSameAsShippingAddress,
    hasBillingSameAsShippingAddressChanged,
    setHasBillingSameAsShippingAddressChanged,
  };

  return (
    <BillingSameAsShippingContext.Provider value={providerValues}>
      {children}
    </BillingSameAsShippingContext.Provider>
  );
};
