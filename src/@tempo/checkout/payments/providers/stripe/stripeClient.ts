import Stripe from 'stripe';
import invariant from 'ts-invariant';

export async function getStripeClient() {
  const { secretKey } = await getStripeSecrets();
  return new Stripe(secretKey, {
    apiVersion: '2024-04-10', // required value
    typescript: true,
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export const getStripeSecrets = async () => {
  const {
    paymentProviders: { stripe },
  } = {} as any; // TODO: await getPrivateSettings(API_URL, false);

  invariant(stripe.publishableKey, 'Publishable key not defined');
  invariant(stripe.secretKey, 'Secret key not defined');
  invariant(stripe.webhookSecret, 'Secret key not defined');

  return {
    publishableKey: stripe.publishableKey,
    secretKey: stripe.secretKey,
    webhookSecret: stripe.webhookSecret,
  };
};
