import { gql } from '@tempo/api';

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
