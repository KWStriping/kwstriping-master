import type { LanguageCode } from '@core/api';
import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';

import { useRouter } from 'next/router';

export const useLocale = () => {
  const { defaultLocale } = useShopSettings();
  const { locale = defaultLocale } = useRouter();
  if (!locale) throw new Error('No locale found');
  const languageCode = locale.replace('-', '_').toUpperCase() as LanguageCode;
  return {
    locale,
    languageCode,
  };
};
