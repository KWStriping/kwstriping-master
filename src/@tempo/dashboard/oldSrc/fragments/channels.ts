import { gql } from '@tempo/api/gql';

export const channelErrorFragment = gql(`
  fragment ChannelError on ChannelError {
    code
    field
    message
  }
`);

export const channelDetailsFragment = gql(`
  fragment ChannelDetails on Channel {
    ...Channel
    hasOrders
    warehouses {
      ...Warehouse
    }
  }
`);
