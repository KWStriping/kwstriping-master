import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import TranslationsLanguageListPage from '@dashboard/components/translations/TranslationsLanguageListPage';

const TranslationsLanguageList = () => {
  const shop = useShopSettings();

  return <TranslationsLanguageListPage languages={shop.languages} />;
};
export default TranslationsLanguageList;
