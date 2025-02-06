import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import type { UseSearchResult } from '@tempo/api/hooks/useSearch';
import { findValueInEnum } from '@tempo/utils/enums';
import type {
  FilterElement,
  FilterElementKeyValue,
  FilterElementRegular,
} from '@dashboard/components/Filter';
import { AttributeInputType, StockAvailability } from '@tempo/api/generated/constants';
import type {
  AttributeFragment,
  InitialProductFilterAttributesQuery,
  InitialProductFilterCategoriesQuery,
  InitialProductFilterCollectionsQuery,
  InitialProductFilterProductKlassesQuery,
  ProductFilter,
  SearchValuesQuery,
  SearchValuesQueryVariables,
  SearchCategoriesQuery,
  SearchCategoriesQueryVariables,
  SearchCollectionsQuery,
  SearchCollectionsQueryVariables,
  SearchProductKlassesQuery,
  SearchProductKlassesQueryVariables,
} from '@tempo/api/generated/graphql';
import { getProductGiftCardFilterParam } from './utils';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import type { ProductListFilterOpts } from '@tempo/dashboard/components/products/ProductListPage';
import { ProductFilterKeys } from '@tempo/dashboard/components/products/ProductListPage';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import type {
  ProductListUrlFilters,
  ProductListUrlQueryParams,
} from '@tempo/dashboard/oldSrc/products/urls';
import {
  ProductListUrlFiltersAsDictWithMultipleValues,
  ProductListUrlFiltersEnum,
  ProductListUrlFiltersWithKeyValueValues,
  ProductListUrlFiltersWithMultipleValues,
} from '@tempo/dashboard/oldSrc/products/urls';
import type { RelayToFlat } from '@tempo/dashboard/oldSrc/types';
import type { GteLte } from '@tempo/dashboard/oldSrc/utils/filters';
import {
  createFilterTabUtils,
  createFilterUtils,
  dedupeFilter,
  getGteLteVariables,
  getKeyValueQueryParam,
  getMinMaxQueryParam,
  getMultipleValueQueryParam,
  getSingleEnumValueQueryParam,
  getSingleValueQueryParam,
} from '@tempo/dashboard/oldSrc/utils/filters';

