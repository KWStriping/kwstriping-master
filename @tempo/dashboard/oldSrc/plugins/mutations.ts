import { gql } from '@tempo/api';

export const updatePlugin = gql(`
  mutation PluginUpdate($channelId: ID, $id: ID!, $input: PluginUpdateInput!) {
    updatePlugin(channelId: $channelId, id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...PluginsDetails
      }
    }
  }
`);
