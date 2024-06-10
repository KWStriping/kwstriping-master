import type { OrderFragment } from '@tempo/api/generated/graphql';
import type Stripe from 'stripe';
import { getStripeClient } from './stripeClient';
import type { CreatePaymentData, CreatePaymentResult } from '@tempo/checkout/payments/types';
import { formatRedirectUrl, getIntegerAmountFromTempo } from '@tempo/checkout/payments/utils';
import type { PaymentMethodID } from '@tempo/checkout/types/payments';

export const createStripePayment = async ({
  order,
  redirectUrl,
  appUrl: _appUrl,
  method,
}: CreatePaymentData): Promise<CreatePaymentResult> => {
  const stripeClient = await getStripeClient();

  const stripeCheckoutCustomer = await createStripeCustomerFromOrder(stripeClient, order);

  const stripePaymentMethod = tempoPaymentMethodIdToStripePaymentMethodId(method);

  const stripeCheckoutSession = await stripeClient.checkout.sessions.create({
    line_items: [
      ...order.lines.map(tempoLineToStripeLine),
      ...order.discounts.map(tempoDiscountToStripeLine),
      tempoOrderShippingToStripeLine(order),
    ],

    // @todo
    locale: 'en',

    payment_method_types: stripePaymentMethod ? [stripePaymentMethod] : undefined,
    customer: stripeCheckoutCustomer.id,
    mode: 'payment',
    cancel_url: formatRedirectUrl(redirectUrl, order.id),
    success_url: formatRedirectUrl(redirectUrl, order.id),
    metadata: {
      orderId: order.id,
    },
  });

  return {
    url: stripeCheckoutSession.url,
    id: stripeCheckoutSession.id,
  };
};

type TempoLine = OrderFragment['lines'][number];
const tempoLineToStripeLine = (line: TempoLine): Stripe.Checkout.SessionCreateParams.LineItem => {
  return {
    price_data: {
      currency: line.unitPrice.gross.currency.toUpperCase(),
      unit_amount: getIntegerAmountFromTempo(line.unitPrice.gross.amount),
      product_data: {
        name: line.productName + '-' + line.productName,
        images: line.thumbnail?.url ? [line.thumbnail.url] : [],
      },
    },
    quantity: line.quantity,
  };
};

type TempoDiscount = OrderFragment['discounts'][number];
const tempoDiscountToStripeLine = (
  discount: TempoDiscount
): Stripe.Checkout.SessionCreateParams.LineItem => {
  return {
    price_data: {
      currency: discount.amount.currency.toUpperCase(),
      unit_amount: getIntegerAmountFromTempo(discount.amount.amount),
      product_data: {
        name: 'Discount ' + (discount.name || ''),
        images: [],
      },
    },
    quantity: 1,
  };
};

const tempoOrderShippingToStripeLine = (
  order: OrderFragment
): Stripe.Checkout.SessionCreateParams.LineItem => {
  return {
    quantity: 1,
    price_data: {
      currency: order.shippingPrice.gross.currency.toUpperCase(),
      unit_amount: getIntegerAmountFromTempo(order.shippingPrice.gross.amount),
      product_data: {
        name: 'Shipping ' + (order.shippingMethodName || ''),
        images: [],
      },
    },
  };
};

const tempoPaymentMethodIdToStripePaymentMethodId = (
  paymentMethodId: PaymentMethodID
): Stripe.Checkout.SessionCreateParams.PaymentMethodType | null => {
  switch (paymentMethodId) {
    case 'creditCard':
      return 'card';
    case 'applePay':
      // @todo https://github.com/tempo/react-storefront/issues/390
      return null;
    case 'paypal':
      // @todo https://github.com/tempo/react-storefront/issues/390
      return null;
    case 'dropin':
      return null;
    case 'dummy':
      return null;
    default:
      return null;
  }
};

const createStripeCustomerFromOrder = (stripeClient: Stripe, order: OrderFragment) => {
  const name = [order.billingAddress?.firstName.trim(), order.billingAddress?.lastName.trim()]
    .filter(Boolean)
    .join(' ');

  return stripeClient.customers.create({
    email: order.userEmail ?? undefined,
    name,
    address: order.billingAddress
      ? {
          city: order.billingAddress.city,
          country: order.billingAddress.country.code,
          line1: order.billingAddress.streetAddress1,
          line2: order.billingAddress.streetAddress2,
          postal_code: order.billingAddress.postalCode,
          state: order.billingAddress.countryArea,
        }
      : null,
    phone: order.billingAddress?.phone || order.shippingAddress?.phone || undefined,
    shipping: order.shippingAddress
      ? {
          name: order.shippingAddress.firstName + ' ' + order.shippingAddress.lastName,
          phone: order.shippingAddress.phone ?? undefined,
          address: {
            city: order.shippingAddress.city,
            country: order.shippingAddress.country.code,
            line1: order.shippingAddress.streetAddress1,
            line2: order.shippingAddress.streetAddress2,
            postal_code: order.shippingAddress.postalCode,
            state: order.shippingAddress.countryArea,
          },
        }
      : null,
  });
};
