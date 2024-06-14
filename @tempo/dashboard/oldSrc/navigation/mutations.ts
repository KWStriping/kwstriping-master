import { gql } from '@tempo/api';

export const createMenu = gql(`
  mutation MenuCreate($input: MenuCreationInput!) {
    createMenu(data: $input) {
      errors {
        ...Error
      }
      result {
        id
      }
    }
  }
`);

export const deleteMenus = gql(`
  mutation MenuBulkDelete($ids: [ID!]!) {
    deleteMenus(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const deleteMenu = gql(`
  mutation MenuDelete($id: ID!) {
    deleteMenu(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const createMenuItem = gql(`
  mutation MenuItemCreate($input: MenuItemCreationInput!) {
    createMenuItem(data: $input) {
      errors {
        ...Error
      }
      result {
        menu {
          id
          items {
            ...MenuItemNested
          }
        }
      }
    }
  }
`);

export const updateMenu = gql(`
  mutation MenuUpdate(
    $id: ID!
    $name: String!
    $moves: [MenuItemMoveInput!]!
    $removeIds: [ID!]!
  ) {
    updateMenu(id: $id, data: { name: $name }) {
      errors {
        ...Error
      }
    }

    moveMenuItem(menuId: $id, moves: $moves) {
      errors {
        ...Error
      }
    }

    deleteMenuItems(ids: $removeIds) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateMenuItem = gql(`
  mutation MenuItemUpdate($id: ID!, $input: MenuItemInput!) {
    updateMenuItem(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...MenuItem
      }
    }
  }
`);
