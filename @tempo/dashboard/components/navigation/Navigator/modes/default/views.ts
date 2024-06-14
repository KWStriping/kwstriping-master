import * as m from '@paraglide/messages';
import { score } from 'fuzzaldrin';
import type { QuickSearchActionInput } from '../../types';
import { languageListUrl } from '@tempo/dashboard/oldSrc/translations/urls';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface View {
  label: string;
  url: string;
}
function searchInViews(
  search: string,
  router: AppRouterInstance
): QuickSearchActionInput[] {
  const views: View[] = [
    {
      label: (m.dashboard_apps() ?? 'Apps'),
      url: '/apps',
    },
    {
      label: (m.dashboard_attributes() ?? 'Attributes'),
      url: '/attributes',
    },
    {
      label: (m.dashboard_categories() ?? 'Categories'),
      url: '/categories',
    },
    {
      label: (m.dashboard_collections() ?? 'Collections'),
      url: '/collections',
    },
    {
      label: (m.dashboard_customers() ?? 'Customers'),
      url: '/customers',
    },
    {
      label: (m.dashboard_orderDrafts() ?? 'Draft Orders'),
      url: '/orders/drafts',
    },
    {
      label: (m.dashboard_home() ?? 'Home'),
      url: '/',
    },
    {
      label: (m.dashboard_navigation() ?? 'Navigation'),
      url: '/navigation',
    },
    {
      label: (m.dashboard_orders() ?? 'Orders'),
      url: '/orders',
    },
    {
      label: (m.dashboard_pages() ?? 'Pages'),
      url: '/pages',
    },
    {
      label: (m.dashboard_groups() ?? 'Permission Groups'),
      url: '/permission-groups',
    },
    {
      label: (m.dashboard_plugins() ?? 'Plugins'),
      url: '/plugins',
    },
    {
      label: (m.dashboard_productKlasses() ?? 'Product Types'),
      url: '/product-types',
    },
    {
      label: (m.dashboard_products() ?? 'Products'),
      url: '/products',
    },
    {
      label: (m.dashboard_sales() ?? 'Sales'),
      url: '/discounts/sales',
    },
    {
      label: (m.dashboard_shipping() ?? 'Shipping methods'),
      url: '/shipping',
    },
    {
      label: (m.dashboard_siteSettings() ?? 'Site Settings'),
      url: '/site-settings',
    },
    {
      label: (m.dashboard_staff() ?? 'Staff Members'),
      url: '/staff',
    },
    {
      label: (m.dashboard_taxes() ?? 'Taxes'),
      url: '/taxes/channels',
    },
    {
      label: (m.dashboard_translations() ?? 'Translations'),
      url: languageListUrl,
    },
    {
      label: (m.dashboard_vouchers() ?? 'Vouchers'),
      url: '/discounts/vouchers',
    },
    {
      label: (m.dashboard_warehouses() ?? 'Warehouses'),
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
