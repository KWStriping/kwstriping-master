import type { CheckoutFragment } from '@core/api';
import { CheckoutPaymentCreateDocument } from '@core/api';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { usePaths } from '@core/ui/providers/PathsProvider';
import { useMutation } from '@core/urql/hooks/useMutation';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';

import { CompleteCheckoutButton } from '../../CompleteCheckoutButton';

export const STRIPE_GATEWAY = 'api.payments.stripe';

interface StripeCardFormInterface {
  checkout: Maybe<CheckoutFragment>;
}

function StripeCardForm({ checkout }: StripeCardFormInterface) {
  const stripe = useStripe();
  const elements = useElements();
  const { formatPrice } = useLocalization();
  const router = useRouter();
  const paths = usePaths();
  const { resetCheckoutId: resetCheckoutToken } = useCheckout();
  const [createCheckoutPaymentMutation] = useMutation(CheckoutPaymentCreateDocument);
  const [completeCheckoutMutation] = useMutation(CheckoutCompleteDocument);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const totalPrice = checkout.totalPrice?.gross;
  const payLabel = `Pay ${formatPrice(totalPrice)}`;
  const redirectToOrderPage = () => {
    resetCheckoutToken();

    void router.push(paths.order());
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsPaymentProcessing(true);

    if (elements === null || stripe === null) {
      setIsPaymentProcessing(false);

      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error('Card element not initialized');
      setIsPaymentProcessing(false);
      return;
    }

    // Create Stripe payment
    const paymentMethodResult = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: checkout.billingAddress
        ? {
            email: checkout.email || '',
            phone: checkout.billingAddress.phone || '',
            name: `${checkout.billingAddress.firstName} ${checkout.billingAddress.lastName}`,
            address: {
              line1: checkout.billingAddress.streetAddress1,
              city: checkout.billingAddress.city,
              countryCode: checkout.billingAddress.country.code,
              postal_code: checkout.billingAddress.postalCode,
            },
          }
        : undefined,
    });

    if (paymentMethodResult.error || !paymentMethodResult.paymentMethod) {
      console.error('[error]', paymentMethodResult.error);
      setIsPaymentProcessing(false);
      return;
    }

    // Send Stripe payment data to the Tempo
    const { error: paymentCreateErrors } = await createCheckoutPaymentMutation({
      checkoutId: checkout.id,
      paymentInput: {
        gateway: 'api.ments.stripe',
        amount: checkout.totalPrice?.gross.amount.toString(),
        token: paymentMethodResult.paymentMethod.id,
      },
    });

    if (paymentCreateErrors) {
      console.error(paymentCreateErrors);
      setIsPaymentProcessing(false);
      return;
    }

    // Try to complete the checkout
    const { data: completeData, error: completeErrors } = await completeCheckoutMutation({
      checkoutId: checkout.id,
    });
    if (completeErrors) {
      console.error('complete errors:', completeErrors);
      setIsPaymentProcessing(false);
      return;
    }

    let order = completeData?.completeCheckout?.order;

    // Additional payment action is needed (ex. 3D Secure)
    if (completeData?.completeCheckout?.confirmationNeeded) {
      // Parse data for the Stripe
      const confirmationData = JSON.parse(
        completeData?.completeCheckout?.confirmationData || ''
      ) as { client_secret: string };

      // Execute additional action at Stripe
      const stripeConfirmationResponse = await stripe.confirmCardPayment(
        confirmationData.client_secret,
        {
          payment_method: paymentMethodResult.paymentMethod.id,
        }
      );

      if (stripeConfirmationResponse.error) {
        console.error('Stripe payment confirmation error: ', stripeConfirmationResponse.error);
        setIsPaymentProcessing(false);
        return;
      }

      // Try to complete checkout
      const { data: confirmedCompleteData, error: confirmedCompleteErrors } =
        await completeCheckoutMutation({
          checkoutId: checkout.id,
        });

      if (confirmedCompleteErrors) {
        console.error(
          'Errors during checkout completion after the confirmation: ',
          confirmedCompleteErrors
        );
        setIsPaymentProcessing(false);
        return;
      }
      order = confirmedCompleteData?.completeCheckout?.order;
    }

    // If there are no errors during payment and confirmation, order should be created
    if (order) {
      redirectToOrderPage();
    } else {
      console.error('Order was not created');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <CompleteCheckoutButton
        isProcessing={isPaymentProcessing}
        isDisabled={!stripe || !elements || isPaymentProcessing}
      >
        {payLabel}
      </CompleteCheckoutButton>
    </form>
  );
}

interface StripeCreditCardSectionInterface {
  checkout: Maybe<CheckoutFragment>;
}

export function StripeCreditCardSection({ checkout }: StripeCreditCardSectionInterface) {
  const stripeGateway = checkout.availablePaymentGateways.find(
    (gateway) => gateway.id === STRIPE_GATEWAY
  );
  const stripeApiKey = stripeGateway?.config.find((conf) => conf.field === 'api_key')?.value;

  if (!stripeApiKey) {
    return (
      <div className="py-8">
        <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
        <p>Stripe cannot be initialized - missing configuration</p>
      </div>
    );
  }
  const stripePromise = loadStripe(stripeApiKey);

  return (
    <div className="py-8">
      <Elements stripe={stripePromise}>
        <StripeCardForm checkout={checkout} />
      </Elements>
    </div>
  );
}

export default StripeCreditCardSection;
