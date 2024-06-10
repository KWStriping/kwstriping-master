import { gql } from '@tempo/api/gql';

export const useGiftCardCurrencies = gql(`
  query GiftCardCurrencies {
    giftCardCurrencies
  }
`);
