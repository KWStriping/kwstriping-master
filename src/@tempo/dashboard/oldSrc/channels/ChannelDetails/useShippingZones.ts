import { useUserPermissions } from '@tempo/api/auth/react/hooks/permissions';
import { useQuery } from '@tempo/api/hooks/useQuery';
import { PermissionCode } from '@tempo/api/generated/constants';
import {
  ChannelShippingZonesDocument,
  ShippingZonesCountDocument,
} from '@tempo/api/generated/graphql';
import { hasPermissions } from '@tempo/dashboard/components/core/RequirePermissions';

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
