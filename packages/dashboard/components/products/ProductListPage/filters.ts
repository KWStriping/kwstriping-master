import { useTranslation } from '@core/i18n';
import type { IFilter } from '@dashboard/components/core/Filter';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import { AttributeInputType, StockAvailability } from '@core/api/constants';
import { commonMessages, sectionNames } from '@dashboard/oldSrc/intl';
import { ProductListUrlFiltersAsDictWithMultipleValues } from '@dashboard/oldSrc/products/urls';
import type {
  AutocompleteFilterOpts,
  FilterOpts,
  KeyValue,
  MinMax,
} from '@dashboard/oldSrc/types';
import {
  createAutocompleteField,
  createBooleanField,
  createDateField,
  createDateTimeField,
  createKeyValueField,
  createNumberField,
  createOptionsField,
  createPriceField,
} from '@dashboard/oldSrc/utils/filters/fields';

export const ProductFilterKeys = {
  ...ProductListUrlFiltersAsDictWithMultipleValues,
  categories: 'categories',
  collections: 'collections',
  metadata: 'metadata',
  price: 'price',
  productKlass: 'productKlass',
  stock: 'stock',
  channel: 'channel',
  productKind: 'productKind',
} as const;
export type ProductFilterKeys = (typeof ProductFilterKeys)[keyof typeof ProductFilterKeys];

export type AttributeFilterOpts = FilterOpts<string[]> & {
  id: string;
  name: string;
  slug: string;
  inputType: AttributeInputType;
};

export interface ProductListFilterOpts {
  attributes: AttributeFilterOpts[];
  attributeChoices: FilterOpts<string[]> & AutocompleteFilterOpts;
  categories: FilterOpts<string[]> & AutocompleteFilterOpts;
  collections: FilterOpts<string[]> & AutocompleteFilterOpts;
  metadata: FilterOpts<KeyValue[]>;
  price: FilterOpts<MinMax>;
  productKlass: FilterOpts<string[]> & AutocompleteFilterOpts;
  stockStatus: FilterOpts<StockAvailability>;
  channel: FilterOpts<string> & { choices: SingleAutocompleteChoiceType[] };
  productKind: FilterOpts<string> & { choices: SingleAutocompleteChoiceType[] };
}

const messages = {
  available: {
    id: 'diOQm7',
    defaultMessage: 'Available',
    description: 'product status',
  },
  channel: {
    id: 'pbGIUg',
    defaultMessage: 'Channel',
    description: 'sales channel',
  },
  kind: {
    id: 'pBTTtU',
    defaultMessage: 'Product Kind',
    description: 'product kind',
  },
  hidden: {
    id: 'Bx367s',
    defaultMessage: 'Hidden',
    description: 'product is hidden',
  },
  metadata: {
    defaultMessage: 'Metadata',
    id: '8Q504V',
  },
  outOfStock: {
    id: 'Sna+WK',
    defaultMessage: 'Out Of Stock',
    description: 'product status',
  },
  price: {
    id: 'b1zuN9',
    defaultMessage: 'Price',
  },
  quantity: {
    id: '3Z8972',
    defaultMessage: 'Stock quantity',
    description: 'product',
  },
  visibility: {
    id: 'g+GAf4',
    defaultMessage: 'Visibility',
    description: 'product visibility',
  },
  visible: {
    id: '6Y1nQd',
    defaultMessage: 'Visible',
    description: 'product is visible',
  },
};

const filterByType = (type: AttributeInputType) => (attribute: AttributeFilterOpts) =>
  attribute.inputType === type;

