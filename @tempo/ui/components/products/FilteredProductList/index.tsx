import type {
  AttributeFilterFragment,
  OrderingDirection,
  ProductFilter,
  ProductOrdering,
} from '@tempo/api/generated/graphql';
import type { TransitionOptions } from 'next-usequerystate';
import { queryTypes, useQueryState } from 'next-usequerystate';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { translate } from '@tempo/ui/utils/translations';
import { ProductCollection } from '@tempo/ui/components/products/ProductCollection';
import type { UrlFilter } from './attributes';
import {
  getFilterOptions,
  getPillsData,
  parseQueryAttributeFilters,
  serializeQueryAttributeFilters,
} from './attributes';
import { FilterDropdown } from './FilterDropdown';
import type { FilterPill } from './FilterPills';
import { FilterPills } from './FilterPills';
import type { UrlSorting } from './sorting';
import { parseQuerySort, serializeQuerySort } from './sorting';
import { SortingDropdown } from './SortingDropdown';
import { StockToggle } from './StockToggle';

const INCLUDE_STOCK_TOGGLE = false;
const INCLUDE_FILTER_DROPDOWN = false;
const INCLUDE_SORTING_DROPDOWN = false;

export interface FilteredProductListProps {
  attributeFiltersData: AttributeFilterFragment[];
  collectionIDs?: string[];
  categoryIDs?: string[];
}

export interface Filters {
  sortBy: string;
  attributes: Record<string, Array<string>>;
}

export function FilteredProductList({
  attributeFiltersData,
  collectionIDs,
  categoryIDs,
}: FilteredProductListProps) {
  const [queryFilters, setQueryFilters] = useQueryState('filters', {
    parse: parseQueryAttributeFilters,
    serialize: serializeQueryAttributeFilters,
    defaultValue: [],
  });

  const [itemsCounter, setItemsCounter] = useState(0);

  const [sortByQuery, setSortByQuery] = useQueryState('sortBy', {});

  const sortBy = parseQuerySort(sortByQuery);
  const setSortBy = (
    value: UrlSorting | undefined | null,
    transitionOptions?: TransitionOptions | undefined
  ) => setSortByQuery(serializeQuerySort(value), transitionOptions);

  const [inStockFilter, setInStockFilter] = useQueryState(
    'inStock',
    queryTypes.boolean.withDefault(false)
  );

  const [productsFilter, setProductsFilter] = useState<ProductFilter>();

  const pills: FilterPill[] = getPillsData(queryFilters, attributeFiltersData);

  useEffect(() => {
    setProductsFilter({
      attributes: queryFilters.filter((filter) => filter.values?.length),
      ...(categoryIDs?.length && { categories: categoryIDs }),
      ...(collectionIDs?.length && { collections: collectionIDs }),
      ...(inStockFilter && { stockAvailability: 'IN_STOCK' }),
    });
    // Eslint does not recognize stringified queryFilters, so we have to ignore it
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inStockFilter, JSON.stringify(queryFilters), categoryIDs, collectionIDs]);

  const removeAttributeFilter = (attributeSlug: string, choiceSlug: string) => {
    const newFilters = queryFilters.reduce((result: UrlFilter[], filter: UrlFilter) => {
      if (filter.slug !== attributeSlug) {
        return [...result, filter];
      }
      const newFilterValues = filter.values.filter((value) => value !== choiceSlug);
      if (newFilterValues?.length) {
        return [...result, { ...filter, values: newFilterValues }];
      }
      return result;
    }, []);

    return setQueryFilters(newFilters.length ? newFilters : null, {
      scroll: false,
      shallow: true,
    });
  };

  const addAttributeFilter = (attributeSlug: string, choiceSlug: string) => {
    const isFilterAlreadyApplied = !!pills.find(
      (pill) => pill.attributeSlug === attributeSlug && pill.choiceSlug === choiceSlug
    );
    if (isFilterAlreadyApplied) {
      return removeAttributeFilter(attributeSlug, choiceSlug);
    }

    // if attribute was not used before, add it
    const existingFilter = queryFilters.find((filter) => filter.slug === attributeSlug);
    if (!existingFilter) {
      return setQueryFilters([...queryFilters, { slug: attributeSlug, values: [choiceSlug] }], {
        scroll: false,
        shallow: true,
      });
    }

    // if its already here, modify values list
    existingFilter.values = [...existingFilter.values, choiceSlug];
    return setQueryFilters(queryFilters, {
      scroll: false,
      shallow: true,
    });
  };

  const clearFilters = async () => {
    // await required when multiple query changes are applied at once
    await setQueryFilters(null, {
      scroll: false,
      shallow: true,
    });
    await setInStockFilter(null, {
      scroll: false,
      shallow: true,
    });
  };

  if (!productsFilter) return null;

  return (
    <>
      <div className="flex flex-col divide-y">
        <div className="flex items-center gap-4">
          <div className="flex-grow">
            {INCLUDE_FILTER_DROPDOWN && (
              <>
                {attributeFiltersData.map((attribute) => (
                  <FilterDropdown
                    key={attribute.id}
                    label={translate(attribute, 'name') || ''}
                    optionToggle={addAttributeFilter}
                    attributeSlug={attribute.slug as string}
                    options={getFilterOptions(attribute, pills)}
                  />
                ))}
              </>
            )}
            {INCLUDE_SORTING_DROPDOWN && (
              <SortingDropdown
                optionToggle={(field?: ProductOrdering, direction?: OrderingDirection) => {
                  return setSortBy(field && direction ? { field, direction } : null, {
                    scroll: false,
                    shallow: true,
                  });
                }}
                chosen={sortBy}
              />
            )}
            {INCLUDE_STOCK_TOGGLE && (
              <StockToggle
                enabled={inStockFilter}
                onChange={(value: boolean) =>
                  setInStockFilter(!!value || null, {
                    scroll: false,
                    shallow: true,
                  })
                }
              />
            )}
          </div>
          <div className="flex-none text-main-2 text-base">
            <div className={clsx(itemsCounter < 4 && 'hidden')}>
              {itemsCounter} {itemsCounter === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
        {!!pills?.length && (
          <FilterPills
            pills={pills}
            onClearFilters={clearFilters}
            onRemoveAttribute={removeAttributeFilter}
          />
        )}
      </div>

      <ProductCollection
        className={'mt-8 min-h-[50vh] min-w-[50vw]'} // TODO
        filter={productsFilter}
        sortBy={sortBy}
        setCounter={setItemsCounter}
        perPage={40}
      />
    </>
  );
}

export default FilteredProductList;
