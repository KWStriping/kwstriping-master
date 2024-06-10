import type { MenuItemProps } from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
import type { FC, MouseEvent } from 'react';

import { useUserChipMenu } from './context';

export interface UserChipMenuItemProps extends Omit<MenuItemProps, 'button'> {
  leaveOpen?: boolean;
}

export const UserChipMenuItem: FC<UserChipMenuItemProps> = ({ leaveOpen, onClick, ...props }) => {
  const closeMenu = useUserChipMenu();

  // We're not really interested in event type here
  const handleClickWithClose = (event: MouseEvent<HTMLLIElement>) => {
    closeMenu();
    if (onClick) {
      onClick(event);
    }
  };

  return <MenuItem {...props} onClick={leaveOpen ? onClick : handleClickWithClose} />;
};
UserChipMenuItem.displayName = 'UserChipMenuItem';
