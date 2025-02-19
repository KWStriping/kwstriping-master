import { gql } from '@tempo/api/gql';

export const availableExternalAuthentications = gql(`
  query AvailableExternalAuthentications {
    shop {
      id
      availableExternalAuthentications {
        id
        name
      }
    }
  }
`);
