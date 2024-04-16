import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import { StaffMemberStatus } from '@core/api/constants';
import type { FilterOpts } from '@dashboard/oldSrc/types';
import { createOptionsField } from '@dashboard/oldSrc/utils/filters/fields';

export enum StaffFilterKeys {
  status = 'status',
}

export interface StaffListFilterOpts {
  status: FilterOpts<StaffMemberStatus>;
}

export function useFilterStructure(opts: StaffListFilterOpts): IFilter<StaffFilterKeys> {
  const { t } = useTranslation();
  return [
    {
      ...createOptionsField(
        StaffFilterKeys.status,
        t('dashboard.status', 'Status'),
        [opts.status.value],
        false,
        [
          {
            label: t('dashboard.active', 'Active'),
            value: StaffMemberStatus.Active,
          },
          {
            label: t('dashboard.deactivated', 'Deactivated'),
            value: StaffMemberStatus.Deactivated,
          },
        ]
      ),
      active: opts.status.active,
    },
  ];
}
