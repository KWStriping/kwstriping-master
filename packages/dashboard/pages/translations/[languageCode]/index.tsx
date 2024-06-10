import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import TranslationsEntitiesListPage from '@dashboard/components/translations/TranslationsEntitiesListPage';
import { createPaginationState } from '@dashboard/hooks/usePaginator';
import { PAGINATE_BY } from '@dashboard/oldSrc/config';

import { maybe } from '@dashboard/oldSrc/misc';
import TranslationsAttributeList from '@dashboard/oldSrc/translations/EntityLists/TranslationsAttributeList';
import TranslationsCategoryList from '@dashboard/oldSrc/translations/EntityLists/TranslationsCategoryList';
import TranslationsCollectionList from '@dashboard/oldSrc/translations/EntityLists/TranslationsCollectionList';
import TranslationsMenuItemList from '@dashboard/oldSrc/translations/EntityLists/TranslationsMenuItemList';
import TranslationsPageList from '@dashboard/oldSrc/translations/EntityLists/TranslationsPageList';
import TranslationsProductList from '@dashboard/oldSrc/translations/EntityLists/TranslationsProductList';
import TranslationsSaleList from '@dashboard/oldSrc/translations/EntityLists/TranslationsSaleList';
import TranslationsShippingMethodList from '@dashboard/oldSrc/translations/EntityLists/TranslationsShippingMethodList';
import TranslationsVoucherList from '@dashboard/oldSrc/translations/EntityLists/TranslationsVoucherList';
import type { LanguageEntitiesUrlQueryParams } from '@dashboard/oldSrc/translations/urls';
import { TranslatableEntities } from '@dashboard/oldSrc/translations/urls';
import { stringifyQs } from '@dashboard/oldSrc/utils/urls';

interface TranslationsEntitiesProps {
  language: string;
  params: LanguageEntitiesUrlQueryParams;
}

const TranslationsEntities = () => {
  const router = useRouter();
  const { language, ...params } = router.query;
  const shop = useShopSettings();

  if (Object.keys(TranslatableEntities).indexOf(params.tab) === -1) {
    void router.replace(
      '?' +
        stringifyQs({
          tab: TranslatableEntities.categories,
        })
    );
  }

  const filterCallbacks = {
    onCategoriesTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.categories,
          })
      ),
    onCollectionsTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.collections,
          })
      ),
    onPagesTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.pages,
          })
      ),
    onAttributesTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.attributes,
          })
      ),
    onProductsTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.products,
          })
      ),
    onSalesTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.sales,
          })
      ),
    onShippingMethodsTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.shippingMethods,
          })
      ),
    onVouchersTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.vouchers,
          })
      ),
    onMenuItemsTabClick: () =>
      void router.push(
        '?' +
          stringifyQs({
            tab: TranslatableEntities.menuItems,
          })
      ),
  };
  const lang = maybe(() =>
    shop.languages.find((languageFromList) => languageFromList.code === language)
  );
  const paginationState = createPaginationState(PAGINATE_BY, params);
  const queryVariables = useMemo(
    () => ({
      ...paginationState,
      language: language as unknown,
    }),
    [params] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return (
    <TranslationsEntitiesListPage
      filters={{
        current: params.tab,
        ...filterCallbacks,
      }}
      language={lang}
    >
      {params.tab === 'categories' ? (
        <TranslationsCategoryList params={params} variables={queryVariables} />
      ) : params.tab === 'products' ? (
        <TranslationsProductList params={params} variables={queryVariables} />
      ) : params.tab === 'collections' ? (
        <TranslationsCollectionList params={params} variables={queryVariables} />
      ) : params.tab === 'sales' ? (
        <TranslationsSaleList params={params} variables={queryVariables} />
      ) : params.tab === 'vouchers' ? (
        <TranslationsVoucherList params={params} variables={queryVariables} />
      ) : params.tab === 'pages' ? (
        <TranslationsPageList params={params} variables={queryVariables} />
      ) : params.tab === 'attributes' ? (
        <TranslationsAttributeList params={params} variables={queryVariables} />
      ) : params.tab === 'shippingMethods' ? (
        <TranslationsShippingMethodList params={params} variables={queryVariables} />
      ) : params.tab === 'menuItems' ? (
        <TranslationsMenuItemList params={params} variables={queryVariables} />
      ) : null}
    </TranslationsEntitiesListPage>
  );
};
export default TranslationsEntities;
