import Link from '@core/ui/components/Link';
import Typography from '@mui/material/Typography';

import Image from 'next/image';
import type { FC } from 'react';
import type { SidebarMenuItem } from '../Sidebar/types';
import { getLinkProps } from '../Sidebar/utils';
import styles from './index.module.css';

export interface MenuItemBtnProps {
  menuItem: SidebarMenuItem;
  onClick: (menuItem: SidebarMenuItem) => void;
}

export const MenuItemBtn: FC<MenuItemBtnProps> = ({ menuItem, onClick }) => {
  const linkProps = getLinkProps(menuItem);

  return (
    <Link
      className={styles.menuItemBtn ?? ''}
      data-test="menu-item-label"
      data-test-id={menuItem.id}
      onClick={() => onClick(menuItem)}
      {...linkProps}
    >
      {menuItem.icon &&
        (typeof menuItem.icon === 'string' ? (
          <Image src={menuItem.icon} alt={menuItem.ariaLabel ?? menuItem.label} />
        ) : (
          menuItem.icon({ className: styles.icon })
        ))}
      <Typography component="span" aria-label={menuItem.ariaLabel} className={styles.label ?? ''}>
        {menuItem.label}
      </Typography>
    </Link>
  );
};

MenuItemBtn.displayName = 'MenuItemBtn';
