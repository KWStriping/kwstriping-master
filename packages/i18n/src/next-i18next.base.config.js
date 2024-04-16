// @ts-check

import path from 'path';
import { fileURLToPath } from 'url';

import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

const isServerSide = typeof window === 'undefined';

const defaultLocale = 'en-US';
const debugI18n = ['true', 1].includes(process?.env?.NEXTJS_DEBUG_I18N ?? 'false');

/**
 * @type {undefined | ((locale: string, namespace: string, missing: boolean) => string)}
 */
const getLocalePath = !isServerSide
  ? undefined
  : (locale, namespace, missing) => {
      if (missing) return ''; // TODO?
      const __dirname = path.dirname(fileURLToPath(import.meta.url));
      const workspaceRoot = path.resolve(__dirname, '..', '..', '..');
      if (namespace === 'common') return path.resolve(workspaceRoot, 'packages/i18n/src/locales');
      const appName = process.env.APP;
      if (!appName) throw new Error('process.env.APP not defined');
      const appRoot = path.resolve(workspaceRoot, 'apps', appName);
      const localesPath = path.resolve(appRoot, 'locales');
      const localePath = `${localesPath}/${locale}/${namespace}.json`;
      console.log('Locale path: ', localePath);
      return localePath;
    };

const backends = isServerSide ? [] : [LocalStorageBackend, HttpBackend];

/**
 * @type {import('next-i18next').UserConfig}
 */
const config = {
  backend: {
    backends,
    backendOptions: isServerSide
      ? undefined // [{ loadPath: getLocalesPath }]
      : [
          // Options for LocalStorageBackend
          { expirationTime: 60 * 60 * 1000 }, // 1 hour
          // Options for HttpBackend
          { loadPath: '/api/locales/{{lng}}/{{ns}}' },
        ],
  },
  debug: debugI18n,
  i18n: {
    locales: ['en-US'],
    defaultLocale,
  },
  ...(isServerSide && {
    localePath: getLocalePath,
  }),
  react: {
    useSuspense: false,
  },
  reloadOnPrerender: process?.env?.NODE_ENV === 'development',
  saveMissing: false,
  serializeConfig: false,
  use: isServerSide ? [] : [ChainedBackend],
};

export default config;
