import invariant from 'ts-invariant';
import { IS_TEST } from '../constants';

export const testingVars = {
  mollieKey: process.env.TEST_MOLLIE_KEY as string,
  mollieProfileId: process.env.TEST_MOLLIE_PROFILE_ID as string,

  adyenMerchantAccount: process.env.TEST_ADYEN_MERCHANT_ACCOUNT as string,
  adyenClientKey: process.env.TEST_ADYEN_CLIENT_KEY as string,
  adyenApiKey: process.env.TEST_ADYEN_API_KEY as string,
  adyenHmac: process.env.TEST_ADYEN_HMAC as string,
  adyenWebhookPassword: process.env.TEST_ADYEN_WEBHOOK_PASSWORD as string,
  adyenWebhookUsername: process.env.TEST_ADYEN_WEBHOOK_USERNAME as string,

  stripeSecretKey: process.env.TEST_STRIPE_SECRET_KEY as string,
  stripeWebhookSecret: process.env.TEST_STRIPE_WEBHOOK_SECRET as string,
  stripePublishableKey: process.env.TEST_STRIPE_PUBLISHABLE_KEY as string,
};

if (IS_TEST) {
  invariant(testingVars.mollieKey, 'TEST_MOLLIE_KEY is not defined');
  invariant(testingVars.mollieProfileId, 'TEST_MOLLIE_PROFILE_ID is not defined');

  invariant(testingVars.adyenMerchantAccount, 'TEST_ADYEN_MERCHANT_ACCOUNT is not defined');
  invariant(testingVars.adyenClientKey, 'TEST_ADYEN_CLIENT_KEY is not defined');
  invariant(testingVars.adyenApiKey, 'TEST_ADYEN_API_KEY is not defined');
  invariant(testingVars.adyenHmac, 'TEST_ADYEN_HMAC is not defined');
  invariant(testingVars.adyenWebhookPassword, 'TEST_ADYEN_WEBHOOK_PASSWORD is not defined');
  invariant(testingVars.adyenWebhookUsername, 'TEST_ADYEN_WEBHOOK_USERNAME is not defined');

  invariant(testingVars.stripeSecretKey, 'TEST_STRIPE_SECRET_KEY is not defined');
  invariant(testingVars.stripeWebhookSecret, 'TEST_STRIPE_WEBHOOK_SECRET is not defined');
  invariant(testingVars.stripePublishableKey, 'TEST_STRIPE_PUBLISHABLE_KEY is not defined');
}

export type TestingEnvVar = keyof typeof testingVars;

export type TestingEnvVars = Record<TestingEnvVar, string>;
