import { gql } from '@tempo/api';

export const createGiftCard = gql(`
  mutation GiftCardCreate($input: GiftCardCreationInput!) {
    createGiftCard(data: $input) {
      result {
        code
      }
      errors {
        ...Error
      }
    }
  }
`);
