import { gql } from '@tempo/api/gql';

export const exportGiftCards = gql(`
  mutation ExportGiftCards($input: ExportGiftCardsInput!) {
    exportGiftCards(data: $input) {
      errors {
        ...Error
      }
     result {
        id
      }
    }
  }
`);