export function useFilterStructure(opts: ProductListFilterOpts): IFilter<string> {
  const { t } = useTranslation();
  const attributes = opts.attributes;

  const booleanAttributes = attributes.filter(filterByType(AttributeInputType.Boolean));
  const dateAttributes = attributes.filter(filterByType(AttributeInputType.Date));
  const dateTimeAttributes = attributes.filter(filterByType(AttributeInputType.DateTime));
  const numericAttributes = attributes.filter(filterByType(AttributeInputType.Numeric));

  const defaultAttributes = opts.attributes.filter(
    ({ inputType }) =>
      ![
        AttributeInputType.Boolean,
        AttributeInputType.Date,
        AttributeInputType.DateTime,
        AttributeInputType.Numeric,
      ].includes(inputType)
  );

  return [
    {
      ...createOptionsField(
        ProductFilterKeys.channel,
        t('dashboard.channel', 'Channel'),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createKeyValueField(
        ProductFilterKeys.metadata,
        t('dashboard.etadata', messages.metadata?.defaultMessage),
        opts.metadata?.value
      ),
      active: opts.metadata?.active,
    },
    {
      ...createOptionsField(
        ProductFilterKeys.productKind,
        t('dashboard.ind', messages.kind.defaultMessage),
        [opts.productKind.value],
        false,
        opts.productKind.choices
      ),
      active: opts.productKind.active,
    },
    {
      ...createOptionsField(
        ProductFilterKeys.stock,
        t('dashboard.quantity', messages.quantity.defaultMessage),
        [opts.stockStatus.value],
        false,
        [
          {
            label: t('dashboard.vailable', messages.available.defaultMessage),
            value: StockAvailability.InStock,
          },
          {
            label: t('dashboard.utOfStock', messages.outOfStock.defaultMessage),
            value: StockAvailability.OutOfStock,
          },
        ]
      ),
      active: opts.stockStatus.active,
      dependencies: [ProductFilterKeys.channel],
    },
    {
      ...createPriceField(
        ProductFilterKeys.price,
        t('dashboard.price', messages.price.defaultMessage),
        opts.price.value
      ),
      active: opts.price.active,
    },
    {
      ...createAutocompleteField(
        ProductFilterKeys.categories,
        t('dashboard.categories', 'Categories'),
        opts.categories.value,
        opts.categories.displayValues,
        true,
        opts.categories.choices,
        {
          hasMore: opts.categories.hasMore,
          initialSearch: '',
          loading: opts.categories.loading,
          onFetchMore: opts.categories.onFetchMore,
          onSearchChange: opts.categories.onSearchChange,
        }
      ),
      active: opts.categories.active,
    },
    {
      ...createAutocompleteField(
        ProductFilterKeys.collections,
        t('dashboard.collections', sectionNames.collections.defaultMessage),
        opts.collections.value,
        opts.collections.displayValues,
        true,
        opts.collections.choices,
        {
          hasMore: opts.collections.hasMore,
          initialSearch: '',
          loading: opts.collections.loading,
          onFetchMore: opts.collections.onFetchMore,
          onSearchChange: opts.collections.onSearchChange,
        }
      ),
      active: opts.collections.active,
    },
    {
      ...createAutocompleteField(
        ProductFilterKeys.productKlass,
        t('dashboard.productKlasses', sectionNames.productKlasses.defaultMessage),
        opts.productKlass.value,
        opts.productKlass.displayValues,
        true,
        opts.productKlass.choices,
        {
          hasMore: opts.productKlass.hasMore,
          initialSearch: '',
          loading: opts.productKlass.loading,
          onFetchMore: opts.productKlass.onFetchMore,
          onSearchChange: opts.productKlass.onSearchChange,
        }
      ),
      active: opts.productKlass.active,
    },
    ...booleanAttributes.map((attr) => ({
      ...createBooleanField(
        attr.slug,
        attr.name,
        Array.isArray(attr.value) ? undefined : (attr.value as unknown) === 'true',
        {
          positive: t('dashboard.yes', 'Yes'),
          negative: t('dashboard.no', 'No'),
        }
      ),
      active: attr.active,
      group: ProductFilterKeys.booleanAttributes,
    })),
    ...dateAttributes.map((attr) => ({
      ...createDateField(attr.slug, attr.name, {
        min: attr.value[0],
        max: attr.value[1] ?? attr.value[0],
      }),
      active: attr.active,
      group: ProductFilterKeys.dateAttributes,
    })),
    ...dateTimeAttributes.map((attr) => ({
      ...createDateTimeField(attr.slug, attr.name, {
        min: attr.value[0],
        max: attr.value[1] ?? attr.value[0],
      }),
      active: attr.active,
      group: ProductFilterKeys.dateTimeAttributes,
    })),
    ...numericAttributes.map((attr) => ({
      ...createNumberField(attr.slug, attr.name, {
        min: attr.value[0],
        max: attr.value[1] ?? attr.value[0],
      }),
      active: attr.active,
      group: ProductFilterKeys.numericAttributes,
    })),
    ...defaultAttributes.map((attr) => ({
      ...createAutocompleteField(
        attr.slug,
        attr.name,
        attr.value,
        opts.attributeChoices.displayValues,
        true,
        opts.attributeChoices.choices,
        {
          hasMore: opts.attributeChoices.hasMore,
          initialSearch: '',
          loading: opts.attributeChoices.loading,
          onFetchMore: opts.attributeChoices.onFetchMore,
          onSearchChange: opts.attributeChoices.onSearchChange,
        },
        attr.id
      ),
      active: attr.active,
      group: ProductFilterKeys.stringAttributes,
    })),
  ];
}
