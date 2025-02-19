import { gql } from '@tempo/api/gql';

export const createGiftCards = gql(`
  mutation GiftCardBulkCreate($input: GiftCardBulkCreationInput!) {
    createGiftCards(data: $input) {
      objects {
        id
      }
      errors {
        ...Error
      }
    }
  }
`);
