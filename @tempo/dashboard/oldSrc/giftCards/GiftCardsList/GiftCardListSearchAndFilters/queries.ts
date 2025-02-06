import { gql } from '@tempo/api';

export const useGiftCardCurrencies = gql(`
  query GiftCardCurrencies {
    giftCardCurrencies
  }
`);
