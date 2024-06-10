import type { MediaFilter } from '@core/api/graphql';
import { MediaOrdering } from '@core/api/constants';
import type { MediaListUrlFilters } from '@dashboard/oldSrc/media/urls';
import { MediaListUrlOrdering } from '@dashboard/oldSrc/media/urls';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

export function getSortQueryField(sort: MediaListUrlOrdering): MediaOrdering {
  switch (sort) {
    case MediaListUrlOrdering.title:
      return MediaOrdering.Title;
    case MediaListUrlOrdering.visible:
      return MediaOrdering.Visibility;
    default:
      return undefined;
  }
}

export function getFilterVariables(params: MediaListUrlFilters): MediaFilter {
  return {
    search: params.query,
  };
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
