// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { generate, withSentryConfig } from '@tempo/next/config';
import _withBundleAnalyzer from '@next/bundle-analyzer';

const DOMAIN = process.env.DOMAIN ?? process.env.NEXT_PUBLIC_DOMAIN;
if (!DOMAIN) throw new Error('NEXT_PUBLIC_DOMAIN is not defined in process.env');

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined in process.env');

console.log(`API URL: ${API_URL}`);

const withBundleAnalyzer = _withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const allowedImageDomains = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(',')
  : [];

const isSentryEnabled =
  process.env.SENTRY_DSN &&
  process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT &&
  process.env.SENTRY_RELEASE;

/** @type {import('next').NextConfig} */
let config = withBundleAnalyzer({
  ...generate(),
  // i18n,
  images: {
    domains: [DOMAIN, ...allowedImageDomains],
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-content-type-options',
            value: 'nosniff',
          },
          { key: 'x-xss-protection', value: '1' },
          { key: 'x-frame-options', value: 'DENY' },
          {
            key: 'strict-transport-security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
    ];
  },
});

// config = withPWA(config);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default isSentryEnabled ? withSentryConfig(config) : config;
