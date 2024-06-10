import { gql } from '@tempo/api/gql';

export const menuFragment = gql(`
  fragment Menu on Menu {
    id
    name
    items {
      id
    }
  }
`);

// GraphQL does not support recurive fragments
export const menuItemNestedFragment = gql(`
  fragment MenuItemNested on MenuItem {
    ...MenuItem
    children {
      ...MenuItem
      children {
        ...MenuItem
        children {
          ...MenuItem
          children {
            ...MenuItem
            children {
              ...MenuItem
              children {
                ...MenuItem
              }
            }
          }
        }
      }
    }
  }
`);

export const menuDetailsFragment = gql(`
  fragment MenuDetails on Menu {
    id
    items {
      ...MenuItemNested
    }
    name
  }
`);
