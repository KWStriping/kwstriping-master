import type { AttributeFilterFragment } from '@tempo/api/generated/graphql';
import type { FilterDropdownOption } from './FilterDropdown';
import type { FilterPill } from './FilterPills';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { translate } from '@tempo/ui/utils/translations';

export interface UrlFilter {
  slug: string;
  values: string[];
}

export const getPillsData = (
  urlFilters: UrlFilter[],
  attributeFiltersData: AttributeFilterFragment[]
): FilterPill[] =>
  urlFilters.reduce((result: FilterPill[], filter: UrlFilter) => {
    const choiceAttribute = attributeFiltersData.find((attr) => attr.slug === filter.slug);
    const attrName = choiceAttribute ? choiceAttribute.name : filter.slug;
    const newPills = filter.values.map((value) => {
      const attrChoice = choiceAttribute?.values?.edges.find(
        (choice) => choice.node.slug === value
      );
      const choiceName = attrChoice?.node.name || value;
      return {
        label: attrName ? `${attrName}: ${choiceName}` : choiceName,
        choiceSlug: value,
        attributeSlug: filter.slug,
      };
    });
    return [...result, ...newPills];
  }, []);

export const getFilterOptions = (
  attribute: AttributeFilterFragment,
  appliedFilters: FilterPill[]
): FilterDropdownOption[] => {
  const choices = mapEdgesToItems(attribute.values) ?? [];

  return choices.map((choice) => ({
    chosen: !!appliedFilters.find(
      (pill) => pill.attributeSlug === attribute.slug && pill.choiceSlug === choice.slug
    ),
    id: choice.id,
    label: translate(choice, 'name') || choice.id,
    slug: choice.slug || choice.id,
  }));
};

export const parseQueryAttributeFilters = (query: string): UrlFilter[] => {
  return query.split(';').flatMap((attributeWithValues) => {
    const splitted = attributeWithValues.split('.');
    const [slug, ...values] = splitted;
    if (!slug || !values.length) return [];
    const attributeFilter: UrlFilter = { slug, values };
    return [attributeFilter];
    // const attributeFilter: UrlFilter = {
    //   slug: splitted[0],
    //   values: splitted.slice(1),
    // };
    // if (attributeFilter.values?.length) {
    //   return [attributeFilter];
    // }
    // return [];
  });
};

export const serializeQueryAttributeFilters = (values: UrlFilter[]): string =>
  values.map((value) => [value.slug, ...value.values].join('.')).join(';');
