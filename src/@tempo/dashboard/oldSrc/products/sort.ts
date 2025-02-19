import { ProductOrdering } from '@tempo/api/generated/constants';
import type { ProductOrder } from '@tempo/api/generated/graphql';
import type { ProductListUrlQueryParams } from '@tempo/dashboard/oldSrc/products/urls';
import { ProductListUrlOrdering } from '@tempo/dashboard/oldSrc/products/urls';
import { getOrderingDirection } from '@tempo/dashboard/oldSrc/utils/sort';

export const DEFAULT_SORT_KEY = ProductListUrlOrdering.name;

export function canBeSorted(
  sort: ProductListUrlOrdering | undefined,
  isChannelSelected: boolean
) {
  switch (sort) {
    case ProductListUrlOrdering.name:
    case ProductListUrlOrdering.productKlass:
    case ProductListUrlOrdering.attribute:
    case ProductListUrlOrdering.rank:
    case ProductListUrlOrdering.date:
      return true;
    case ProductListUrlOrdering.price:
    case ProductListUrlOrdering.status:
      return isChannelSelected;
    default:
      return false;
  }
}

export function getSortQueryField(sort: ProductListUrlOrdering): ProductOrdering | undefined {
  switch (sort) {
    case ProductListUrlOrdering.name:
      return ProductOrdering.Name;
    case ProductListUrlOrdering.price:
      return ProductOrdering.Price;
    case ProductListUrlOrdering.productKlass:
      return ProductOrdering.Type;
    case ProductListUrlOrdering.status:
      return ProductOrdering.Published;
    case ProductListUrlOrdering.rank:
      return ProductOrdering.Rank;
    case ProductListUrlOrdering.date:
      return ProductOrdering.CreatedAt;
    default:
      return undefined;
  }
}

export function getSortQueryVariables(
  params: ProductListUrlQueryParams,
  isChannelSelected: boolean
): ProductOrder | undefined {
  if (!canBeSorted(params.sort, isChannelSelected)) {
    return;
  }

  const direction = getOrderingDirection(params.asc);
  if (params.sort === ProductListUrlOrdering.attribute) {
    return {
      attributeId: params.attributeId,
      direction,
    };
  }

  const field = getSortQueryField(params.sort);
  return {
    direction,
    field,
  };
}
