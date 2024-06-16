import { gql } from '@tempo/api';

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
