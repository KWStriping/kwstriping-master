import type { GiftCardDataFragment } from '@core/api/graphql';
import { PLACEHOLDER } from '@dashboard/oldSrc/giftCards/GiftCardUpdate/types';

export const getTagCellText = (tags: GiftCardDataFragment['tags']) => {
  if (tags.length) {
    return tags.map(({ name }) => name).join(', ');
  }

  return PLACEHOLDER;
};
