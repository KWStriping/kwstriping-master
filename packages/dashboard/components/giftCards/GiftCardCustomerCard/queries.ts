import { graphql as gql } from '@core/api/gql';

export const customerGiftCardListQuery = gql(`
  query CustomerGiftCardList($first: Int, $filter: GiftCardFilter) {
    giftCards(first: $first, filters: $filter) {
      edges {
        node {
          ...CustomerGiftCard
        }
      }
    }
  }
`);

// export const CUSTOMER_GIFT_CARD_LIST_QUERY = getOperationAST(customerGiftCardListQuery).name
//   .value;

export const CUSTOMER_GIFT_CARD_LIST_QUERY = 'CustomerGiftCardList'; // TODO: QA
