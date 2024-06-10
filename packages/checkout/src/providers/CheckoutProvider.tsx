import type { CheckoutFragment } from '@core/api';
import { CheckoutDocument } from '@core/api';
import { useUser } from '@core/auth/react/hooks';
import { useLocale } from '@core/ui/hooks/useLocale';
import { useQuery } from '@core/urql/hooks/useQuery';
import { createContext, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useCheckoutId } from '@core/checkout/hooks/state';

export interface CheckoutConsumerProps<Required extends boolean = false> {
  checkoutId: Maybe<string>;
  setCheckoutId: (id: string) => void;
  resetCheckoutId: () => void;
  checkout: Required extends true ? CheckoutFragment : CheckoutFragment | undefined | null;
  checkoutError: Error | undefined;
  loading: boolean;
}

const CheckoutContext = createContext({} as CheckoutConsumerProps);

interface CheckoutProviderProps {
  children: ReactNode;
}

export function CheckoutProvider({ children }: CheckoutProviderProps) {
  const { languageCode } = useLocale();
  const { authenticated, user } = useUser();
  const [checkoutId, setCheckoutId] = useCheckoutId();

  // TODO: get checkout from db if not in localstorage
  const [{ data, fetching, error: checkoutError }, refetch] = useQuery(CheckoutDocument, {
    variables: { id: checkoutId as string, languageCode },
    pause: !checkoutId || !!user?.checkout,
  });

  useEffect(() => {
    if (authenticated && user) {
      if (user.checkout) {
        setCheckoutId(null);
      } else if (checkoutId) {
        // TODO: associate checkout with user!
        refetch();
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
        loading: fetching,
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
