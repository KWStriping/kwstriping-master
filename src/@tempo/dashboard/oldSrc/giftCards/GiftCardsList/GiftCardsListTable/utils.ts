import type { GiftCardDataFragment } from '@tempo/api/generated/graphql';
import { PLACEHOLDER } from '@tempo/dashboard/oldSrc/giftCards/GiftCardUpdate/types';

export const getTagCellText = (tags: GiftCardDataFragment['tags']) => {
  if (tags.length) {
    return tags.map(({ name }) => name).join(', ');
  }

  return PLACEHOLDER;
};
