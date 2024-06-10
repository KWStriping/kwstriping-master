import type { Address } from '@tempo/api/generated/graphql';
import type { CreatePaymentData } from '@tempo/checkout/payments/types';
import { formatRedirectUrl } from '@tempo/checkout/payments/utils';

import {
  getDiscountLines,
  getShippingLines,
  getLines,
  parseAmountToString,
  getMollieClient,
} from './utils';

export const createMolliePayment = async ({ order, redirectUrl, appUrl }: CreatePaymentData) => {
  const discountLines = getDiscountLines(order.discounts);
  const shippingLines = getShippingLines(order);
  const lines = getLines(order.lines);
  const mollieClient = await getMollieClient();
  const billingAddress = order.billingAddress as Address;
  const mollieData = await mollieClient.orders.create({
    orderNumber: order.number,
    webhookUrl: `${appUrl}/api/webhooks/mollie`,
    locale: 'en_US',
    redirectUrl: formatRedirectUrl(redirectUrl, order.id),
    metadata: {
      orderId: order.id,
    },
    lines: [...discountLines, ...shippingLines, ...lines],
    billingAddress: {
      city: billingAddress.city,
      country: billingAddress.country.code,
      email: order.userEmail as string,
      givenName: billingAddress.firstName,
      familyName: billingAddress.lastName,
      postalCode: billingAddress.postalCode,
      streetAndNumber: billingAddress.streetAddress1,
      organizationName: order.billingAddress?.companyName,
    },
    amount: {
      value: parseAmountToString(order.total.gross.amount),
      currency: order.total.gross.currency,
    },
    shippingAddress: order.shippingAddress
      ? {
          city: order.shippingAddress.city,
          country: order.shippingAddress.country.code,
          email: order.userEmail as string,
          givenName: order.shippingAddress.firstName,
          familyName: order.shippingAddress.lastName,
          postalCode: order.shippingAddress.postalCode,
          streetAndNumber: order.shippingAddress.streetAddress1,
          organizationName: order.shippingAddress.companyName,
        }
      : undefined,
  });

  return { url: mollieData._links.checkout?.href, id: mollieData.id };
};
