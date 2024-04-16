import { graphql as gql } from '@core/api/gql';

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
