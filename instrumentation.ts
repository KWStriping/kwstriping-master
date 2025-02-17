import * as Sentry from '@sentry/nextjs';

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    Sentry.init({
      enabled: process.env.NODE_ENV === 'production',
      debug: process.env.SENTRY_DEBUG ? process.env.SENTRY_DEBUG === 'true' : false,
      dsn: SENTRY_DSN || 'https://bb1e9be5f6234ee095ebdd6c359806cb@glitchtip.orega.org/7',
      tracesSampleRate: 0.2,
      sendClientReports: false,
      autoSessionTracking: false,
      // ...
      // Note: if you want to override the automatic release value, do not set a
      // `release` value here - use the environment variable `SENTRY_RELEASE`, so
      // that it will also get attached to your source maps
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    Sentry.init({
      dsn: SENTRY_DSN || 'YOUR DSN HERE',
      tracesSampleRate: 1.0,
      sendClientReports: false,
      autoSessionTracking: false,
    });
  }
}
