import { graphql as gql } from '@core/api/gql';

export const activateGiftCards = gql(`
  mutation GiftCardBulkActivate($ids: [ID!]!) {
    activateGiftCards(ids: $ids) {
      errors {
        ...Error
      }
      count
    }
  }
`);

export const deactivateGiftCards = gql(`
  mutation GiftCardBulkDeactivate($ids: [ID!]!) {
    deactivateGiftCards(ids: $ids) {
      errors {
        ...Error
      }
      count
    }
  }
`);
