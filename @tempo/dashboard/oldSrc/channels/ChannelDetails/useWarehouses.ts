import { useUserPermissions } from '@tempo/api/auth/react/hooks/permissions';
import { useSearch } from '@tempo/api/hooks';
import { useQuery } from '@tempo/api/hooks/useQuery';
import { hasOneOfPermissions } from '@tempo/dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@tempo/api/generated/constants';
import { WarehousesCountDocument, SearchWarehousesDocument } from '@tempo/api/generated/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';

export const useWarehouses = () => {
  const userPermissions = useUserPermissions();
  const canLoadWarehouses =
    userPermissions &&
    hasOneOfPermissions(userPermissions, [
      PermissionCode.ManageShipping,
      PermissionCode.ManageOrders,
      PermissionCode.ManageProducts,
    ]);

  const { data: warehousesCountData, fetching: warehousesCountLoading } = useQuery(
    WarehousesCountDocument,
    {
      pause: !canLoadWarehouses,
    }
  );

  const {
    loadMore: fetchMoreWarehouses,
    search: searchWarehouses,
    result: searchWarehousesResult,
  } = useSearch(SearchWarehousesDocument, {
    variables: DEFAULT_INITIAL_SEARCH_DATA,
    pause: !canLoadWarehouses,
  });

  return {
    warehousesCountData,
    warehousesCountLoading,
    fetchMoreWarehouses,
    searchWarehouses,
    searchWarehousesResult,
  };
};
