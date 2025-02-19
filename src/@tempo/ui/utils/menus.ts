import type { MenuItemWithChildrenFragment } from '@tempo/api/generated/graphql';

const ALLOW_ROOT_LEVEL_PATHS = true;

const BASE_URL = process.env.NEXT_PUBLIC_STOREFRONT_URL || '';

export const getLinkPath = (item: Omit<MenuItemWithChildrenFragment, '__typename'>) => {
  if (item.category) {
    return `/catalog/${item.category?.slug}`;
  }
  if (item.collection) {
    return `/collections/${item.collection?.slug}`;
  }
  if (item.page) {
    return `/pages/${item.page?.slug}`;
  }
  if (item.url) {
    let path = item.url;
    if (path.startsWith(BASE_URL)) path = path.replace(BASE_URL, '');
    path = path.charAt(0) === '/' ? path.substr(1) : path;
    return ALLOW_ROOT_LEVEL_PATHS ? `/${path}` : `/pages/${path}`;
  }

  return '/';
};

export default getLinkPath;
