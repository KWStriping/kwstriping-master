import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import { ProductKlassConfigurable } from '@core/api/constants';
import type { FilterOpts } from '@dashboard/oldSrc/types';
import { createOptionsField } from '@dashboard/oldSrc/utils/filters/fields';

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
  const { t } = useTranslation();
  return [
    {
      ...createOptionsField(
        ProductKlassFilterKeys.configurable,
        t('dashboard.configurable', 'Configurable'),
        [opts.configurable.value],
        false,
        [
          {
            label: t('dashboard.yes', 'Yes'),
            value: ProductKlassConfigurable.Configurable,
          },
          {
            label: t('dashboard.no', 'No'),
            value: ProductKlassConfigurable.Simple,
          },
        ]
      ),
      active: opts.configurable.active,
    },
    {
      ...createOptionsField(
        ProductKlassFilterKeys.type,
        t('dashboard.type', 'Type'),
        [opts.type.value],
        false,
        [
          {
            label: t('dashboard.igital', 'Digital'),
            value: 'DIGITAL',
          },
          {
            label: t('dashboard.shippable', 'Shippable'),
            value: 'SHIPPABLE',
          },
        ]
      ),
      active: opts.type.active,
    },
  ];
}
