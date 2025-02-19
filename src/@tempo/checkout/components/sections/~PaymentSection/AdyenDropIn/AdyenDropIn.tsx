import type AdyenCheckout from '@adyen/adyen-web';
import type { PaymentResponse as AdyenWebPaymentResponse } from '@adyen/adyen-web/dist/types/components/types';
import type { CheckoutFragment } from '@tempo/api/generated/graphql';
import { useCheckout, useFetch } from '@tempo/checkout/hooks';
import { useAlerts } from '@tempo/ui/hooks';
import { memo, useEffect, useRef, useLayoutEffect, useCallback } from 'react';
import type {
  AdyenCheckoutInstanceOnAdditionalDetails,
  AdyenCheckoutInstanceOnSubmit,
} from './createAdyenCheckout';
import { createAdyenCheckoutInstance, handlePaymentResult } from './createAdyenCheckout';
import { CHECKOUT_API_URL } from '@tempo/checkout/constants';
import {
  createDropInAdyenPayment,
  createDropInAdyenSession,
  handleDropInAdyenPaymentDetails,
} from '@tempo/checkout/fetch/requests';

type AdyenCheckoutInstance = Awaited<ReturnType<typeof AdyenCheckout>>;

interface AdyenDropInProps {}

// https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
export const useEvent = <Args extends unknown[], R>(handler: (...args: Args) => R) => {
  const handlerRef = useRef<null | ((...args: Args) => R)>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  });

  return useCallback((...args: Args) => {
    return handlerRef.current?.(...args) as R;
  }, []);
};

// fake function just to get the type because can't import it :(
const _hack = (adyenCheckout: AdyenCheckoutInstance) =>
  adyenCheckout.create('dropin').mount('#dropin-container');
type DropinElement = ReturnType<typeof _hack>;

export const AdyenDropIn = memo<AdyenDropInProps>(({}) => {
  const { checkout, loading: isCheckoutLoading } = useCheckout();

  const { showCustomErrors } = useAlerts('checkoutPay');

  const [, fetchCreateDropInAdyenPayment] = useFetch(createDropInAdyenPayment, {
    skip: true,
  });
  const [, fetchHandleDropInAdyenPaymentDetails] = useFetch(handleDropInAdyenPaymentDetails, {
    skip: true,
  });

  const onSubmit: AdyenCheckoutInstanceOnSubmit = useEvent(async (state, component) => {
    if (!checkout) return;
    component.setStatus('loading');

    const result = await fetchCreateDropInAdyenPayment({
      checkoutApiUrl: CHECKOUT_API_URL,
      totalAmount: checkout.totalPrice.gross.amount,
      id: checkout.id,
      method: 'dropin',
      provider: 'adyen',
      redirectUrl: window.location.href,
      adyenStateData: state.data,
    });

    if (!result || 'message' in result) {
      console.error('result:', result);
      showCustomErrors([{ message: result?.message || 'Something went wrong…' }]);
      component.setStatus('ready');
      return;
    }

    if (result.payment.action) {
      component.handleAction(
        // discrepancy between adyen-api and adyen-web types 🤦‍♂️
        result.payment.action as unknown as Exclude<AdyenWebPaymentResponse['action'], undefined>
      );
      return;
    } else {
      return handlePaymentResult(result, component);
    }
  });

  const onAdditionalDetails: AdyenCheckoutInstanceOnAdditionalDetails = useEvent(
    async (state, component) => {
      const result = await fetchHandleDropInAdyenPaymentDetails({
        checkoutApiUrl: CHECKOUT_API_URL,
        adyenStateData: state.data,
      });
      if (!result || 'message' in result) {
        console.error('result:', result);
        showCustomErrors([{ message: result?.message || 'Something went wrong…' }]);
        component.setStatus('ready');
        return;
      }

      return handlePaymentResult(result, component);
    }
  );

  const { dropinContainerElRef } = useDropinAdyenElement(
    CHECKOUT_API_URL,
    checkout || null,
    isCheckoutLoading,
    onSubmit,
    onAdditionalDetails
  );

  return <div ref={dropinContainerElRef} />;
});
AdyenDropIn.displayName = 'AdyenDropIn';

function useDropinAdyenElement(
  checkoutApiUrl: string,
  checkout: CheckoutFragment | null,
  isCheckoutLoading: boolean,
  onSubmit: AdyenCheckoutInstanceOnSubmit,
  onAdditionalDetails: AdyenCheckoutInstanceOnAdditionalDetails
) {
  const dropinContainerElRef = useRef<HTMLDivElement | null>(null);
  const dropinComponentRef = useRef<DropinElement | null>(null);

  const [adyenSessionResponse] = useFetch(createDropInAdyenSession, {
    args: {
      checkoutApiUrl,
      checkoutId: checkout?.id,
      // we send 0 here and update it later inside `onSubmit`
      totalAmount: 0,
      currency: checkout?.totalPrice?.gross?.currency,
      provider: 'adyen',
      method: 'dropin',
      redirectUrl: window.location.href,
    },
    skip: isCheckoutLoading,
  });

  useEffect(() => {
    if (
      !dropinContainerElRef.current ||
      !adyenSessionResponse.data ||
      'message' in adyenSessionResponse.data
    ) {
      return;
    }

    createAdyenCheckoutInstance(adyenSessionResponse.data, {
      onSubmit,
      onAdditionalDetails,
    })
      .then((adyenCheckout) => {
        dropinComponentRef.current = adyenCheckout
          .create('dropin')
          .mount(dropinContainerElRef?.current as HTMLDivElement);
      })
      .catch(console.error);

    return () => {
      dropinComponentRef.current?.unmount();
    };
  }, [adyenSessionResponse.data, onAdditionalDetails, onSubmit]);

  return { dropinContainerElRef };
}
