import { GiftCardUrlOrdering } from '../../types';
import { GiftCardOrdering } from '@core/api/constants';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';

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
