// https://github.com/i18next/next-i18next#serversidetranslations

import type { UserConfig } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export { serverSideTranslations };

const DEFAULT_LOCALE = 'en-US';

const DEFAULT_NAMESPACE = 'common';

interface GetMessagesArgs {
  locale?: string;
  namespaces?: string[];
  config: UserConfig;
}

export async function getMessages({ locale, namespaces, config }: GetMessagesArgs) {
  return serverSideTranslations(
    locale ?? DEFAULT_LOCALE,
    [DEFAULT_NAMESPACE, ...(namespaces ?? [])],
    config
  );
}
