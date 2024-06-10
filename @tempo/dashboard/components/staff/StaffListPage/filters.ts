
import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import { StaffMemberStatus } from '@tempo/api/generated/constants';
import type { FilterOpts } from '@tempo/dashboard/oldSrc/types';
import { createOptionsField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

export enum StaffFilterKeys {
  status = 'status',
}

export interface StaffListFilterOpts {
  status: FilterOpts<StaffMemberStatus>;
}

export function useFilterStructure(opts: StaffListFilterOpts): IFilter<StaffFilterKeys> {
  return [
    {
      ...createOptionsField(
        StaffFilterKeys.status,
        (m.dashboard_status() ?? 'Status'),
        [opts.status.value],
        false,
        [
          {
            label: (m.dashboard_active() ?? 'Active'),
            value: StaffMemberStatus.Active,
          },
          {
            label: (m.dashboard_deactivated() ?? 'Deactivated'),
            value: StaffMemberStatus.Deactivated,
          },
        ]
      ),
      active: opts.status.active,
    },
  ];
}
