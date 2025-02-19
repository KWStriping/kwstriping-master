import { gql } from '@tempo/api/gql';

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
