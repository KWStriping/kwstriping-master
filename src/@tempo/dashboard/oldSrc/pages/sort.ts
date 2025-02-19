import type { PageFilter } from '@tempo/api/generated/graphql';
import { PageOrdering } from '@tempo/api/generated/constants';
import type { PageListUrlFilters } from '@tempo/dashboard/oldSrc/pages/urls';
import { PageListUrlOrdering } from '@tempo/dashboard/oldSrc/pages/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: PageListUrlOrdering): PageOrdering {
  switch (sort) {
    case PageListUrlOrdering.title:
      return PageOrdering.Title;
    case PageListUrlOrdering.visible:
      return PageOrdering.Visibility;
    case PageListUrlOrdering.slug:
      return PageOrdering.Slug;
    default:
      return undefined;
  }
}

export function getFilterVariables(params: PageListUrlFilters): PageFilter {
  return {
    search: params.query,
    pageKlasses: params.pageKlasses,
  };
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
