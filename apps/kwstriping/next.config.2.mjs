// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import { generate } from '@tempo/next/config';

const DOMAIN = process.env.DOMAIN ?? process.env.NEXT_PUBLIC_DOMAIN;
if (!DOMAIN) throw new Error('NEXT_PUBLIC_DOMAIN is not defined in process.env');

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined in process.env');

console.log(`API URL: ${API_URL}`);

const allowedImageDomains = process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS
  ? process.env.NEXT_PUBLIC_ALLOWED_IMAGE_DOMAINS.split(',')
  : [];

/** @type {import('next').NextConfig} */
let config = {
  ...generate(),
  // i18n,
  images: {
    domains: [DOMAIN, ...allowedImageDomains],
    formats: ['image/avif', 'image/webp'],
  },
};

export default config;
