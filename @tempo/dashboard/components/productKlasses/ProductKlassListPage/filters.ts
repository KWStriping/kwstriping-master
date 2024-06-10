import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import { ProductKlassConfigurable } from '@tempo/api/generated/constants';
import type { FilterOpts } from '@tempo/dashboard/oldSrc/types';
import { createOptionsField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

export enum ProductKlassFilterKeys {
  configurable = 'configurable',
  type = 'type',
}

export interface ProductKlassListFilterOpts {
  configurable: FilterOpts<ProductKlassConfigurable>;
  type: FilterOpts<ProductKlass>;
}

const messages = {
  configurable: {
    id: 'X90t9n',
    defaultMessage: 'Configurable',
    description: 'product type',
  },
  digital: {
    id: 'dS8Adx',
    defaultMessage: 'Digital',
    description: 'product',
  },
  shippable: {
    id: 'U5aVd8',
    defaultMessage: 'Shippable',
    description: 'product',
  },
  type: {
    id: 'Jsh6+U',
    defaultMessage: 'Type',
    description: 'product type is digital or physical',
  },
};

export function useFilterStructure(
  opts: ProductKlassListFilterOpts
): IFilter<ProductKlassFilterKeys> {
  return [
    {
      ...createOptionsField(
        ProductKlassFilterKeys.configurable,
        (m.dashboard_configurable() ?? 'Configurable'),
        [opts.configurable.value],
        false,
        [
          {
            label: (m.dashboard_yes() ?? 'Yes'),
            value: ProductKlassConfigurable.Configurable,
          },
          {
            label: (m.dashboard_no() ?? 'No'),
            value: ProductKlassConfigurable.Simple,
          },
        ]
      ),
      active: opts.configurable.active,
    },
    {
      ...createOptionsField(
        ProductKlassFilterKeys.type,
        (m.dashboard_type() ?? 'Type'),
        [opts.type.value],
        false,
        [
          {
            label: (m.dashboard_igital() ?? 'Digital'),
            value: 'DIGITAL',
          },
          {
            label: (m.dashboard_shippable() ?? 'Shippable'),
            value: 'SHIPPABLE',
          },
        ]
      ),
      active: opts.type.active,
    },
  ];
}
