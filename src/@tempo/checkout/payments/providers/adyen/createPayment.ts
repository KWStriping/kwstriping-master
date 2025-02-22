import { PaymentRequest as AdyenPaymentRequest } from '@adyen/api-library/lib/src/typings/checkout/paymentRequest';
import type { OrderFragment } from '@tempo/api/generated/graphql';
import { getAdyenClient, getLineItems } from './utils';
import type { PostDropInAdyenPaymentsBody } from '@tempo/checkout/adyen-drop-in';
import type { CreatePaymentData } from '@tempo/checkout/payments/types';
import { formatRedirectUrl, getIntegerAmountFromTempo } from '@tempo/checkout/payments/utils';

export const orderToAdyenRequest = ({
  order,
  returnUrl,
  merchantAccount,
}: {
  order: OrderFragment;
  merchantAccount: string;
  returnUrl: string;
}) => {
  const total = order.total.gross;
  return {
    amount: {
      currency: total.currency,
      value: getIntegerAmountFromTempo(total.amount),
    },
    reference: order.number || order.id,
    returnUrl,
    merchantAccount,
    countryCode: order.billingAddress?.country.code,
    metadata: {
      orderId: order.id,
    },
    lineItems: getLineItems(order.lines),
    shopperEmail: order.userEmail as string,
    shopperName: order.billingAddress
      ? {
          firstName: order.billingAddress.firstName ?? '',
          lastName: order.billingAddress.lastName ?? '',
        }
      : undefined,
    shopperLocale: 'EN',
    telephoneNumber: order.shippingAddress?.phone || order.billingAddress?.phone || undefined,
    billingAddress: order.billingAddress
      ? {
          city: order.billingAddress.city,
          country: order.billingAddress.country.code,
          street: order.billingAddress.streetAddress1,
          houseNumberOrName: order.billingAddress.streetAddress2 ?? '',
          postalCode: order.billingAddress.postalCode,
          stateOrProvince: order.billingAddress.countryArea ?? '',
        }
      : undefined,
    shippingAddress: order.shippingAddress
      ? {
          city: order.shippingAddress.city,
          country: order.shippingAddress.country.code,
          street: order.shippingAddress.streetAddress1,
          houseNumberOrName: order.shippingAddress.streetAddress2 ?? '',
          postalCode: order.shippingAddress.postalCode,
          stateOrProvince: order.shippingAddress.countryArea ?? '',
        }
      : undefined,
  };
};

export const createAdyenCheckoutPaymentLinks = async ({
  order,
  redirectUrl,
}: CreatePaymentData) => {
  const { config, checkout } = await getAdyenClient();
  return checkout.PaymentLinksApi.paymentLinks(
    orderToAdyenRequest({
      order,
      merchantAccount: config.merchantAccount,
      returnUrl: formatRedirectUrl(redirectUrl, order.id),
    })
  );
};

// export const createAdyenCheckoutSession = async ({
//   currency,
//   totalAmount,
//   checkoutId,
//   redirectUrl,
// }: {
//   currency: string;
//   totalAmount: number;
//   checkoutId: string;
//   redirectUrl: string;
// }) => {
//   const { config, checkout } = await getAdyenClient();

//   const session = await checkout.sessions({
//     merchantAccount: config.merchantAccount,
//     amount: {
//       currency: currency,
//       value: getIntegerAmountFromTempo(totalAmount),
//     },
//     returnUrl: formatRedirectUrl(redirectUrl, checkoutId),
//     reference: checkoutId,
//   });

//   return {
//     session,
//     clientKey: config.clientKey,
//   };
// };

export const createAdyenCheckoutPayment = async ({
  order,
  redirectUrl,
  adyenStateData,
}: CreatePaymentData & {
  adyenStateData: PostDropInAdyenPaymentsBody['adyenStateData'];
}) => {
  const { config, checkout } = await getAdyenClient();

  const adyenRequest = orderToAdyenRequest({
    merchantAccount: config.merchantAccount,
    order,
    returnUrl: formatRedirectUrl(redirectUrl, order.id),
  });

  const payment = await checkout.PaymentsApi.payments({
    ...adyenRequest,
    paymentMethod: adyenStateData.paymentMethod,
    browserInfo: (adyenStateData.browserInfo as any) ?? undefined,
    shopperInteraction: AdyenPaymentRequest.ShopperInteractionEnum.Ecommerce,
  });

  return {
    payment,
    clientKey: config.clientKey,
  };
};
