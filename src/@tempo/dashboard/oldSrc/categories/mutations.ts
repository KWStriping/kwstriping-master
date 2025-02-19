import { gql } from '@tempo/api/gql';

export const deleteCategoryMutation = gql(`
  mutation CategoryDelete($id: ID!) {
    deleteCategory(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);
export const createCategoryMutation = gql(`
  mutation CategoryCreate($parentId: ID, $input: CategoryInput!) {
    createCategory(parentId: $parentId, data: $input) {
      result {
        ...CategoryDetails
      }
      errors {
        ...Error
      }
    }
  }
`);

export const updateCategoryMutation = gql(`
  mutation CategoryUpdate($id: ID!, $input: CategoryInput!) {
    updateCategory(id: $id, data: $input) {
      result {
        ...CategoryDetails
      }
      errors {
        ...Error
      }
    }
  }
`);

export const deleteCategoriesMutation = gql(`
  mutation CategoryBulkDelete($ids: [ID!]!) {
    deleteCategories(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);
