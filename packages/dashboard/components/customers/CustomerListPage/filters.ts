import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import { hasPermissions } from '@dashboard/components/core/RequirePermissions';
import { PermissionCode } from '@core/api/constants';
import type { UserFragment } from '@core/api/graphql';
import type { FilterOpts, MinMax } from '@dashboard/oldSrc/types';
import { createDateField, createNumberField } from '@dashboard/oldSrc/utils/filters/fields';

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
  const { t } = useTranslation();
  return [
    {
      ...createDateField(
        CustomerFilterKeys.joined,
        t('dashboard.oinDate', 'Join Date'),
        opts.joined.value
      ),
      active: opts.joined.active,
    },
    {
      ...createNumberField(
        CustomerFilterKeys.numberOfOrders,
        t('dashboard.umberOfOrders', 'Number of Orders'),
        opts.numberOfOrders.value
      ),
      active: opts.numberOfOrders.active,
      permissions: [PermissionCode.ManageOrders],
    },
  ].filter(
    (filter) => !!userPermissions && hasPermissions(userPermissions, filter.permissions ?? [])
  );
}
