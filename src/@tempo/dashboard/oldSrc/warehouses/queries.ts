import { gql } from '@tempo/api/gql';

export const warehouseList = gql(`
  query WarehouseList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: WarehouseFilter
    $sort: WarehouseOrderingInput
  ) {
    warehouses(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
    ) {
      edges {
        node {
          ...WarehouseWithShipping
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const warehouseDetails = gql(`
  query WarehouseDetails($id: ID!) {
    warehouse(id: $id) {
      ...WarehouseDetails
    }
  }
`);

export const warehousesCount = gql(`
  query WarehousesCount {
    warehouses {
      totalCount
    }
  }
`);
