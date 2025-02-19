import type { GroupDetailsPageFormData } from '@dashboard/components/GroupDetailsPage';
import type {
  PermissionFragment,
  GroupDetailsFragment,
  UserFragment,
} from '@tempo/api/generated/graphql';
import difference from 'lodash-es/difference';

/**
 * Will return true if group has all permissions available in shop assigned.
 */
export const isGroupFullAccess = (
  group: GroupDetailsFragment,
  shopPermissions: Array<Omit<PermissionFragment, '__typename'>>
) => {
  const assignedCodes = extractPermissionCodes(group);

  if (assignedCodes.length !== shopPermissions?.length) {
    return false;
  }

  for (const permission of shopPermissions) {
    if (assignedCodes.indexOf(permission.code) === undefined) {
      return false;
    }
  }
  return true;
};

/**
 * Return list of codes which are assigned to the permission group.
 */
export const extractPermissionCodes = (group: GroupDetailsFragment) =>
  group?.permissions ? group.permissions.map((perm) => perm.code) : [];

/**
 * Return lists of permissions which have to be added and removed from group.
 */
export const permissionsDiff = (
  group: GroupDetailsFragment,
  formData: GroupDetailsPageFormData
) => {
  const newPermissions = formData.permissions;
  const oldPermissions = extractPermissionCodes(group);

  return {
    addPermissions: difference(newPermissions, oldPermissions),
    removePermissions: difference(oldPermissions, newPermissions),
  };
};

/**
 * Return lists of users which have to be added and removed from group.
 */
export const usersDiff = (group: GroupDetailsFragment, formData: GroupDetailsPageFormData) => {
  const newUsers = formData.users.map((u) => u.id);
  const oldUsers = group?.users.map((u) => u.id);

  return {
    addUsers: difference(newUsers, oldUsers),
    removeUsers: difference(oldUsers, newUsers),
  };
};

/**
 * Permissions are exceeded when group has permission which is not handled by user
 */
export const arePermissionsExceeded = (group: GroupDetailsFragment, user: UserFragment) => {
  const groupPermissions = extractPermissionCodes(group);
  const userPermissions = user.userPermissions.map((p) => p.code);
  return difference(groupPermissions, userPermissions).length > 0;
};
