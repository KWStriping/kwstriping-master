import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { FilterOpts } from '@dashboard/oldSrc/types';
import { createBooleanField } from '@dashboard/oldSrc/utils/filters/fields';

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
  const { t } = useTranslation();
  return [
    {
      ...createBooleanField(
        AttributeFilterKeys.filterableInStorefront,
        t('dashboard.filterableInStorefront', 'Filterable in Storefront'),
        opts.filterableInStorefront.value,
        {
          negative: t('dashboard.no', 'No'),
          positive: t('dashboard.yes', 'Yes'),
        }
      ),
      active: opts.filterableInStorefront.active,
    },
    {
      ...createBooleanField(
        AttributeFilterKeys.isVariantOnly,
        t('dashboard.sVariantOnly', 'Variant Only'),
        opts.isVariantOnly.value,
        {
          negative: t('dashboard.no', 'No'),
          positive: t('dashboard.yes', 'Yes'),
        }
      ),
      active: opts.isVariantOnly.active,
    },
    {
      ...createBooleanField(
        AttributeFilterKeys.valueRequired,
        t('dashboard.valueRequired', 'Value Required'),
        opts.valueRequired.value,
        {
          negative: t('dashboard.no', 'No'),
          positive: t('dashboard.yes', 'Yes'),
        }
      ),
      active: opts.valueRequired.active,
    },
    {
      ...createBooleanField(
        AttributeFilterKeys.visibleInStorefront,
        t('dashboard.isibleInStorefront', 'Visible on Product Page in Storefront'),
        opts.visibleInStorefront.value,
        {
          negative: t('dashboard.no', 'No'),
          positive: t('dashboard.yes', 'Yes'),
        }
      ),
      active: opts.visibleInStorefront.active,
    },
  ];
}
