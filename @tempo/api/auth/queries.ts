import { gql } from '@tempo/api';

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
