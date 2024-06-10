// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import path from 'path';
import _withBundleAnalyzer from '@next/bundle-analyzer';
import _withPWA from 'next-pwa';
import { generate, workspaceRoot, withSentryConfig } from '@tempo/next/config';

const PROJECT_DIR = path.resolve(workspaceRoot, 'apps', 'dashboard');

const withBundleAnalyzer = _withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const withPWA = _withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const apiURL = new URL(process.env.NEXT_PUBLIC_API_URL);
const allowedImageDomains = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(',')
  : [];

const isSentryEnabled =
  process.env.SENTRY_DSN &&
  process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT &&
  process.env.SENTRY_RELEASE &&
  false; // TODO

const clientPresetDir = path.resolve(PROJECT_DIR, 'generated/gql');

const baseConfig = generate({ clientPresetDir });

/** @type {import('next').NextConfig} */
let config = withBundleAnalyzer({
  ...baseConfig,
  basePath: '/dashboard',
  experimental: {
    ...baseConfig.experimental,
  },
  // i18n,
  images: {
    domains: [apiURL.hostname, ...allowedImageDomains],
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

config = withPWA(config);

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
export default isSentryEnabled ? withSentryConfig(config) : config;
