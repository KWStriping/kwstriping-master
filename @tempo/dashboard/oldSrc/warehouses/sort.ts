import { WarehouseOrdering } from '@tempo/api/generated/constants';
import { createGetSortQueryVariables } from '@tempo/dashboard/oldSrc/utils/sort';
import { WarehouseListUrlOrdering } from '@tempo/dashboard/oldSrc/warehouses/urls';

export function getSortQueryField(sort: WarehouseListUrlOrdering): WarehouseOrdering {
  switch (sort) {
    case WarehouseListUrlOrdering.name:
      return WarehouseOrdering.Name;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
