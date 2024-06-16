import { gql } from '@tempo/api';

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
