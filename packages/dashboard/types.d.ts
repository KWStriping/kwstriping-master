// https://github.com/i18next/next-i18next/blob/master/UPGRADING.md#keys-typings
import type { I18nNamespaces } from '@core/i18n/types';

import '@core/types';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: I18nNamespaces;
  }
}
