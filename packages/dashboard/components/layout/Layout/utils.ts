import type { SidebarMenuItem } from '@dashboard/components/layout/Sidebar/types';

export function isMenuActive(location: string, menuItem: SidebarMenuItem): boolean {
  if (menuItem.children) {
    return menuItem.children.reduce(
      (acc, subMenuItem) => acc || isMenuActive(location, subMenuItem),
      false
    );
  }

  if (!menuItem.url) {
    return false;
  }

  const activeUrl = location.split('?')[0];
  const menuItemUrl =
    typeof menuItem.url === 'string' ? menuItem.url.split('?')[0] : menuItem.url;

  if (activeUrl === '/orders/drafts'.split('?')[0] && menuItemUrl === '/orders'.split('?')[0]) {
    return false;
  }
  return activeUrl === menuItemUrl;
}
