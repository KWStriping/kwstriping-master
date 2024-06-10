import { graphql as gql } from '@core/api/gql';

export const fragmentTimePeriod = gql(`
  fragment TimePeriod on TimePeriod {
    amount
    type
  }
`);
