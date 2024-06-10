import type { SidebarMenuItem } from './types';

export const getLinkProps = (menuItem: SidebarMenuItem) => {
  if (menuItem.external) {
    return { href: menuItem.url, target: '_blank' };
  }
  if (menuItem.url) {
    return {
      href: menuItem.url,
    };
  }
  return {};
};
