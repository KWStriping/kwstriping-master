import { gql } from '@tempo/api/gql';

export const activateGiftCard = gql(`
  mutation GiftCardActivate($id: ID!) {
    activateGiftCard(id: $id) {
      errors {
        ...Error
      }
      result {
        ...GiftCardData
      }
    }
  }
`);

export const deactivateGiftCard = gql(`
  mutation GiftCardDeactivate($id: ID!) {
    deactivateGiftCard(id: $id) {
      errors {
        ...Error
      }
      result {
        ...GiftCardData
      }
    }
  }
`);
