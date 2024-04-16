import { hasAnyPermissions } from '@core/auth/misc';
import type { TFunction } from '@core/i18n';
import type { PermissionCode, UserFragment } from '@core/api/graphql';
import { createConfigurationMenu } from '@dashboard/pages/configuration';

import type { MenuItem } from './types';

export const getConfigMenuItemsPermissions = (t: TFunction): PermissionCode[] =>
  createConfigurationMenu(t).reduce((prev: PermissionCode[], { menuItems }) => {
    const permissions = menuItems.map(({ permissions }) => permissions ?? []).flat();
    return [...prev, ...permissions];
  }, []);

export const hasUserMenuItemPermissions = (menuItem: MenuItem, user: UserFragment): boolean =>
  menuItem.permissions ? !!user && hasAnyPermissions(menuItem.permissions, user) : true;
