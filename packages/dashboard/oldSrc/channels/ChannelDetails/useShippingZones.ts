import { useUserPermissions } from '@core/auth/react/hooks/permissions';
import { useQuery } from '@core/urql/hooks/useQuery';
import { hasPermissions } from '@dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@core/api/constants';
import {
  ChannelShippingZonesDocument,
  ShippingZonesCountDocument,
} from '@core/api/graphql';

export const useShippingZones = (channelId?: string) => {
  const userPermissions = useUserPermissions();
  const canLoadShippingZones =
    userPermissions && hasPermissions(userPermissions, [PermissionCode.ManageShipping]);

  const [{ data: shippingZonesCountData, fetching: shippingZonesCountLoading }] = useQuery(
    ShippingZonesCountDocument,
    { pause: !canLoadShippingZones }
  );

  const [{ data: channelShippingZonesData, fetching: channelsShippingZonesLoading }] = useQuery(
    ChannelShippingZonesDocument,
    {
      variables: {
        filter: {
          channels: [channelId as string],
        },
      },
      pause: !channelId || !canLoadShippingZones,
    }
  );

  return {
    shippingZonesCountData,
    shippingZonesCountLoading,
    channelShippingZonesData,
    channelsShippingZonesLoading,
    fetchMoreShippingZones,
    searchShippingZones,
    searchShippingZonesResult,
  };
};
