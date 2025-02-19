import type { GroupDetailsQuery, ShopInfoQuery, UserQuery } from '@tempo/api/generated/graphql';

export const getLastSourcesOfPermission = (
  groupId: string,
  userPermissions: GroupDetailsQuery['user']['userPermissions']
) =>
  userPermissions
    .filter((perm) => perm.sourceGroups.length === 1 && perm.sourceGroups[0].id === groupId)
    .map((perm) => perm.code);

export const getPermissionsComponentChoices = (
  userPermissions: UserQuery['me']['userPermissions'],
  shopPermissions: ShopInfoQuery['shop']['permissions'],
  lastSourcesOfPermissionIds: string[]
) => {
  const userCodes = userPermissions.map((p) => p.code) || [];

  return shopPermissions.map((perm) => ({
    ...perm,
    __typename: 'PermissionData',
    disabled: !userCodes.includes(perm.code),
    lastSource: lastSourcesOfPermissionIds.includes(perm.code),
  }));
};
