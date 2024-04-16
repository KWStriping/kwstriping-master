export const appName = 'Checkout';

export const CHECKOUT_SECTIONS = [
  'contactInfo',
  'shippingAddress',
  'fulfillmentMethod',
  'billingAddress',
  'payment',
] as const;

export const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export const CHECKOUT_TOKEN_KEY = 'checkoutToken'; // TODO: set in env on per-site basis

export const API_URL = process.env.NEXT_PUBLIC_API_URL as string;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

export const isSsr = typeof window === 'undefined';

export type ServerEnvVar = 'appToken' | 'settingsEncryptionSecret';
export type DebugEnvVar = 'appUrl';

export type ServerEnvVars = Record<ServerEnvVar, string | undefined>;
export type DebugEnvVars = Record<DebugEnvVar, string | undefined>;

export const debugEnvVars: DebugEnvVars | null =
  process.env.NODE_ENV !== 'development'
    ? null
    : {
        appUrl: process.env.DEBUG_APP_URL,
      };

export const IS_TEST = process.env.NODE_ENV === 'test';
