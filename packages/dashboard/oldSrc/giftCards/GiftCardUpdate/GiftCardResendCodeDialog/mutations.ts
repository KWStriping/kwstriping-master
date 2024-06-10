import { graphql as gql } from '@core/api/gql';

export const resendGiftCard = gql(`
  mutation GiftCardResend($input: GiftCardResendInput!) {
    resendGiftCard(data: $input) {
      errors {
        ...Error
      }
      result {
        ...GiftCardData
      }
    }
  }
`);
