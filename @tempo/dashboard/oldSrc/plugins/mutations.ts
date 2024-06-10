import { gql } from '@tempo/api/gql';

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
