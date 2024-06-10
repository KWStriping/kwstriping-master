import { WarehouseOrdering } from '@core/api/constants';
import { createGetSortQueryVariables } from '@dashboard/oldSrc/utils/sort';
import { WarehouseListUrlOrdering } from '@dashboard/oldSrc/warehouses/urls';

export function getSortQueryField(sort: WarehouseListUrlOrdering): WarehouseOrdering {
  switch (sort) {
    case WarehouseListUrlOrdering.name:
      return WarehouseOrdering.Name;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(getSortQueryField);
