import { graphql as gql } from '@core/api/gql';

export const deleteGroup = gql(`
  mutation GroupDelete($id: ID!) {
    deleteGroup(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const createGroup = gql(`
  mutation GroupCreate($input: GroupCreationInput!) {
    createGroup(data: $input) {
      errors {
        ...Error
      }
      result {
        ...GroupDetails
      }
    }
  }
`);

export const updateGroup = gql(`
  mutation GroupUpdate($id: ID!, $input: GroupUpdateInput!) {
    updateGroup(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...GroupDetails
      }
    }
  }
`);
