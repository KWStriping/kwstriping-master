import { GiftCardUrlOrdering } from './types';

export function canBeSorted(sort: GiftCardUrlOrdering, isCurrencySelected: boolean) {
  switch (sort) {
    case GiftCardUrlOrdering.balance:
      return isCurrencySelected;
    default:
      return true;
  }
}
