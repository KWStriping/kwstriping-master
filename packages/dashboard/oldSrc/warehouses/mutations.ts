import { graphql as gql } from '@core/api/gql';

export const deleteWarehouse = gql(`
  mutation WarehouseDelete($id: ID!) {
    deleteWarehouse(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const createWarehouse = gql(`
  mutation WarehouseCreate($input: WarehouseCreationInput!) {
    createWarehouse(data: $input) {
      errors {
        ...Error
      }
      result {
        ...WarehouseDetails
      }
    }
  }
`);

export const updateWarehouse = gql(`
  mutation WarehouseUpdate($id: ID!, $input: WarehouseUpdateInput!) {
    updateWarehouse(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...WarehouseDetails
      }
    }
  }
`);
