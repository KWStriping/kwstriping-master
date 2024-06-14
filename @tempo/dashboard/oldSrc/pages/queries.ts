import { gql } from '@tempo/api';

export const pageList = gql(`
  query PageList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $sort: PageOrderingInput
    $filter: PageFilter
  ) {
    pages(
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
      filters: $filter
    ) {
      edges {
        node {
          ...Page
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

export const pageDetails = gql(`
  query PageDetails(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    page(id: $id) {
      ...PageDetails
    }
  }
`);

export const pageKlassQuery = gql(`
  query PageKlass(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    pageKlass(id: $id) {
      id
      name
      attributes {
        id
        inputType
        entityType
        slug
        name
        valueRequired
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...ValueList
        }
      }
    }
  }
`);

export const pageCountQuery = gql(`
  query PageCount($filter: PageFilter) {
    pages(filters: $filter) {
      totalCount
    }
  }
`);
