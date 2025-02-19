import { gql } from '@tempo/api/gql';

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
