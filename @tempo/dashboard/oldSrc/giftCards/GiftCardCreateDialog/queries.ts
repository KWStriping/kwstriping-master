import { gql } from '@tempo/api/gql';

export const channelCurrencies = gql(`
  query ChannelCurrencies {
    shop {
      id
      channelCurrencies
    }
  }
`);
