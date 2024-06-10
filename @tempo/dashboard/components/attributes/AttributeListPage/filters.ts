import * as m from '@paraglide/messages';
import type { IFilter } from '@tempo/dashboard/components/core/Filter';
import type { FilterOpts } from '@tempo/dashboard/oldSrc/types';
import { createBooleanField } from '@tempo/dashboard/oldSrc/utils/filters/fields';

export enum AttributeFilterKeys {
  filterableInStorefront = 'filterableInStorefront',
  isVariantOnly = 'isVariantOnly',
  valueRequired = 'valueRequired',
  visibleInStorefront = 'visibleInStorefront',
}

export interface AttributeListFilterOpts {
  filterableInStorefront: FilterOpts<boolean>;
  isVariantOnly: FilterOpts<boolean>;
  valueRequired: FilterOpts<boolean>;
  visibleInStorefront: FilterOpts<boolean>;
}

const messages = {
  filterableInStorefront: {
    id: 'PsRG+v',
    defaultMessage: 'Filterable in Storefront',
    description: 'use attribute in filtering',
  },
  isVariantOnly: {
    id: 'rvk9ls',
    defaultMessage: 'Variant Only',
    description: 'attribute can be used only in variants',
  },
  valueRequired: {
    id: 'HQR2y0',
    defaultMessage: 'Value Required',
    description: 'attribute value is required',
  },
  visibleInStorefront: {
    id: 'cvbqJu',
    defaultMessage: 'Visible on Product Page in Storefront',
    description: 'attribute',
  },
};

export function useFilterStructure(opts: AttributeListFilterOpts): IFilter<AttributeFilterKeys> {
  return [
    {
      ...createBooleanField(
        AttributeFilterKeys.filterableInStorefront,
        (m.dashboard_filterableInStorefront() ?? 'Filterable in Storefront'),
        opts.filterableInStorefront.value,
        {
          negative: (m.dashboard_no() ?? 'No'),
          positive: (m.dashboard_yes() ?? 'Yes'),
        }
      ),
      active: opts.filterableInStorefront.active,
    },
    {
      ...createBooleanField(
        AttributeFilterKeys.isVariantOnly,
        (m.dashboard_sVariantOnly() ?? 'Variant Only'),
        opts.isVariantOnly.value,
        {
          negative: (m.dashboard_no() ?? 'No'),
          positive: (m.dashboard_yes() ?? 'Yes'),
        }
      ),
      active: opts.isVariantOnly.active,
    },
    {
      ...createBooleanField(
        AttributeFilterKeys.valueRequired,
        (m.dashboard_valueRequired() ?? 'Value Required'),
        opts.valueRequired.value,
        {
          negative: (m.dashboard_no() ?? 'No'),
          positive: (m.dashboard_yes() ?? 'Yes'),
        }
      ),
      active: opts.valueRequired.active,
    },
    {
      ...createBooleanField(
        AttributeFilterKeys.visibleInStorefront,
        (m.dashboard_isibleInStorefront() ?? 'Visible on Product Page in Storefront'),
        opts.visibleInStorefront.value,
        {
          negative: (m.dashboard_no() ?? 'No'),
          positive: (m.dashboard_yes() ?? 'Yes'),
        }
      ),
      active: opts.visibleInStorefront.active,
    },
  ];
}
