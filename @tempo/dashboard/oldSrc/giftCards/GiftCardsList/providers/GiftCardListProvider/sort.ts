import { GiftCardUrlOrdering } from '../../types';
import { GiftCardOrdering } from '@tempo/api/generated/constants';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';

export const getSortQueryField = (sort: GiftCardUrlOrdering): GiftCardOrdering => {
  switch (sort) {
    case GiftCardUrlOrdering.balance:
      return GiftCardOrdering.CurrentBalance;
    case GiftCardUrlOrdering.product:
      return GiftCardOrdering.Product;
    case GiftCardUrlOrdering.usedBy:
      return GiftCardOrdering.UsedBy;
    default:
      return undefined;
  }
};

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
