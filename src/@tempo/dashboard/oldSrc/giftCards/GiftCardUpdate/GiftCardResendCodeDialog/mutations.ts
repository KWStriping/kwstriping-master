import { gql } from '@tempo/api/gql';

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
