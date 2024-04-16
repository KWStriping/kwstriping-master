import { graphql as gql } from '@core/api/gql';

export const channelsListBase = gql(`
  query BaseChannels {
    channels {
      ...Channel
    }
  }
`);

// export const channelsList = gql(`
//   query Channels {
//     channels {
//       ...ChannelDetails
//     }
//   }
// `);

// export const channelDetails = gql(`
//   query Channel($id: ID!) {
//     channel(id: $id) {
//       ...ChannelDetails
//     }
//   }
// `);
