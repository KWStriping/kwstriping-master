import { score } from 'fuzzaldrin';
import type { TFunction } from '@core/i18n';
import type { QuickSearchActionInput } from '../../types';
import { languageListUrl } from '@dashboard/oldSrc/translations/urls';

interface View {
  label: string;
  url: string;
}
function searchInViews(
  search: string,
  t: TFunction,
  router: NextRouter
): QuickSearchActionInput[] {
  const views: View[] = [
    {
      label: t('dashboard.apps', 'Apps'),
      url: '/apps',
    },
    {
      label: t('dashboard.attributes', 'Attributes'),
      url: '/attributes',
    },
    {
      label: t('dashboard.categories', 'Categories'),
      url: '/categories',
    },
    {
      label: t('dashboard.collections', 'Collections'),
      url: '/collections',
    },
    {
      label: t('dashboard.customers', 'Customers'),
      url: '/customers',
    },
    {
      label: t('dashboard.orderDrafts', 'Draft Orders'),
      url: '/orders/drafts',
    },
    {
      label: t('dashboard.home', 'Home'),
      url: '/',
    },
    {
      label: t('dashboard.navigation', 'Navigation'),
      url: '/navigation',
    },
    {
      label: t('dashboard.orders', 'Orders'),
      url: '/orders',
    },
    {
      label: t('dashboard.pages', 'Pages'),
      url: '/pages',
    },
    {
      label: t('dashboard.groups', 'Permission Groups'),
      url: '/permission-groups',
    },
    {
      label: t('dashboard.plugins', 'Plugins'),
      url: '/plugins',
    },
    {
      label: t('dashboard.productKlasses', 'Product Types'),
      url: '/product-types',
    },
    {
      label: t('dashboard.products', 'Products'),
      url: '/products',
    },
    {
      label: t('dashboard.sales', 'Sales'),
      url: '/discounts/sales',
    },
    {
      label: t('dashboard.shipping', 'Shipping methods'),
      url: '/shipping',
    },
    {
      label: t('dashboard.siteSettings', 'Site Settings'),
      url: '/site-settings',
    },
    {
      label: t('dashboard.staff', 'Staff Members'),
      url: '/staff',
    },
    {
      label: t('dashboard.taxes', 'Taxes'),
      url: '/taxes/channels',
    },
    {
      label: t('dashboard.translations', 'Translations'),
      url: languageListUrl,
    },
    {
      label: t('dashboard.vouchers', 'Vouchers'),
      url: '/discounts/vouchers',
    },
    {
      label: t('dashboard.warehouses', 'Warehouses'),
      url: '/warehouses',
    },
  ];

  return views.map((view) => ({
    label: view.label,
    onClick: () => {
      void router.push(view.url);
      return false;
    },
    score: score(view.label, search),
    text: view.label,
    type: 'view',
  }));
}

export default searchInViews;
