import baseConfig from '@core/i18n/next-i18next.base.config';

const defaultLocale = 'en-US';

const DEFAULT_NS = process.env.NEXT_PUBLIC_APP ?? process.env.APP;
if (!DEFAULT_NS) throw new Error('APP env var must be set' + String(process.env));
const FALLBACK_NS = 'common';

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  ...baseConfig,
  i18n: {
    locales: ['en-US'],
    defaultLocale,
  },
  ns: [DEFAULT_NS, FALLBACK_NS],
  defaultNS: DEFAULT_NS,
  fallbackNS: FALLBACK_NS,
  reloadOnPrerender: process?.env?.NODE_ENV === 'development',
  strictMode: true,
};

export default config;
