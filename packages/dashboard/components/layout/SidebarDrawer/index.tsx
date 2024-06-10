import { SquareButton } from '@core/ui/components/buttons/SquareButton';
import Link from '@core/ui/components/Link';
import { Logo } from '@core/ui/icons/Logo';
import { LogoDark } from '@core/ui/icons/LogoDark';
import { useColorScheme } from '@core/ui/theme/styles';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Image from 'next/image';
import type { FC } from 'react';
import { useState, useRef } from 'react';

import type { BaseSidebarProps, SidebarMenuItem } from '../Sidebar/types';
import styles from './index.module.css';
import { MenuItemBtn } from './MenuItemBtn';

export * from './MenuItemBtn';

export type SideBarDrawerProps = BaseSidebarProps;

export const SidebarDrawer: FC<SideBarDrawerProps> = ({
  menuItems,
  onMenuItemClick,
  logoHref,
}) => {
  const [isOpened, setOpened] = useState(false);
  const [activeMenu, setActiveMenu] = useState<SidebarMenuItem | null>(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const container = useRef<HTMLDivElement | null>(null);
  const { mode } = useColorScheme();

  const handleMenuItemClick = (menuItem: SidebarMenuItem) => {
    setOpened(false);
    setShowSubmenu(false);
    onMenuItemClick(menuItem);
  };

  const handleMenuItemWithChildrenClick = (menuItem: SidebarMenuItem) => {
    setActiveMenu(menuItem);
    setShowSubmenu(true);
    container.current?.scrollTo({
      top: 0,
    });
  };

  return (
    <>
      <SquareButton onClick={() => setOpened(true)}>
        <MenuIcon />
      </SquareButton>
      <Drawer
        PaperProps={{ className: styles.root }}
        open={isOpened}
        onClose={() => setOpened(false)}
      >
        <div
          className={clsx(styles.container, showSubmenu && styles.containerSubMenu)}
          ref={container}
        >
          <div
            className={clsx(styles.innerContainer, showSubmenu && styles.secondaryContentActive)}
          >
            <div className={styles.content ?? ''}>
              <Link href={logoHref} className={styles.logo ?? ''}>
                {mode === 'dark' ? <LogoDark /> : <Logo />}
              </Link>
              {menuItems.map((menuItem) => (
                <MenuItemBtn
                  menuItem={menuItem}
                  onClick={
                    menuItem.children
                      ? () => handleMenuItemWithChildrenClick(menuItem)
                      : handleMenuItemClick
                  }
                  key={menuItem.ariaLabel}
                />
              ))}
            </div>
            {activeMenu && (
              <div className={styles.content ?? ''}>
                <div className={styles.subMenuTopBar ?? ''}>
                  <div className={styles.activeMenuLabel ?? ''}>
                    {activeMenu.icon &&
                      (typeof activeMenu.icon === 'string' ? (
                        <Image
                          src={activeMenu.icon}
                          className={styles.icon ?? ''}
                          alt={activeMenu.ariaLabel ?? activeMenu.label}
                        />
                      ) : (
                        activeMenu.icon({ className: styles.icon })
                      ))}
                    <Typography className={styles.label ?? ''}>{activeMenu.label}</Typography>
                  </div>
                  <SquareButton onClick={() => setShowSubmenu(false)}>
                    <ArrowLeftIcon />
                  </SquareButton>
                </div>
                {activeMenu.children?.map((subMenuItem) => {
                  if (subMenuItem.url || subMenuItem.children) {
                    return (
                      <MenuItemBtn
                        menuItem={subMenuItem}
                        onClick={handleMenuItemClick}
                        key={subMenuItem.ariaLabel}
                      />
                    );
                  }

                  return (
                    <Typography
                      key={subMenuItem.ariaLabel}
                      variant="caption"
                      className={styles.subMenuHeader ?? ''}
                    >
                      {subMenuItem.label}
                    </Typography>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

SidebarDrawer.displayName = 'SideBarDrawer';
export default SidebarDrawer;
