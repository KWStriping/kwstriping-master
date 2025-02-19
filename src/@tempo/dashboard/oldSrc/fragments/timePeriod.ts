import { gql } from '@tempo/api/gql';

export const fragmentTimePeriod = gql(`
  fragment TimePeriod on TimePeriod {
    amount
    type
  }
`);
