import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { FilterOpts, MinMax } from '@dashboard/oldSrc/types';
import { createDateField, createTextField } from '@dashboard/oldSrc/utils/filters/fields';

export enum OrderDraftFilterKeys {
  created = 'created',
  customer = 'customer',
}

export interface OrderDraftListFilterOpts {
  created: FilterOpts<MinMax>;
  customer: FilterOpts<string>;
}

export function useFilterStructure(
  opts: OrderDraftListFilterOpts
): IFilter<OrderDraftFilterKeys> {
  const { t } = useTranslation();
  return [
    {
      ...createDateField(
        OrderDraftFilterKeys.created,
        t('dashboard.created', 'Created'),
        opts.created.value
      ),
      active: opts.created.active,
    },
    {
      ...createTextField(
        OrderDraftFilterKeys.customer,
        t('dashboard.customer', 'Customer'),
        opts.customer.value
      ),
      active: opts.customer.active,
    },
  ];
}
