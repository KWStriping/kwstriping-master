import * as m from '@paraglide/messages';
import { useUser } from '@tempo/api/auth/react/hooks';
// import { useTranslation } from '@tempo/next/i18n';
import { useShopSettings } from '@tempo/ui/hooks/useShopSettings';
import CatalogIcon from '@dashboard/assets/images/menu-catalog-icon.svg';
import ConfigurationIcon from '@dashboard/assets/images/menu-configure-icon.svg';
import CustomerIcon from '@dashboard/assets/images/menu-customers-icon.svg';
import DiscountsIcon from '@dashboard/assets/images/menu-discounts-icon.svg';
import HomeIcon from '@dashboard/assets/images/menu-home-icon.svg';
import OrdersIcon from '@dashboard/assets/images/menu-orders-icon.svg';
import PagesIcon from '@dashboard/assets/images/menu-pages-icon.svg';
import PhotoFilmIcon from '@dashboard/assets/images/menu-photo-film-icon.svg';
import TranslationIcon from '@dashboard/assets/images/menu-translation-icon.svg';
import type { SidebarMenuItem } from '@tempo/dashboard/components/layout/Sidebar/types';
import { PermissionCode } from '@tempo/api/generated/constants';
import type { UserFragment } from '@tempo/api/generated/graphql';
import { getConfigMenuItemsPermissions } from '@tempo/dashboard/oldSrc/configuration/utils';
import { mediaListPath } from '@tempo/dashboard/oldSrc/media/urls';
import { pageListPath } from '@tempo/dashboard/oldSrc/pages/urls';

import { languageListUrl } from '@tempo/dashboard/oldSrc/translations/urls';

export interface FilterableMenuItem extends Omit<SidebarMenuItem, 'children'> {
  children?: FilterableMenuItem[];
  permissions?: PermissionCode[];
}

function useMenuStructure(
  _user?: UserFragment
): [SidebarMenuItem[], (menuItem: SidebarMenuItem) => void] {
  const { user: currentUser } = useUser();
  const { enableDiscounts, enableGiftCards, enableTranslations } = useShopSettings();
  const user = _user ?? currentUser;
  const handleMenuItemClick = (menuItem: SidebarMenuItem) => {
    return null;
  };
  // console.log('>>>>>> useMenuStructure.user', user);
  const menuItems: FilterableMenuItem[] = [
    {
      ariaLabel: 'home',
      icon: HomeIcon,
      label: (m.dashboard_home() ?? 'Home'),
      id: 'home',
      url: '/',
    },
    {
      ariaLabel: 'catalogue',
      children: [
        {
          ariaLabel: 'products',
          label: (m.dashboard_products() ?? 'Products'),
          id: 'products',
          url: '/products',
          permissions: [PermissionCode.ManageProducts],
        },
        {
          ariaLabel: 'categories',
          label: (m.dashboard_categories() ?? 'Categories'),
          id: 'categories',
          url: '/categories',
          permissions: [PermissionCode.ManageProducts],
        },
        {
          ariaLabel: 'collections',
          label: (m.dashboard_collections() ?? 'Collections'),
          id: 'collections',
          url: '/collections',
          permissions: [PermissionCode.ManageProducts],
        },
        ...(enableGiftCards
          ? [
              {
                ariaLabel: 'giftCards',
                label: (m.dashboard_giftCards() ?? 'Gift Cards'),
                id: 'giftCards',
                url: '/gift-cards',
                permissions: [PermissionCode.ManageGiftCard],
              },
            ]
          : []),
      ],
      icon: CatalogIcon,
      label: (m.dashboard_atalog() ?? 'Catalog'),
      permissions: [PermissionCode.ManageGiftCard, PermissionCode.ManageProducts],
      id: 'catalogue',
    },
    {
      ariaLabel: 'orders',
      children: [
        {
          ariaLabel: 'orders',
          label: (m.dashboard_orders() ?? 'Orders'),
          permissions: [PermissionCode.ManageOrders],
          id: 'orders',
          url: '/orders',
        },
        {
          ariaLabel: 'order drafts',
          label: (m.dashboard_drafts() ?? 'Drafts'),
          permissions: [PermissionCode.ManageOrders],
          id: 'order-drafts',
          url: '/orders/drafts',
        },
      ],
      icon: OrdersIcon,
      label: (m.dashboard_orders() ?? 'Orders'),
      permissions: [PermissionCode.ManageOrders],
      id: 'orders',
    },
    {
      ariaLabel: 'customers',
      // children: [],
      icon: CustomerIcon,
      label: (m.dashboard_customers() ?? 'Customers'),
      permissions: [PermissionCode.ManageUsers],
      id: 'customers',
      url: '/customers',
    },
    ...(enableDiscounts
      ? [
          {
            ariaLabel: 'discounts',
            children: [
              {
                ariaLabel: 'sales',
                label: (m.dashboard_sales() ?? 'Sales'),
                id: 'sales',
                url: '/discounts/sales',
              },
              {
                ariaLabel: 'vouchers',
                label: (m.dashboard_vouchers() ?? 'Vouchers'),
                id: 'vouchers',
                url: '/discounts/vouchers',
              },
            ],
            icon: DiscountsIcon,
            label: (m.dashboard_discounts() ?? 'Discounts'),
            permissions: [PermissionCode.ManageDiscounts],
            id: 'discounts',
          },
        ]
      : []),
    {
      ariaLabel: 'pages',
      // children: [],
      icon: PagesIcon,
      label: (m.dashboard_pages() ?? 'Pages'),
      permissions: [PermissionCode.ManagePages],
      id: 'pages',
      url: pageListPath,
    },
    ...(enableTranslations
      ? [
          {
            ariaLabel: 'translations',
            // children: [],
            icon: TranslationIcon,
            label: (m.dashboard_translations() ?? 'Translations'),
            permissions: [PermissionCode.ManageTranslations],
            id: 'translations',
            url: languageListUrl,
          },
        ]
      : []),
    {
      ariaLabel: 'media',
      // children: [],
      icon: PhotoFilmIcon,
      label: (m.dashboard_media() ?? 'Media'),
      permissions: [PermissionCode.ManageMedia],
      id: 'media',
      url: mediaListPath,
    },
    // getAppSection(),
    {
      ariaLabel: 'configure',
      icon: ConfigurationIcon,
      label: (m.dashboard_configuration() ?? 'Configuration'),
      permissions: getConfigMenuItemsPermissions(t),
      id: 'configure',
      url: '/configuration/',
    },
  ];

  const isMenuItemPermitted = (menuItem: FilterableMenuItem) => {
    const userPermissions = (user?.userPermissions || []).map((permission) => permission.code);
    if (!menuItem?.permissions || menuItem?.permissions?.length < 1) {
      return true;
    }
    return menuItem.permissions.some((permission) => userPermissions.includes(permission));
  };

  const getFilteredMenuItems = (menuItems: FilterableMenuItem[]) =>
    menuItems.filter(isMenuItemPermitted);

  return [
    menuItems.reduce((resultItems: FilterableMenuItem[], menuItem: FilterableMenuItem) => {
      if (!isMenuItemPermitted(menuItem)) {
        return resultItems;
      }
      const { children } = menuItem;
      const filteredChildren = children ? getFilteredMenuItems(children) : undefined;

      return [...resultItems, { ...menuItem, children: filteredChildren }];
    }, [] as FilterableMenuItem[]),
    handleMenuItemClick,
  ];
}

export default useMenuStructure;
