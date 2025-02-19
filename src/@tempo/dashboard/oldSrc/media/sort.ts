import type { MediaFilter } from '@tempo/api/generated/graphql';
import { MediaOrdering } from '@tempo/api/generated/constants';
import type { MediaListUrlFilters } from '@tempo/dashboard/oldSrc/media/urls';
import { MediaListUrlOrdering } from '@tempo/dashboard/oldSrc/media/urls';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

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
