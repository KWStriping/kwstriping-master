import { useUserPermissions } from '@tempo/api/auth/react/hooks/permissions';
import type { PermissionCode, UserPermissionFragment } from '@tempo/api/generated/graphql';
import type { FC, ReactNode } from 'react';

const findPerm = (permList: UserPermissionFragment[], perm: PermissionCode) =>
  permList?.find((userPerm) => userPerm.code === perm);

export function hasPermissions(
  userPermissions: UserPermissionFragment[],
  requiredPermissions: PermissionCode[]
): boolean {
  return requiredPermissions.reduce(
    (acc, perm) => acc && !!findPerm(userPermissions, perm),
    true
  );
}

export function hasOneOfPermissions(
  userPermissions: UserPermissionFragment[],
  givenPermissions: PermissionCode[]
): boolean {
  return givenPermissions.some((perm) => !!findPerm(userPermissions, perm));
}

export interface RequirePermissionsProps {
  children: ReactNode | ReactNode[];
  requiredPermissions?: PermissionCode[];
  oneOfPermissions?: PermissionCode[];
}

const RequirePermissions: FC<RequirePermissionsProps> = ({
  children,
  requiredPermissions,
  oneOfPermissions,
}) => {
  const userPermissions = useUserPermissions();
  if (!userPermissions) return null;
  if (requiredPermissions && hasPermissions(userPermissions, requiredPermissions)) {
    return <>{children}</>;
  }
  if (oneOfPermissions && hasOneOfPermissions(userPermissions, oneOfPermissions)) {
    return <>{children}</>;
  }
  return null;
};

RequirePermissions.displayName = 'RequirePermissions';
export default RequirePermissions;
