import * as m from '@paraglide/messages';
import { DiscountStatus, VoucherDiscountType } from '@tempo/api/generated/constants';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@tempo/dashboard/components/fields/MultiAutocompleteSelectField';
import type { FilterOpts, MinMax } from '@tempo/dashboard/oldSrc/types';
import {
  createDateField,
  createNumberField,
  createOptionsField,
} from '@tempo/dashboard/oldSrc/utils/filters/fields';

export enum VoucherFilterKeys {
  saleType = 'saleType',
  started = 'started',
  status = 'status',
  timesUsed = 'timesUsed',
  channel = 'channel',
}

export interface VoucherListFilterOpts {
  saleType: FilterOpts<VoucherDiscountType[]>;
  started: FilterOpts<MinMax>;
  status: FilterOpts<DiscountStatus[]>;
  timesUsed: FilterOpts<MinMax>;
  channel: FilterOpts<string> & { choices: MultiAutocompleteChoiceType[] };
}

export function useFilterStructure(opts: VoucherListFilterOpts): IFilter<VoucherFilterKeys> {
  return [
    {
      ...createOptionsField(
        VoucherFilterKeys.channel,
        m.dashboard_channel() ?? 'Channel',
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createDateField(
        VoucherFilterKeys.started,
        m.dashboard_started() ?? 'Started',
        opts.started.value
      ),
      active: opts.started.active,
    },
    {
      ...createNumberField(
        VoucherFilterKeys.timesUsed,
        m.dashboard_timesUsed() ?? 'Times used',
        opts.timesUsed.value
      ),
      active: opts.timesUsed.active,
    },
    {
      ...createOptionsField(
        VoucherFilterKeys.status,
        m.dashboard_status() ?? 'Status',
        opts.status.value,
        true,
        [
          {
            label: m.dashboard_active() ?? 'Active',
            value: DiscountStatus.Active,
          },
          {
            label: m.dashboard_expired() ?? 'Expired',
            value: DiscountStatus.Expired,
          },
          {
            label: m.dashboard_cheduled() ?? 'Scheduled',
            value: DiscountStatus.Scheduled,
          },
        ]
      ),
      active: opts.status.active,
    },
    {
      ...createOptionsField(
        VoucherFilterKeys.saleType,
        m.dashboard_type() ?? 'Discount Type',
        opts.saleType.value,
        false,
        [
          {
            label: m.dashboard_ixed() ?? 'Fixed amount',
            value: VoucherDiscountType.Fixed,
          },
          {
            label: m.dashboard_ercentage() ?? 'Percentage',
            value: VoucherDiscountType.Percentage,
          },
          {
            label: m.dashboard_ercentage() ?? 'Percentage',
            value: VoucherDiscountType.Shipping,
          },
        ]
      ),
      active: opts.saleType.active,
    },
  ];
}
