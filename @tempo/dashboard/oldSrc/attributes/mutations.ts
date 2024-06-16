import { gql } from '@tempo/api';

export const deleteAttributes = gql(`
  mutation AttributeBulkDelete($ids: [ID!]!) {
    deleteAttributes(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const deleteAttribute = gql(`
  mutation AttributeDelete($id: ID!) {
    deleteAttribute(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateAttributeMutation = gql(`
  mutation AttributeUpdate($id: ID!, $input: AttributeUpdateInput!) {
    updateAttribute(id: $id, data: $input) {
      result {
        ...AttributeDetails
      }
      errors {
        ...Error
      }
    }
  }
`);

export const deleteValue = gql(`
  mutation ValueDelete(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    deleteValue(id: $id) {
      result {
        id
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...ValueList
        }
      }
      errors {
        ...Error
      }
    }
  }
`);

export const updateValueMutation = gql(`
  mutation ValueUpdate(
    $id: ID!
    $input: ValueUpdateInput!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    updateValue(id: $id, data: $input) {
      result {
        id
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...ValueList
        }
      }
      errors {
        ...Error
      }
    }
  }
`);

export const valueCreateMutation = gql(`
  mutation ValueCreate(
    $id: ID!
    $input: ValueCreationInput!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    createValue(attributeId: $id, data: $input) {
      result {
        id
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...ValueList
        }
      }
      errors {
        ...Error
      }
    }
  }
`);

export const attributeCreateMutation = gql(`
  mutation AttributeCreate($input: AttributeCreationInput!) {
    createAttribute(data: $input) {
      result {
        id
      }
      errors {
        ...Error
      }
    }
  }
`);

export const valueReorderMutation = gql(`
  mutation ValueReorder(
    $id: ID!
    $move: ReorderInput!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    reorderValues(attributeId: $id, moves: [$move]) {
      result {
        id
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          pageInfo {
            ...PageInfo
          }
          edges {
            cursor
            node {
              id
            }
          }
        }
      }
      errors {
        ...Error
      }
    }
  }
`);
