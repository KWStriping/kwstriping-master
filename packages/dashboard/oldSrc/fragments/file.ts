import { graphql as gql } from '@core/api/gql';

export const fileFragment = gql(`
  fragment File on File {
    url
    contentType
  }
`);
