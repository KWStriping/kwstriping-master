import { graphql as gql } from '@core/api/gql';

export const channelCurrencies = gql(`
  query ChannelCurrencies {
    shop {
      id
      channelCurrencies
    }
  }
`);
