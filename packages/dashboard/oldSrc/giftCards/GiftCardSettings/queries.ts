import { graphql as gql } from '@core/api/gql';

export const giftCardSettings = gql(`
  query GiftCardSettings {
    giftCardSettings {
      ...GiftCardsSettings
    }
  }
`);
