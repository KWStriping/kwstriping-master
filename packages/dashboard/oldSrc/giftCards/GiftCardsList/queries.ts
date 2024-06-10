import { graphql as gql } from '@core/api/gql';

export const giftCardList = gql(`
  query GiftCardList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: GiftCardFilter
    $sort: GiftCardOrderingInput
  ) {
    giftCards(
      first: $first
      after: $after
      before: $before
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          id
          usedByEmail
          last4CodeChars
          isActive
          expiryDate
          product {
            id
            name
          }
          tags {
            name
          }
          usedBy {
            ...UserBase
          }
          currentBalance {
            ...Money
          }
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`);

// export const GIFT_CARD_LIST_QUERY = getOperationAST(giftCardList).name.value;
export const GIFT_CARD_LIST_QUERY = 'GiftCardList'; // TODO: QA

export const giftCardTotalCount = gql(`
  query GiftCardTotalCount {
    giftCards {
      totalCount
    }
  }
`);

export const giftCardProductsCount = gql(`
  query GiftCardProductsCount {
    giftCardProductKlasses: productKlasses(filters: { kind: GIFT_CARD }) {
      totalCount
    }
    giftCardProducts: products(filters: { isGiftCard: true }) {
      totalCount
    }
  }
`);
