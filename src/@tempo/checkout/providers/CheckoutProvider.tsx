'use client';

import type { CheckoutFragment } from '@tempo/api/generated/graphql';
import { CheckoutDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useQuery } from '@tempo/api/hooks/useQuery';
import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useCheckoutId } from '@tempo/checkout/hooks/state';

export interface CheckoutConsumerProps<Required extends boolean = false> {
  checkoutId: Maybe<string>;
  setCheckoutId: (id: string) => void;
  resetCheckoutId: () => void;
  checkout: Required extends true ? CheckoutFragment : CheckoutFragment | undefined | null;
  checkoutError: Error | undefined;
}

const CheckoutContext = createContext({} as CheckoutConsumerProps);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  // const { languageCode } = useLocale();
  const { authenticated, user } = useUser();
  const [checkoutId, setCheckoutId] = useCheckoutId();

  // TODO: get checkout from db if not in localstorage
  const {
    data,
    error: checkoutError,
    fetchMore: refetch,
  } = useQuery(CheckoutDocument, {
    variables: { id: checkoutId as string },
    skip: !checkoutId || !!user?.checkout,
  });

  useEffect(() => {
    if (authenticated && user) {
      if (user.checkout) {
        setCheckoutId(null);
      } else if (checkoutId) {
        // TODO: associate checkout with user!
        refetch({ variables: { id: checkoutId as string } });
      }
    }
  }, [authenticated, user, checkoutId, setCheckoutId, refetch]);

  useEffect(() => {
    if (checkoutId && checkoutError) {
      console.error(checkoutError);
      setCheckoutId(null);
    }
  }, [checkoutId, checkoutError, setCheckoutId]);

  const resetCheckoutId = () => setCheckoutId(null);
  // console.log('CheckoutProvider', { checkoutId, data, fetching, checkoutError });

  const checkout = user?.checkout ?? data?.checkout;

  return (
    <CheckoutContext.Provider
      value={{
        checkoutId,
        setCheckoutId,
        resetCheckoutId,
        checkout,
        checkoutError,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export default CheckoutProvider;

const useCheckoutContext = () => useContext(CheckoutContext);

export function useCheckout() {
  return useCheckoutContext();
}
