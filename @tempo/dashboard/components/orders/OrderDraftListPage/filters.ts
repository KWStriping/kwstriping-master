import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import type { FilterOpts, MinMax } from '@tempo/dashboard/oldSrc/types';
import { createDateField, createTextField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

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
  return [
    {
      ...createDateField(
        OrderDraftFilterKeys.created,
        (m.dashboard_created() ?? 'Created'),
        opts.created.value
      ),
      active: opts.created.active,
    },
    {
      ...createTextField(
        OrderDraftFilterKeys.customer,
        (m.dashboard_customer() ?? 'Customer'),
        opts.customer.value
      ),
      active: opts.customer.active,
    },
  ];
}
