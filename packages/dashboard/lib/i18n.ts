import type { SSRConfig, UserConfig } from '@core/i18n';
import { serverSideTranslations } from '@core/i18n/utils/ssr';
import nextI18nextConfig from '../next-i18next.config';

// TODO
const appName = process.env.APP ?? 'kwstriping';

export const getServerTranslations = async (
  locale: string | undefined,
  namespacesRequired: string[] = [],
  configOverride?: UserConfig
): Promise<SSRConfig> => {
  return serverSideTranslations(
    locale ?? nextI18nextConfig.i18n.defaultLocale,
    [...namespacesRequired, appName, 'common'],
    configOverride ?? nextI18nextConfig
  );
};
