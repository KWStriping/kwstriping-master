import type { PermissionCode } from '@core/api/graphql';
import type IconProps from '@mui/material/IconProps';

export interface MenuItem {
  description: string;
  icon: ReactElement<IconProps>;
  permissions?: PermissionCode[];
  title: string;
  url?: string;
  testId?: string;
}

export interface MenuSection {
  label: string;
  menuItems: MenuItem[];
}
