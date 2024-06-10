import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import { DiscountStatus, DiscountValueType } from '@tempo/api/generated/constants';
import type { FilterOpts, MinMax } from '@tempo/dashboard/oldSrc/types';
import { createDateField, createOptionsField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

export enum SaleFilterKeys {
  saleType = 'saleType',
  started = 'started',
  status = 'status',
  channel = 'channel',
}

export interface SaleListFilterOpts {
  saleType: FilterOpts<DiscountValueType>;
  started: FilterOpts<MinMax>;
  status: FilterOpts<DiscountStatus[]>;
  channel: FilterOpts<string> & { choices: MultiAutocompleteChoiceType[] };
}

export function useFilterStructure(opts: SaleListFilterOpts): IFilter<SaleFilterKeys> {
  return [
    {
      ...createOptionsField(
        SaleFilterKeys.channel,
        (m.dashboard_channel() ?? 'Channel'),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createDateField(
        SaleFilterKeys.started,
        (m.dashboard_started() ?? 'Started'),
        opts.started.value
      ),
      active: opts.started.active,
    },
    {
      ...createOptionsField(
        SaleFilterKeys.status,
        (m.dashboard_status() ?? 'Status'),
        opts.status.value,
        true,
        [
          {
            label: (m.dashboard_active() ?? 'Active'),
            value: DiscountStatus.Active,
          },
          {
            label: (m.dashboard_expired() ?? 'Expired'),
            value: DiscountStatus.Expired,
          },
          {
            label: (m.dashboard_cheduled() ?? 'Scheduled'),
            value: DiscountStatus.Scheduled,
          },
        ]
      ),
      active: opts.status.active,
    },
    {
      ...createOptionsField(
        SaleFilterKeys.saleType,
        (m.dashboard_type() ?? 'Discount Type'),
        [opts.saleType.value],
        false,
        [
          {
            label: (m.dashboard_ixed() ?? 'Fixed amount'),
            value: DiscountValueType.Fixed,
          },
          {
            label: (m.dashboard_ercentage() ?? 'Percentage'),
            value: DiscountValueType.Percentage,
          },
        ]
      ),
      active: opts.saleType.active,
    },
  ];
}
