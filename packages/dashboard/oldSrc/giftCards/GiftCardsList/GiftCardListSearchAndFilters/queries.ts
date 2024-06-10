import { graphql as gql } from '@core/api/gql';

export const useGiftCardCurrencies = gql(`
  query GiftCardCurrencies {
    giftCardCurrencies
  }
`);
