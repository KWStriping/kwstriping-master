import type { LanguageCode } from '@tempo/api/generated/graphql';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';

import { useRouter } from 'next/navigation';

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
