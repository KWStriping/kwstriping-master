import { gql } from '@tempo/api';

export const createChannelMutation = gql(`
  mutation ChannelCreate($input: ChannelCreationInput!) {
    createChannel(data: $input) {
      result {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`);

export const updateChannelMutation = gql(`
  mutation ChannelUpdate($id: ID!, $input: ChannelUpdateInput!) {
    updateChannel(id: $id, data: $input) {
      result {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`);

export const deleteChannelMutation = gql(`
  mutation ChannelDelete($id: ID!, $input: ChannelDeleteInput) {
    deleteChannel(id: $id, data: $input) {
      errors {
        ...ChannelError
      }
    }
  }
`);

export const activateChannelMutation = gql(`
  mutation ChannelActivate($id: ID!) {
    activateChannel(id: $id) {
      result {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`);

export const deactivateChannelMutation = gql(`
  mutation ChannelDeactivate($id: ID!) {
    deactivateChannel(id: $id) {
      result {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`);

export const ChannelReorderWarehousesMutation = gql(`
  mutation ChannelReorderWarehouses($channelId: ID!, $moves: [ReorderInput!]!) {
    reorderChannelWarehouses(channelId: $channelId, moves: $moves) {
      channel {
        ...ChannelDetails
      }
      errors {
        ...ChannelError
      }
    }
  }
`);
