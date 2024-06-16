import type { LanguageCode } from '@tempo/api/generated/graphql';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';

export const useLocale = () => {
  const { defaultLocale: locale } = useShopSettings();
  if (!locale) throw new Error('No locale found'); // TODO: how to detect locale in app router...
  const languageCode = locale.replace('-', '_').toUpperCase() as LanguageCode;
  return {
    locale,
    languageCode,
  };
};
