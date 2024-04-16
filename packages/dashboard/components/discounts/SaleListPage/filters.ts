import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { MultiAutocompleteChoiceType } from '@dashboard/components/fields/MultiAutocompleteSelectField';
import { DiscountStatus, DiscountValueType } from '@core/api/constants';
import type { FilterOpts, MinMax } from '@dashboard/oldSrc/types';
import { createDateField, createOptionsField } from '@dashboard/oldSrc/utils/filters/fields';

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
  const { t } = useTranslation();
  return [
    {
      ...createOptionsField(
        SaleFilterKeys.channel,
        t('dashboard.channel', 'Channel'),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createDateField(
        SaleFilterKeys.started,
        t('dashboard.started', 'Started'),
        opts.started.value
      ),
      active: opts.started.active,
    },
    {
      ...createOptionsField(
        SaleFilterKeys.status,
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
        SaleFilterKeys.saleType,
        t('dashboard.type', 'Discount Type'),
        [opts.saleType.value],
        false,
        [
          {
            label: t('dashboard.ixed', 'Fixed amount'),
            value: DiscountValueType.Fixed,
          },
          {
            label: t('dashboard.ercentage', 'Percentage'),
            value: DiscountValueType.Percentage,
          },
        ]
      ),
      active: opts.saleType.active,
    },
  ];
}
