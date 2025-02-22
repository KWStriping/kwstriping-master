import { assertUnreachable } from '@tempo/utils';
import invariant from 'ts-invariant';
import type { ReuseExistingVendorSessionFn } from '@tempo/checkout/payments/types';
import { getStripeClient } from './stripeClient';

export const verifyStripeSession = async (session: string) => {
  const {
    paymentProviders: { stripe },
  } = {} as any; // TODO: await getPrivateSettings(API_URL, false);

  invariant(stripe.publishableKey, 'Publishable key not defined');
  invariant(stripe.secretKey, 'Secret key not defined');

  const stripeClient = await getStripeClient();

  const { status, url } = await stripeClient.checkout.sessions.retrieve(session);

  return { status, url };
};

export const reuseExistingStripeSession: ReuseExistingVendorSessionFn = async ({
  payment,
  orderId,
}) => {
  const session = await verifyStripeSession(payment.session);

  if (!session.status || !session.url) return;

  switch (session.status) {
    case 'expired':
      return {
        ok: false,
        provider: payment.provider,
        orderId,
        errors: ['EXPIRED'],
      };
    case 'complete':
      return {
        ok: false,
        provider: payment.provider,
        orderId,
        errors: ['ALREADY_PAID'],
      };
    case 'open':
      return {
        ok: true,
        provider: payment.provider,
        orderId,
        data: {
          paymentUrl: session.url,
        },
      };
    default:
      assertUnreachable(session.status);
  }
};
