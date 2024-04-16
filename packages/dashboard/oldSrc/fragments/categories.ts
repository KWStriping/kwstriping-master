import { graphql as gql } from '@core/api/gql';

export const categoryFragment = gql(`
  fragment Category on Category {
    id
    name
    children {
      totalCount
    }
    products {
      totalCount
    }
  }
`);
