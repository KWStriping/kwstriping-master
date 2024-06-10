import { useUser } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import type { TFunction } from '@core/i18n';
import ConfigurationPage from '@dashboard/components/configuration/ConfigurationPage';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import { PermissionCode } from '@core/api/constants';
import type { MenuSection } from '@dashboard/oldSrc/configuration/types';
import Attributes from '@dashboard/oldSrc/icons/Attributes';
import Channels from '@dashboard/oldSrc/icons/Channels';
import Navigation from '@dashboard/oldSrc/icons/Navigation';
import PageKlasses from '@dashboard/oldSrc/icons/PageKlasses';
import Groups from '@dashboard/oldSrc/icons/Groups';
import ProductKlasses from '@dashboard/oldSrc/icons/ProductKlasses';
import ShippingMethods from '@dashboard/oldSrc/icons/ShippingMethods';
import SiteSettings from '@dashboard/oldSrc/icons/SiteSettings';
import StaffMembers from '@dashboard/oldSrc/icons/StaffMembers';
import Taxes from '@dashboard/oldSrc/icons/Taxes';
import Warehouses from '@dashboard/oldSrc/icons/Warehouses';
import { sectionNames } from '@dashboard/oldSrc/intl';
import { warehouseSection } from '@dashboard/oldSrc/warehouses/urls';

export function createConfigurationMenu(t: TFunction): MenuSection[] {
  return [
    {
      label: t('dashboard.menuItems.productKlassesAndAttributes', 'Product Types and Attributes'),
      menuItems: [
        {
          description: t('dashboard.9/lwV', 'Specify attributes used to create product types'),
          icon: <Attributes />,
          permissions: [
            PermissionCode.ManageProductKlassesAndAttributes,
            PermissionCode.ManagePageKlassesAndAttributes,
          ],
          title: t('dashboard.attributes', sectionNames.attributes.defaultMessage),
          url: '/attributes',
          testId: 'configuration-menu-attributes',
        },
        {
          description: t('dashboard.0RwMK', 'Define types of products you sell'),
          icon: <ProductKlasses />,
          permissions: [PermissionCode.ManageProductKlassesAndAttributes],
          title: t('dashboard.productKlasses', sectionNames.productKlasses.defaultMessage),
          url: '/product-types',
          testId: 'configuration-menu-product-types',
        },
      ],
    },
    {
      label: t('dashboard.FrdB5', 'Product Settings'),
      menuItems: [
        {
          description: t('dashboard.IULpW', 'Manage how your store charges tax'),
          icon: <Taxes />,
          title: t('dashboard.taxes', sectionNames.taxes.defaultMessage),
          url: '/taxes/channels',
          testId: 'configuration-menu-taxes',
        },
      ],
    },
    {
      label: t('dashboard.N+yTt', 'Staff Settings'),
      menuItems: [
        {
          description: t('dashboard.QUkVW', 'Manage your employees and their permissions'),
          icon: <StaffMembers />,
          permissions: [PermissionCode.ManageStaff],
          title: t('dashboard.staff', sectionNames.staff.defaultMessage),
          url: '/staff',
          testId: 'configuration-menu-staff',
        },
        {
          description: t(
            'dashboard.vJ1qt',
            'Manage your permission groups and their permissions'
          ),
          icon: <Groups />,
          permissions: [PermissionCode.ManageStaff],
          title: t('dashboard.groups', sectionNames.groups.defaultMessage),
          url: '/permission-groups',
          testId: 'configuration-menu-permission-groups',
        },
      ],
    },
    {
      label: t('dashboard.Tr0qE', 'Shipping Settings'),
      menuItems: [
        {
          description: t('dashboard.xs6G3', 'Manage how you ship out orders'),
          icon: <ShippingMethods />,
          permissions: [PermissionCode.ManageShipping],
          title: t('dashboard.shipping', sectionNames.shipping.defaultMessage),
          url: '/shipping',
          testId: 'configurationMenuShipping',
        },
        {
          description: t('dashboard.RmuD+', 'Manage and update your warehouse information'),
          icon: <Warehouses />,
          permissions: [PermissionCode.ManageProducts],
          title: t('dashboard.warehouses', sectionNames.warehouses.defaultMessage),
          url: warehouseSection,
          testId: 'configuration-menu-warehouses',
        },
      ],
    },
    {
      label: t('dashboard.WSacl', 'Multichannel'),
      menuItems: [
        {
          description: t('dashboard.vJCJ4', 'Define and manage your sales channels'),
          icon: <Channels />,
          permissions: [PermissionCode.ManageChannels],
          title: t('dashboard.channels', sectionNames.channels.defaultMessage),
          url: '/channels',
          testId: 'configuration-menu-channels',
        },
      ],
    },
    {
      label: t('dashboard.jXnIf', 'Content Management'),
      menuItems: [
        {
          description: t('dashboard.PH/uP', 'Define types of content pages used in your store'),
          icon: <PageKlasses />,
          permissions: [
            PermissionCode.ManagePages,
            PermissionCode.ManagePageKlassesAndAttributes,
          ],
          title: t('dashboard.pageKlasses', sectionNames.pageKlasses.defaultMessage),
          url: '/page-types',
          testId: 'configuration-menu-page-types',
        },
      ],
    },
    {
      label: t('dashboard.Zl6cv', 'Miscellaneous'),
      menuItems: [
        {
          description: t('dashboard.pMcW8', 'Define how users can navigate through your store'),
          icon: <Navigation />,
          permissions: [PermissionCode.ManageMenus],
          title: t('dashboard.navigation', sectionNames.navigation.defaultMessage),
          url: '/navigation',
          testId: 'configuration-menu-navigation',
        },
        {
          description: t('dashboard.BajZK', 'View and update your site settings'),
          icon: <SiteSettings />,
          permissions: [PermissionCode.ManageSettings],
          title: t('dashboard.siteSettings', sectionNames.siteSettings.defaultMessage),
          url: '/site-settings',
          testId: 'configuration-menu-site-settings',
        },
      ],
    },
  ];
}

export const ConfigurationSection = () => {
  const { user } = useUser({ required: true });
  const { t } = useTranslation();

  return (
    <>
      <WindowTitle
        title={t('dashboard.configuration', sectionNames.configuration.defaultMessage)}
      />
      <ConfigurationPage menu={createConfigurationMenu(t)} user={user} />
    </>
  );
};
export default ConfigurationSection;
