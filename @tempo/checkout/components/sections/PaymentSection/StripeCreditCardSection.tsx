import type {
  CreateCheckoutPaymentMutation,
  CreateCheckoutPaymentMutationVariables,
  CompleteCheckoutMutation,
  CompleteCheckoutMutationVariables,
  CheckoutFragment,
} from '@tempo/api/generated/graphql';
import {
  CreateCheckoutPaymentDocument,
  CompleteCheckoutDocument,
} from '@tempo/api/generated/graphql';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { usePaths } from '@tempo/ui/providers/PathsProvider';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js/pure';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { CompleteCheckoutButton } from '../../CompleteCheckoutButton';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';

export const STRIPE_GATEWAY = 'api.payments.stripe';

interface StripeCardFormInterface {
  checkout: CheckoutFragment;
}

function StripeCardForm({ checkout }: StripeCardFormInterface) {
  const stripe = useStripe();
  const elements = useElements();
  const { formatPrice } = useLocalization();
  const router = useRouter();
  const paths = usePaths();
  const { resetCheckoutId: resetCheckoutToken } = useCheckout();
  const [createCheckoutPaymentMutation] = useMutation(CreateCheckoutPaymentDocument);
  const [completeCheckoutMutation] = useMutation(CompleteCheckoutDocument);
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
            email: checkout.customerEmail || '',
            phone: checkout.billingAddress.phone || '',
            name: `${checkout.billingAddress.firstName} ${checkout.billingAddress.lastName}`,
            address: {
              line1: checkout.billingAddress.streetAddress1,
              city: checkout.billingAddress.city,
              country: checkout.billingAddress.country.code,
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
    const { errors: paymentCreateErrors } = await createCheckoutPaymentMutation({
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
    const { data: completeData, errors: completeErrors } = await completeCheckoutMutation({
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
      const { data: confirmedCompleteData, errors: confirmedCompleteErrors } =
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
        disabled={!stripe || !elements || isPaymentProcessing}
      >
        {payLabel}
      </CompleteCheckoutButton>
    </form>
  );
}

interface StripeCreditCardSectionInterface {
  checkout: CheckoutFragment;
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
