import { gql } from '@tempo/api/gql';

export const updateGiftCard = gql(`
  mutation GiftCardUpdate($id: ID!, $input: GiftCardUpdateInput!) {
    updateGiftCard(id: $id, data: $input) {
      errors {
        ...Error
      }
     result {
        ...GiftCardData
        events {
          ...GiftCardEvent
        }
      }
    }
  }
`);

export const giftCardTimelineNoteAdd = gql(`
  mutation GiftCardAddNote($id: ID!, $input: GiftCardAddNoteInput!) {
    addNoteToGiftCard(id: $id, data: $input) {
      errors {
        ...Error
      }
      giftCard {
        ...GiftCardData
      }
      event {
        ...GiftCardEvent
      }
    }
  }
`);
