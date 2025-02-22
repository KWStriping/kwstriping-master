import { gql } from '@tempo/api/gql';

export const collectionList = gql(`
  query CollectionList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: CollectionFilter
    $sort: CollectionOrderingInput
    $channel: String
  ) {
    collections(
      first: $first
      after: $after
      before: $before
      last: $last
      filters: $filter
      sortBy: $sort
      channel: $channel
    ) {
      edges {
        node {
          ...Collection
          products {
            totalCount
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`);

export const collectionDetails = gql(`
  query CollectionDetails(
    $id: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    collection(id: $id) {
      ...CollectionDetails
      products(first: $first, after: $after, before: $before, last: $last) {
        edges {
          node {
            ...CollectionProduct
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`);
