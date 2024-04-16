import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import { DiscountStatus, VoucherDiscountType } from '@core/api/constants';
import type { FilterOpts, MinMax } from '@dashboard/oldSrc/types';
import {
  createDateField,
  createNumberField,
  createOptionsField,
} from '@dashboard/oldSrc/utils/filters/fields';

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
  const { t } = useTranslation();
  return [
    {
      ...createOptionsField(
        VoucherFilterKeys.channel,
        t('dashboard.channel', 'Channel'),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createDateField(
        VoucherFilterKeys.started,
        t('dashboard.started', 'Started'),
        opts.started.value
      ),
      active: opts.started.active,
    },
    {
      ...createNumberField(
        VoucherFilterKeys.timesUsed,
        t('dashboard.timesUsed', 'Times used'),
        opts.timesUsed.value
      ),
      active: opts.timesUsed.active,
    },
    {
      ...createOptionsField(
        VoucherFilterKeys.status,
        t('dashboard.status', 'Status'),
        opts.status.value,
        true,
        [
          {
            label: t('dashboard.active', 'Active'),
            value: DiscountStatus.Active,
          },
          {
            label: t('dashboard.expired', 'Expired'),
            value: DiscountStatus.Expired,
          },
          {
            label: t('dashboard.cheduled', 'Scheduled'),
            value: DiscountStatus.Scheduled,
          },
        ]
      ),
      active: opts.status.active,
    },
    {
      ...createOptionsField(
        VoucherFilterKeys.saleType,
        t('dashboard.type', 'Discount Type'),
        opts.saleType.value,
        false,
        [
          {
            label: t('dashboard.ixed', 'Fixed amount'),
            value: VoucherDiscountType.Fixed,
          },
          {
            label: t('dashboard.ercentage', 'Percentage'),
            value: VoucherDiscountType.Percentage,
          },
          {
            label: t('dashboard.ercentage', 'Percentage'),
            value: VoucherDiscountType.Shipping,
          },
        ]
      ),
      active: opts.saleType.active,
    },
  ];
}
