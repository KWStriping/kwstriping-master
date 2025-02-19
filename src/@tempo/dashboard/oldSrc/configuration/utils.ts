import { hasAnyPermissions } from '@tempo/api/auth/misc';
import type { TFunction } from '@tempo/next/i18n';
import type { PermissionCode, UserFragment } from '@tempo/api/generated/graphql';
import type { MenuItem } from './types';
import { createConfigurationMenu } from '@tempo/dashboard/_app/configuration';

export const getConfigMenuItemsPermissions = (t: TFunction): PermissionCode[] =>
  createConfigurationMenu(t).reduce((prev: PermissionCode[], { menuItems }) => {
    const permissions = menuItems.map(({ permissions }) => permissions ?? []).flat();
    return [...prev, ...permissions];
  }, []);

export const hasUserMenuItemPermissions = (menuItem: MenuItem, user: UserFragment): boolean =>
  menuItem.permissions ? !!user && hasAnyPermissions(menuItem.permissions, user) : true;
