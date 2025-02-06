import { gql } from '@tempo/api';

export const fragmentTimePeriod = gql(`
  fragment TimePeriod on TimePeriod {
    amount
    type
  }
`);
