import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import { hasPermissions } from '@tempo/dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@tempo/api/generated/constants';
import type { UserFragment } from '@tempo/api/generated/graphql';
import type { FilterOpts, MinMax } from '@tempo/dashboard/oldSrc/types';
import { createDateField, createNumberField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

export enum CustomerFilterKeys {
  joined = 'joined',
  numberOfOrders = 'orders',
}

export interface CustomerListFilterOpts {
  joined: FilterOpts<MinMax>;
  numberOfOrders: FilterOpts<MinMax>;
}

export function useFilterStructure(
  opts: CustomerListFilterOpts,
  userPermissions: UserFragment['userPermissions']
): IFilter<CustomerFilterKeys> {
  return [
    {
      ...createDateField(
        CustomerFilterKeys.joined,
        (m.dashboard_oinDate() ?? 'Join Date'),
        opts.joined.value
      ),
      active: opts.joined.active,
    },
    {
      ...createNumberField(
        CustomerFilterKeys.numberOfOrders,
        (m.dashboard_umberOfOrders() ?? 'Number of Orders'),
        opts.numberOfOrders.value
      ),
      active: opts.numberOfOrders.active,
      permissions: [PermissionCode.ManageOrders],
    },
  ].filter(
    (filter) => !!userPermissions && hasPermissions(userPermissions, filter.permissions ?? [])
  );
}
