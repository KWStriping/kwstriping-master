import { gql } from '@tempo/api';

export const giftCardSettings = gql(`
  query GiftCardSettings {
    giftCardSettings {
      ...GiftCardsSettings
    }
  }
`);
