import type { MenuItemFragment } from '@tempo/api/generated/graphql';
import type { usePaths } from '@tempo/ui/providers/PathsProvider';

const ALLOW_ROOT_LEVEL_PATHS = true;

const BASE_URL = process.env.NEXT_PUBLIC_STOREFRONT_URL || '';

export const getLinkPath = (
  item: Pick<MenuItemFragment, 'category' | 'collection' | 'page' | 'url'>,
  paths: ReturnType<typeof usePaths>
) => {
  if (item.category) {
    return paths.categoryBySlug(item.category?.slug);
  }
  if (item.collection) {
    return paths.collectionBySlug(item.collection?.slug);
  }
  if (item.page) {
    return paths.pageBySlug(item.page?.slug);
  }
  if (item.url) {
    let path = item.url;
    if (path.startsWith(BASE_URL)) path = path.replace(BASE_URL, '');
    path = path.charAt(0) === '/' ? path.substr(1) : path;
    return ALLOW_ROOT_LEVEL_PATHS ? `/${path}` : paths.pageBySlug(path);
  }

  return paths.home();
};

export default getLinkPath;
