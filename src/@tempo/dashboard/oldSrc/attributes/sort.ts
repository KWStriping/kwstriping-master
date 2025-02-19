import { AttributeOrdering } from '@tempo/api/generated/constants';
import { AttributeListUrlOrdering } from '@tempo/dashboard/oldSrc/attributes/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: AttributeListUrlOrdering): AttributeOrdering {
  switch (sort) {
    case AttributeListUrlOrdering.name:
      return AttributeOrdering.Name;
    case AttributeListUrlOrdering.slug:
      return AttributeOrdering.Slug;
    case AttributeListUrlOrdering.searchable:
      return AttributeOrdering.FilterableInDashboard;
    case AttributeListUrlOrdering.useInFacetedSearch:
      return AttributeOrdering.FilterableInStorefront;
    case AttributeListUrlOrdering.visible:
      return AttributeOrdering.VisibleInStorefront;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
