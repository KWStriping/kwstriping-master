import { gql } from '@tempo/api/gql';

export const deleteGiftCard = gql(`
  mutation DeleteGiftCard($id: ID!) {
    deleteGiftCard(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const bulkDeleteGiftCard = gql(`
  mutation BulkDeleteGiftCard($ids: [ID!]!) {
    deleteGiftCards(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);
