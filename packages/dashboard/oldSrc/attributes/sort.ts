import { AttributeOrdering } from '@core/api/constants';
import { AttributeListUrlOrdering } from '@dashboard/oldSrc/attributes/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

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
