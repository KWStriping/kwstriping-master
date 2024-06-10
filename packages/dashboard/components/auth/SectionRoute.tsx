import { useUser } from '@core/auth/react/hooks';
import NotFound from '@dashboard/components/NotFound';
import type { PermissionCode } from '@core/api/graphql';
import type { FC } from 'react';

import { hasAllPermissions, hasAnyPermissions } from '../misc';

type MatchPermissionType = 'all' | 'any';

type SectionRouteProps = RouteProps & {
  permissions?: PermissionCode[];
  matchPermission?: MatchPermissionType;
};

const matchAll = (match: MatchPermissionType) => match === 'all';

export const SectionRoute: FC<SectionRouteProps> = ({
  permissions,
  matchPermission = 'all',
  ...props
}) => {
  const { user } = useUser();

  // Prevents race condition
  if (user === undefined) return null;

  const hasSectionPermissions = () => {
    if (!permissions) {
      return true;
    }

    if (matchAll(matchPermission)) {
      return hasAllPermissions(permissions, user);
    }

    return hasAnyPermissions(permissions, user);
  };

  return hasSectionPermissions() ? <Route {...props} /> : <NotFound />;
};
SectionRoute.displayName = 'Route';
export default SectionRoute;
