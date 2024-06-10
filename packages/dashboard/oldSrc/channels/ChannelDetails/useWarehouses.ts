import { useUserPermissions } from '@core/auth/react/hooks/permissions';
import { useSearch } from '@core/urql/hooks';
import { useQuery } from '@core/urql/hooks/useQuery';
import { hasOneOfPermissions } from '@dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@core/api/constants';
import { WarehousesCountDocument, SearchWarehousesDocument } from '@core/api/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';

export const useWarehouses = () => {
  const userPermissions = useUserPermissions();
  const canLoadWarehouses =
    userPermissions &&
    hasOneOfPermissions(userPermissions, [
      PermissionCode.ManageShipping,
      PermissionCode.ManageOrders,
      PermissionCode.ManageProducts,
    ]);

  const [{ data: warehousesCountData, fetching: warehousesCountLoading }] = useQuery(
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
