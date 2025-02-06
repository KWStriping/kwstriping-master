import { gql } from '@tempo/api';
// import { getOperationAST } from 'graphql';

export const giftCardDetails = gql(`
  query GiftCardDetails($id: ID!) {
    giftCard(id: $id) {
      ...GiftCardData
      events {
        ...GiftCardEvent
      }
    }
  }
`);

// export const GIFT_CARD_DETAILS_QUERY = getOperationAST(giftCardDetails).name.value;
export const GIFT_CARD_DETAILS_QUERY = 'GiftCardDetails'; // TODO: QA
