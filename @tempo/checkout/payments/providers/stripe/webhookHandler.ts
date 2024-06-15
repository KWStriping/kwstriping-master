import type { TransactionCreateMutationVariables } from '@tempo/api/generated/graphql';
import { assertUnreachable } from '@tempo/utils';
import type { Stripe } from 'stripe';
import { getStripeClient } from '@tempo/checkout/payments/providers/stripe/stripeClient';
import type { StripeWebhookEvents } from '@tempo/checkout/payments/providers/stripe/stripeWebhookTypes';
import {
  getTempoAmountFromInteger,
  getTransactionAmountGetter,
} from '@tempo/checkout/payments/utils';

/**
 * https://stripe.com/docs/webhooks
 */

export const STRIPE_PAYMENT_PREFIX = 'stripe';

export const verifyStripeEventSignature = async (
  body: string | Buffer,
  signature: string,
  secret: string
) => {
  const stripeClient = await getStripeClient();
  return stripeClient.webhooks.constructEvent(body, signature, secret) as StripeWebhookEvents;
};

const getPaymentIntentFromCheckoutSession = async (checkoutSession: Stripe.Checkout.Session) => {
  if (!checkoutSession.payment_intent) return null;
  if (typeof checkoutSession.payment_intent === 'object') {
    return checkoutSession.payment_intent;
  }

  const stripeClient = await getStripeClient();
  return stripeClient.paymentIntents.retrieve(checkoutSession.payment_intent);
};

export const getLatestChargeFromPaymentIntent = (paymentIntent: Stripe.PaymentIntent | null) => {
  // https://stripe.com/docs/api/payment_intents/object#payment_intent_object-charges
  // This list only contains the latest charge
  // even if there were previously multiple unsuccessful charges.
  return paymentIntent?.latest_charge;
  // return paymentIntent?.charges?.data[0];
};

export const getPaymentMethodFromPaymentIntent = (paymentIntent: Stripe.PaymentIntent | null) => {
  return paymentIntent?.payment_method;
  // return getLatestChargeFromPaymentIntent(paymentIntent)?.payment_method_details?.type;
};

export const checkoutSessionToTransactionCreateMutationVariables = async (
  eventType:
    | 'checkout.session.async_payment_failed'
    | 'checkout.session.async_payment_succeeded'
    | 'checkout.session.completed'
    | 'checkout.session.expired',
  checkoutSession: Stripe.Checkout.Session
): Promise<(Omit<TransactionCreateMutationVariables, 'id'> & { id?: string }) | null> => {
  const paymentIntent = await getPaymentIntentFromCheckoutSession(checkoutSession);
  const method = getPaymentMethodFromPaymentIntent(paymentIntent);
  const charge = getLatestChargeFromPaymentIntent(paymentIntent);
  if (typeof charge === 'string') throw new Error('Not implemented');

  if (
    // Occurs when a payment intent using a delayed payment method fails.
    eventType === 'checkout.session.async_payment_failed' ||
    // Occurs when a Checkout Session is expired.
    eventType === 'checkout.session.expired'
  ) {
    return {
      id: checkoutSession.metadata?.orderId,
      transaction: {
        status: checkoutSession.status || 'unknown',
        reference: checkoutSession.id,
        type: `${STRIPE_PAYMENT_PREFIX}-${method || '(unknown-payment-method)'}`,
        availableActions: [],
      },
      transactionEvent: {
        status: 'FAILURE',
        name: eventType,
        reference: checkoutSession.id,
      },
    };
  }

  if (
    // Occurs when a Checkout Session has been successfully completed.
    eventType === 'checkout.session.completed' ||
    // Occurs when a payment intent using a delayed payment method finally succeeds.
    eventType === 'checkout.session.async_payment_succeeded'
  ) {
    if (!charge?.currency || !charge?.amount) {
      // @todo ?
      return null;
    }

    const getAmount = getTransactionAmountGetter({
      authorized: undefined,
      charged: getTempoAmountFromInteger(charge.amount),
      voided: undefined,
      refunded: undefined,
    });

    return {
      id: checkoutSession.metadata?.orderId,
      transaction: {
        status: checkoutSession.status || 'unknown',
        reference: checkoutSession.id,
        type: `${STRIPE_PAYMENT_PREFIX}-${method || '(unknown-payment-method)'}`,
        amountAuthorized: undefined,
        amountCharged: {
          amount: getAmount('charged').toString(),
          currency: charge.currency.toUpperCase(),
        },
        availableActions: ['REFUND'],
      },
      transactionEvent: {
        status: 'SUCCESS',
        name: eventType,
        reference: checkoutSession.id,
      },
    };
  }

  return assertUnreachable(eventType);
};

export const stripeWebhookEventToTransactionCreateMutationVariables = (
  event: StripeWebhookEvents
) => {
  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_failed':
    case 'checkout.session.async_payment_succeeded':
    case 'checkout.session.expired':
      return checkoutSessionToTransactionCreateMutationVariables(event.type, event.data?.object);
    default:
      return null;
  }
};
