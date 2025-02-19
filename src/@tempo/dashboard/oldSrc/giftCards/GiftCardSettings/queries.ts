import { gql } from '@tempo/api/gql';

export const giftCardSettings = gql(`
  query GiftCardSettings {
    giftCardSettings {
      ...GiftCardsSettings
    }
  }
`);
