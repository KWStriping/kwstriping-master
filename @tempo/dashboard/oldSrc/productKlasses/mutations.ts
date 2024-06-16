import { gql } from '@tempo/api';

export const deleteProductKlassMutation = gql(`
  mutation ProductKlassDelete($id: ID!) {
    deleteProductKlass(id: $id) {
      errors {
        ...Error
      }
      result {
        id
      }
    }
  }
`);

export const deleteProductKlassesMutation = gql(`
  mutation ProductKlassBulkDelete($ids: [ID!]!) {
    deleteProductKlasses(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateProductKlassMutation = gql(`
  mutation ProductKlassUpdate($id: ID!, $input: ProductKlassInput!) {
    updateProductKlass(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...ProductKlassDetails
      }
    }
  }
`);

export const assignProductAttributeMutation = gql(`
  mutation AssignProductAttribute($id: ID!, $operations: [ProductAttributeAssignInput!]!) {
    assignProductAttribute(klassId: $id, operations: $operations) {
      errors {
        ...Error
      }
      productKlass {
        ...ProductKlassDetails
      }
    }
  }
`);

export const unassignProductAttributeMutation = gql(`
  mutation UnassignProductAttribute($id: ID!, $ids: [ID!]!) {
    unassignProductAttribute(klassId: $id, attributeIds: $ids) {
      errors {
        ...Error
      }
      result {
        ...ProductKlassDetails
      }
    }
  }
`);

export const createProductKlassMutation = gql(`
  mutation ProductKlassCreate($input: ProductKlassInput!) {
    createProductKlass(data: $input) {
      errors {
        ...Error
      }
      result {
        ...ProductKlassDetails
      }
    }
  }
`);

export const productKlassAttributeReorder = gql(`
  mutation ProductKlassAttributeReorder(
    $move: ReorderInput!
    $klassId: ID!
    $type: ProductAttributeType!
  ) {
    reorderProductKlassAttributes(
      moves: [$move]
      klassId: $klassId
      type: $type
    ) {
      errors {
        ...Error
      }
      result {
        ...ProductKlassDetails
      }
    }
  }
`);

export const updateProductAttributeAssignment = gql(`
  mutation ProductAttributeAssignmentUpdate(
    $operations: [ProductAttributeAssignmentUpdateInput!]!
    $klassId: ID!
  ) {
    updateProductAttributeAssignment(
      operations: $operations
      klassId: $klassId
    ) {
      errors {
        ...ProductAttributeAssignmentUpdateError
      }
      result {
        ...ProductKlassDetails
      }
    }
  }
`);
