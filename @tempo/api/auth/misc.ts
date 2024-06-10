import type { PermissionCode, UserBaseFragment } from '@tempo/api/generated/graphql';

export const hasPermission = (permission: PermissionCode, user: UserBaseFragment) =>
  user.userPermissions?.map((perm) => perm.code).includes(permission);

export const hasAnyPermissions = (permissions: PermissionCode[], user: UserBaseFragment) =>
  permissions?.some((permission) => hasPermission(permission, user)) || false;

export const hasAllPermissions = (permissions: PermissionCode[], user: UserBaseFragment) =>
  permissions?.every((permission) => hasPermission(permission, user)) || false;
