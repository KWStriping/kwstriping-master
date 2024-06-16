import { gql } from '@tempo/api';

export const updateGiftCardSettings = gql(`
  mutation GiftCardSettingsUpdate($input: GiftCardSettingsUpdateInput!) {
    updateGiftCardSettings(data: $input) {
      errors {
        ...Error
      }
     result {
        ...GiftCardsSettings
      }
    }
  }
`);
