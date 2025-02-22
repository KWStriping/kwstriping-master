import type { AddressFragment } from '@tempo/api/generated/graphql';
import type { AddressFormData } from '@tempo/types/addresses';
import { getAddressFormDataFromAddress, isMatchingAddress } from '@tempo/utils';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

type MaybeAddress = AddressFragment | null | undefined;

interface UseSetBillingSameAsShippingProps {
  handleSubmit: (address: AddressFormData) => void;
}

export const useSetBillingSameAsShipping = ({
  handleSubmit,
}: UseSetBillingSameAsShippingProps) => {
  const { checkout } = useCheckout();
  const { billingAddress, shippingAddress } = checkout ?? {};

  const [passDefaultFormDataAddress, setPassDefaultFormDataAddress] =
    useState<boolean>(!!billingAddress);

  const hasBillingSameAsShipping = isMatchingAddress(shippingAddress, billingAddress);

  const [isBillingSameAsShipping, setIsBillingSameAsShipping] = useState<boolean>(
    checkout?.isShippingRequired ? !billingAddress || hasBillingSameAsShipping : false
  );
  const isBillingSameAsShippingRef = useRef<boolean>(isBillingSameAsShipping);
  const shippingAddressRef = useRef<MaybeAddress>(shippingAddress);

  const setBillingSameAsShipping = useCallback(async () => {
    if (!hasBillingSameAsShipping && shippingAddress) {
      void handleSubmit({
        ...getAddressFormDataFromAddress(shippingAddress),
        autoSave: true,
      });
    }
  }, [handleSubmit, hasBillingSameAsShipping, shippingAddress]);

  useEffect(() => {
    const billingSetDifferentThanShipping =
      !isBillingSameAsShipping && isBillingSameAsShippingRef.current;

    if (billingSetDifferentThanShipping) {
      setPassDefaultFormDataAddress(false);
      isBillingSameAsShippingRef.current = isBillingSameAsShipping;
    }
  }, [isBillingSameAsShipping]);

  useEffect(() => {
    if (!isBillingSameAsShipping) return;

    const billingSetSameAsShipping =
      isBillingSameAsShipping && !isBillingSameAsShippingRef.current;

    const hasShippingAddressChanged =
      shippingAddress && shippingAddress !== shippingAddressRef.current;

    if (hasShippingAddressChanged || billingSetSameAsShipping) {
      void setBillingSameAsShipping();
      shippingAddressRef.current = shippingAddress;
      isBillingSameAsShippingRef.current = isBillingSameAsShipping;
    }
  }, [shippingAddress, isBillingSameAsShipping, setBillingSameAsShipping]);

  return {
    isBillingSameAsShipping,
    setIsBillingSameAsShipping,
    passDefaultFormDataAddress,
  };
};
