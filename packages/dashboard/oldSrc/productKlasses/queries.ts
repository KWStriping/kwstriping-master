import { graphql as gql } from '@core/api/gql';

export const productKlassListQuery = gql(`
  query ProductKlassList(
    $after: String
    $before: String
    $first: Int
    $last: Int
    $filter: ProductKlassFilter
    $sort: ProductKlassOrderingInput
  ) {
    productKlasses(
      after: $after
      before: $before
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...ProductKlass
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const productKlassDetailsQuery = gql(`
  query ProductKlassDetails($id: ID!) {
    productKlass(id: $id) {
      ...ProductKlassDetails
    }
    shop {
      id
      defaultWeightUnit
    }
  }
`);

export const createProductKlassDataQuery = gql(`
  query ProductKlassCreateData {
    shop {
      id
      defaultWeightUnit
    }
  }
`);
