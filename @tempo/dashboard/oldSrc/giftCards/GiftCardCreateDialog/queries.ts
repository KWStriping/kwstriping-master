import { gql } from '@tempo/api';

export const channelCurrencies = gql(`
  query ChannelCurrencies {
    shop {
      id
      channelCurrencies
    }
  }
`);
