import { graphql as gql } from '@core/api/gql';

export const attributeDetails = gql(`
  query AttributeDetails(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    attribute(id: $id) {
      ...AttributeDetails
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
`);

export const attributeList = gql(`
  query AttributeList(
    $filter: AttributeFilter
    $before: String
    $after: String
    $first: Int
    $last: Int
    $sort: AttributeOrderingInput
  ) {
    attributes(
      filters: $filter
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
    ) {
      edges {
        node {
          ...Attribute
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);