import { mapNodeToChoice, mapSlugNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';

export const PRODUCT_FILTERS_KEY = 'productFilters';

function getAttributeFilterParamType(inputType: AttributeInputType) {
  switch (inputType) {
    case AttributeInputType.Date:
      return ProductListUrlFiltersAsDictWithMultipleValues.dateAttributes;
    case AttributeInputType.DateTime:
      return ProductListUrlFiltersAsDictWithMultipleValues.dateTimeAttributes;
    case AttributeInputType.Numeric:
      return ProductListUrlFiltersAsDictWithMultipleValues.numericAttributes;
    case AttributeInputType.Boolean:
      return ProductListUrlFiltersAsDictWithMultipleValues.booleanAttributes;
    default:
      return ProductListUrlFiltersAsDictWithMultipleValues.stringAttributes;
  }
}

export function getValuesFromParams(
  params: ProductListUrlFilters,
  attribute: Pick<AttributeFragment, 'inputType' | 'slug'>
) {
  return params[getAttributeFilterParamType(attribute.inputType)]?.[attribute.slug] || [];
}

export function mapAttributeParamsToFilterOpts(
  attributes: RelayToFlat<NonNullable<InitialProductFilterAttributesQuery['attributes']>>,
  params: ProductListUrlFilters
) {
  return attributes
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((attr) => {
      const attrValues = getValuesFromParams(params, attr);

      return {
        active: attrValues?.length,
        id: attr.id,
        name: attr.name,
        slug: attr.slug,
        inputType: attr.inputType,
        value: dedupeFilter(attrValues),
      };
    });
}

export function getFilterOpts(
  params: ProductListUrlFilters,
  attributes: RelayToFlat<NonNullable<InitialProductFilterAttributesQuery['attributes']>>,
  focusedAttributeChoices: UseSearchResult<SearchValuesQuery, SearchValuesQueryVariables>,
  categories: {
    initial: RelayToFlat<NonNullable<InitialProductFilterCategoriesQuery['categories']>>;
    search: UseSearchResult<SearchCategoriesQuery, SearchCategoriesQueryVariables>;
  },
  collections: {
    initial: RelayToFlat<NonNullable<InitialProductFilterCollectionsQuery['collections']>>;
    search: UseSearchResult<SearchCollectionsQuery, SearchCollectionsQueryVariables>;
  },
  productKlasses: {
    initial: RelayToFlat<NonNullable<InitialProductFilterProductKlassesQuery['productKlasses']>>;
    search: UseSearchResult<SearchProductKlassesQuery, SearchProductKlassesQueryVariables>;
  },
  productKind: SingleAutocompleteChoiceType[],
  channels: SingleAutocompleteChoiceType[]
): ProductListFilterOpts {
  return {
    attributes: mapAttributeParamsToFilterOpts(attributes, params),
    attributeChoices: {
      active: true,
      choices: mapSlugNodeToChoice(
        mapEdgesToItems(focusedAttributeChoices.result.data?.attribute?.values)
      ),
      displayValues: mapNodeToChoice(
        mapEdgesToItems(focusedAttributeChoices.result.data?.attribute?.values)
      ),
      hasMore:
        focusedAttributeChoices.result.data?.attribute?.values?.pageInfo?.hasNextPage || false,
      initialSearch: '',
      loading: focusedAttributeChoices.result.fetching,
      onFetchMore: focusedAttributeChoices.loadMore,
      onSearchChange: focusedAttributeChoices.search,
      value: null,
    },
    categories: {
      active: !!params.categories,
      choices: mapNodeToChoice(mapEdgesToItems(categories?.search?.result?.data?.search)),
      displayValues: params.categories
        ? maybe(
            () =>
              categories.initial.map((category) => ({
                label: category.name,
                value: category.id,
              })),
            []
          )
        : [],
      hasMore: maybe(() => categories.search.result.data?.search?.pageInfo?.hasNextPage, false),
      initialSearch: '',
      loading: categories.search.result.fetching,
      onFetchMore: categories.search.loadMore,
      onSearchChange: categories.search.search,
      value: dedupeFilter(params.categories || []),
    },
    channel: {
      active: params?.channel !== undefined,
      choices: channels,
      value: params?.channel,
    },
    collections: {
      active: !!params.collections,
      choices: mapNodeToChoice(mapEdgesToItems(collections?.search?.result?.data?.search)),
      displayValues: params.collections
        ? maybe(
            () =>
              collections.initial.map((category) => ({
                label: category.name,
                value: category.id,
              })),
            []
          )
        : [],
      hasMore: maybe(() => collections.search.result.data?.search?.pageInfo?.hasNextPage, false),
      initialSearch: '',
      loading: collections.search.result.fetching,
      onFetchMore: collections.search.loadMore,
      onSearchChange: collections.search.search,
      value: dedupeFilter(params.collections || []),
    },
    metadata: {
      active: !!params?.metadata?.length,
      value: [
        ...(params?.metadata ? params.metadata?.filter((pair) => pair?.key !== undefined) : []),
      ],
    },
    productKind: {
      active: params?.productKind !== undefined,
      choices: productKind,
      value: params?.productKind,
    },
    price: {
      active: maybe(
        () => [params.priceFrom, params.priceTo].some((field) => field !== undefined),
        false
      ),
      value: {
        max: maybe(() => params.priceTo, '0'),
        min: maybe(() => params.priceFrom, '0'),
      },
    },
    productKlass: {
      active: !!params.productKlasses,
      choices: mapNodeToChoice(mapEdgesToItems(productKlasses?.search?.result?.data?.search)),
      displayValues: params.productKlasses
        ? maybe(
            () =>
              productKlasses.initial.map((productKlass) => ({
                label: productKlass.name,
                value: productKlass.id,
              })),
            []
          )
        : [],
      hasMore: maybe(
        () => productKlasses.search.result.data?.search?.pageInfo?.hasNextPage,
        false
      ),
      initialSearch: '',
      loading: productKlasses.search.result.fetching,
      onFetchMore: productKlasses.search.loadMore,
      onSearchChange: productKlasses.search.search,
      value: dedupeFilter(params.productKlasses || []),
    },
    stockStatus: {
      active: maybe(() => params.stockStatus !== undefined, false),
      value: maybe(() => findValueInEnum(params.stockStatus, StockAvailability)),
    },
  };
}

interface BaseFilterParam {
  slug: string;
}
interface BooleanFilterParam extends BaseFilterParam {
  boolean: boolean;
}
interface DateFilterParam extends BaseFilterParam {
  date: GteLte<string>;
}
interface DateTimeFilterParam extends BaseFilterParam {
  dateTime: GteLte<string>;
}
interface DefaultFilterParam extends BaseFilterParam {
  values: string[];
}
interface NumericFilterParam extends BaseFilterParam {
  valuesRange: GteLte<number>;
}
export type FilterParam =
  | BooleanFilterParam
  | DateFilterParam
  | DateTimeFilterParam
  | DefaultFilterParam
  | NumericFilterParam;

export const parseFilterValue = (
  params: ProductListUrlFilters,
  key: string,
  type: ProductListUrlFiltersAsDictWithMultipleValues
): FilterParam => {
  const value = params[type][key];
  const isMulti = params[type][key].length > 1;

  const name = { slug: key };

  switch (type) {
    case ProductListUrlFiltersAsDictWithMultipleValues.booleanAttributes:
      return { ...name, boolean: JSON.parse(value[0]) };
    case ProductListUrlFiltersAsDictWithMultipleValues.dateAttributes:
      return {
        ...name,
        date: getGteLteVariables({
          gte: value[0] || null,
          lte: isMulti ? value[1] || null : value[0],
        }),
      };
    case ProductListUrlFiltersAsDictWithMultipleValues.dateTimeAttributes:
      return {
        ...name,
        dateTime: getGteLteVariables({
          gte: value[0] || null,
          lte: isMulti ? value[1] || null : value[0],
        }),
      };
    case ProductListUrlFiltersAsDictWithMultipleValues.numericAttributes:
      const [gte, lte] = value.map((v) => parseFloat(v));

      return {
        ...name,
        valuesRange: {
          gte: gte || undefined,
          lte: isMulti ? lte || undefined : gte || undefined,
        },
      };
    default:
      return { ...name, values: value };
  }
};

function getFilteredValue(params: ProductListUrlFilters): FilterParam[] {
  const attrValues = Object.values(ProductListUrlFiltersAsDictWithMultipleValues).reduce<
    FilterParam[]
  >((attrValues, attributeType) => {
    const attributes = params[attributeType];

    if (!attributes) {
      return attrValues;
    }

    return [
      ...attrValues,
      ...Object.keys(attributes).map((key) => parseFilterValue(params, key, attributeType)),
    ];
  }, []);

  if (!attrValues.length) return null;
  return attrValues;
}

export function getFilterVariables(
  params: ProductListUrlFilters,
  isChannelSelected: boolean
): ProductFilter {
  return {
    attributes: getFilteredValue(params),
    categories: params.categories !== undefined ? params.categories : null,
    collections: params.collections !== undefined ? params.collections : null,
    metadata: params?.metadata,
    price: isChannelSelected
      ? getGteLteVariables({
          gte: parseFloat(params.priceFrom),
          lte: parseFloat(params.priceTo),
        })
      : null,
    productKlasses: params.productKlasses !== undefined ? params.productKlasses : null,
    search: params.query,
    isGiftCard: getProductGiftCardFilterParam(params.productKind),
    stockAvailability:
      params.stockStatus !== undefined
        ? findValueInEnum(params.stockStatus, StockAvailability)
        : null,
  };
}

export function getFilterQueryParam(
  filter: FilterElement<ProductFilterKeys>,
  params: ProductListUrlFilters
): ProductListUrlFilters {
  const { active, group, name, value } = filter;

  if (group) {
    const rest = params && params[group] ? params[group] : undefined;

    return {
      [group]: active
        ? {
            ...(rest === undefined ? {} : rest),
            [name]: value,
          }
        : rest,
    };
  }

  switch (name) {
    case ProductFilterKeys.categories:
      return getMultipleValueQueryParam(
        filter,
        ProductListUrlFiltersWithMultipleValues.categories
      );

    case ProductFilterKeys.collections:
      return getMultipleValueQueryParam(
        filter,
        ProductListUrlFiltersWithMultipleValues.collections
      );

    case ProductFilterKeys.price:
      return getMinMaxQueryParam(
        filter,
        ProductListUrlFiltersEnum.priceFrom,
        ProductListUrlFiltersEnum.priceTo
      );

    case ProductFilterKeys.productKlass:
      return getMultipleValueQueryParam(
        filter,
        ProductListUrlFiltersWithMultipleValues.productKlasses
      );

    case ProductFilterKeys.stock:
      return getSingleEnumValueQueryParam(
        filter as FilterElementRegular<ProductFilterKeys>,
        ProductListUrlFiltersEnum.stockStatus,
        StockAvailability
      );

    case ProductFilterKeys.channel:
      return getSingleValueQueryParam(filter, ProductListUrlFiltersEnum.channel);

    case ProductFilterKeys.productKind:
      return getSingleValueQueryParam(filter, ProductListUrlFiltersEnum.productKind);

    case ProductFilterKeys.metadata:
      return getKeyValueQueryParam(
        filter as FilterElementKeyValue<ProductFilterKeys>,
        ProductListUrlFiltersWithKeyValueValues.metadata
      );
  }
}

export const { deleteFilterTab, getFilterTabs, saveFilterTab } =
  createFilterTabUtils<ProductListUrlFilters>(PRODUCT_FILTERS_KEY);

export const { areFiltersApplied, getActiveFilters, getFiltersCurrentTab } = createFilterUtils<
  ProductListUrlQueryParams,
  ProductListUrlFilters
>({
  ...ProductListUrlFiltersEnum,
  ...ProductListUrlFiltersWithMultipleValues,
  ...ProductListUrlFiltersAsDictWithMultipleValues,
});
