import type {
  MenuItemCreationInput,
  MenuItemFragment,
  MenuItemInput,
  MenuItemMoveInput,
} from '@tempo/api/generated/graphql';
import type { MenuDetailsSubmitData } from '@tempo/dashboard/components/navigation/MenuDetailsPage';
import type { MenuItemDialogFormData } from '@tempo/dashboard/components/navigation/MenuItemDialog';
import { unknownTypeError } from '@tempo/dashboard/components/navigation/MenuItems';

export function getMenuItemInputData(data: MenuItemDialogFormData): MenuItemInput {
  const variables: MenuItemInput = {
    name: data?.name,
  };
  switch (data?.type) {
    case 'category':
      variables.category = data?.id;
      break;

    case 'collection':
      variables.collection = data?.id;
      break;

    case 'page':
      variables.page = data?.id;
      break;

    case 'link':
      variables.url = data?.id;
      break;

    default:
      throw unknownTypeError;
  }

  return variables;
}

export function getMenuItemCreationInputData(
  menu: string,
  data: MenuItemDialogFormData
): MenuItemCreationInput {
  const variables: MenuItemCreationInput = {
    menu,
    name: data?.name,
  };
  switch (data?.type) {
    case 'category':
      variables.category = data?.id;
      break;

    case 'collection':
      variables.collection = data?.id;
      break;

    case 'page':
      variables.page = data?.id;
      break;

    case 'link':
      variables.url = data?.id;
      break;

    default:
      throw unknownTypeError;
  }

  return variables;
}

export function getInitialDisplayValue(item: MenuItemFragment): string {
  if (!item) {
    return '...';
  }
  if (item.category) {
    return item.category.name;
  } else if (item.collection) {
    return item.collection.name;
  } else if (item.page) {
    return item.page.title;
  } else if (item.url) {
    return item.url;
  } else {
    return '';
  }
}

export function getMoves(data: MenuDetailsSubmitData): MenuItemMoveInput[] {
  return data?.operations
    .filter((operation) => operation.type === 'move')
    .map((move) => ({
      itemId: move.id,
      parentId: move.parentId,
      sortOrder: move.sortOrder,
    }));
}

export function getRemoveIds(data: MenuDetailsSubmitData): string[] {
  return data?.operations
    .filter((operation) => operation.type === 'remove')
    .map((operation) => operation.id);
}
