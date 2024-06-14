import { gql } from '@tempo/api';

export const mediaList = gql(`
  query MediaList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $sort: MediaOrderingInput
    $filter: MediaFilter
  ) {
    media(
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
      filters: $filter
    ) {
      edges {
        node {
          ...MediaItem
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`);

export const mediaItemDetails = gql(`
  query MediaItemDetails($id: ID!) {
    mediaItem(id: $id) {
      ...MediaItemDetails
    }
  }
`);

export const mediaCountQuery = gql(`
  query MediaCount($filter: MediaFilter) {
    media(filters: $filter) {
      totalCount
    }
  }
`);
