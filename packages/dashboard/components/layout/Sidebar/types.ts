import type { ForwardRefExoticComponent, ReactNode, FC } from 'react';

export interface SidebarMenuItem {
  label: string;
  id: string;
  ariaLabel?: string;
  children?: SidebarMenuItem[];
  icon?: string | FC;
  url?: string;
  external?: boolean;
  onClick?: () => void;
}

export type CustomLinkComponent = ForwardRefExoticComponent<{
  href?: string;
  onClick?: (...params: unknown) => void;
  className?: string;
}>;

export interface BaseSidebarProps {
  className?: string;
  menuItems: SidebarMenuItem[];
  toolbar?: ReactNode;
  onMenuItemClick: (menuItem: SidebarMenuItem) => void;
  linkComponent?: CustomLinkComponent;
  logoHref?: string;
}
