import type { OrderFragment } from '@core/api';
import type { RequestContext } from '@core/urql/types';
import { PAYMENT_METHODS, PAYMENT_PROVIDERS } from '@core/checkout/types/payments';
import type { PayRequestBody } from '@core/checkout/types/payments-api';
import { createOrder } from './createOrder';
import { KnownPaymentError } from './errors';
import { getOrder } from './getOrderDetails';

export const createOrderFromBodyOrId = async (
  body: PayRequestBody,
  ctx: RequestContext
): Promise<OrderFragment> => {
  if (!PAYMENT_PROVIDERS.includes(body.provider)) {
    throw new KnownPaymentError(body.provider, ['UNKNOWN_PROVIDER']);
  }
  if (!PAYMENT_METHODS.includes(body.method)) {
    throw new KnownPaymentError(body.provider, ['UNKNOWN_METHOD']);
  }
  const provider = body.provider;

  if ('checkoutId' in body) {
    const data = await createOrder(body, ctx);

    if ('errors' in data) {
      throw new KnownPaymentError(provider, data?.errors);
    }

    return data?.data;
  } else if ('orderId' in body) {
    const data = await getOrder(body.orderId);

    if ('errors' in data) {
      throw new KnownPaymentError(provider, data?.errors);
    }

    return data?.data;
  }

  throw new KnownPaymentError(provider, ['MISSING_CHECKOUT_OR_ORDER_ID']);
};
