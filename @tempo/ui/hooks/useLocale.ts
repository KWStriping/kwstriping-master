import type { LanguageCode } from '@tempo/api/generated/graphql';
import { useRouter } from 'next/navigation';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';

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
