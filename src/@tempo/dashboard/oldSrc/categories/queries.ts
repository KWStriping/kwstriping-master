import { gql } from '@tempo/api/gql';

export const rootCategories = gql(`
  query RootCategories(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: CategoryFilter
    $sort: CategoryOrderingInput
  ) {
    categories(
      level: 0
      first: $first
      after: $after
      last: $last
      before: $before
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...Category
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const categoryDetails = gql(`
  query CategoryDetails(
    $id: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    category(id: $id) {
      ...CategoryDetails
      children(first: $first, after: $after, last: $last, before: $before) {
        edges {
          node {
            ...Category
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
      products(first: $first, after: $after, last: $last, before: $before) {
        pageInfo {
          ...PageInfo
        }
        edges {
          cursor
          node {
            id
            name
            thumbnail {
              url
            }
          }
        }
      }
    }
  }
`);
