import { hasAnyPermissions } from '@tempo/api/auth/misc';
import type { PermissionCode, UserFragment } from '@tempo/api/generated/graphql';
import { createConfigurationMenu } from '@tempo/dashboard/_app/configuration';

import type { MenuItem } from './types';

export const getConfigMenuItemsPermissions = (t: TFunction): PermissionCode[] =>
  createConfigurationMenu(t).reduce((prev: PermissionCode[], { menuItems }) => {
    const permissions = menuItems.map(({ permissions }) => permissions ?? []).flat();
    return [...prev, ...permissions];
  }, []);

export const hasUserMenuItemPermissions = (menuItem: MenuItem, user: UserFragment): boolean =>
  menuItem.permissions ? !!user && hasAnyPermissions(menuItem.permissions, user) : true;
