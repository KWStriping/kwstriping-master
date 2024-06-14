import { gql } from '@tempo/api';

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
