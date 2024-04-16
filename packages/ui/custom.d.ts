/// <reference types="next/image-types/global" />

import '@core/types';

import type { I18nNamespaces } from '@core/i18n/types';

// https://github.com/i18next/next-i18next/blob/master/UPGRADING.md#keys-typings
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: I18nNamespaces;
  }
}
