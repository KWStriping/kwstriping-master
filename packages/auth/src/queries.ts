import { graphql as gql } from '@core/api/gql';

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
