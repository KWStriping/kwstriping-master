import { Temporal } from '@js-temporal/polyfill';

import type { ExtendedGiftCard, GiftCardBase } from './types';

export function isGiftCardExpired<T extends GiftCardBase>(giftCard: T): boolean {
  if (!giftCard?.expiryDate) {
    return false;
  }

  return Temporal.PlainDateTime.from(giftCard?.expiryDate).diffNow().as('minutes') < 0;
}

export function getExtendedGiftCard<T extends GiftCardBase>(giftCard?: T): ExtendedGiftCard<T> {
  if (!giftCard) {
    return undefined;
  }

  return {
    ...giftCard,
    isExpired: isGiftCardExpired(giftCard),
  };
}
