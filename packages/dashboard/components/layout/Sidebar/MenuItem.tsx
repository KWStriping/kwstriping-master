import Link from '@core/ui/components/Link';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Menu from '@mui/material/Menu';
import MuiMenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Image from 'next/image';
import type { MouseEvent, FC } from 'react';
import { useRef, useState } from 'react';
import styles from './MenuItem.module.css';
import type { CustomLinkComponent, SidebarMenuItem } from './types';
import { getLinkProps } from './utils';

export interface MenuItemCommonProps {
  activeId: Maybe<string>;
  shrunk: boolean;
  menuItem: SidebarMenuItem;
}

export type MenuItemProps = MenuItemCommonProps &
  (
    | {
        onClick: (menuItem: SidebarMenuItem) => void;
        linkComponent?: never;
      }
    | {
        onClick?: never;
        linkComponent: CustomLinkComponent;
      }
  );

export const MenuItem: FC<MenuItemProps> = ({ activeId, menuItem, shrunk, onClick }) => {
  const [open, setOpen] = useState(false);
  const anchor = useRef<HTMLAnchorElement | null>(null);

  const handleClick = (event: MouseEvent, menuItem: SidebarMenuItem) => {
    event.stopPropagation();
    if (menuItem.children) {
      setOpen(true);
    } else {
      if (onClick) onClick(menuItem);
      if (menuItem.onClick) menuItem.onClick();
      setOpen(false);
    }
  };

  return (
    <>
      <Link
        className={clsx(
          styles.menuItem ?? '',
          !!activeId &&
            [
              menuItem.id,
              ...(menuItem.children?.map((subMenu) => subMenu.id) || []),
            ].includes(activeId) &&
            styles.menuItemActive
        )}
        ref={anchor}
        onClick={(event: MouseEvent) => handleClick(event, menuItem)}
        title={menuItem.label}
        {...getLinkProps(menuItem)}
      >
        <span
          className={clsx(styles.menuItemBtn, !shrunk && 'gap-3')}
          data-test="menu-item-label"
          data-test-id={menuItem.id}
        >
          {menuItem.icon ? (
            typeof menuItem.icon === 'string' ? (
              <Image
                className={styles.icon ?? ''}
                src={menuItem.icon}
                alt={menuItem.ariaLabel ?? menuItem.label}
              />
            ) : (
              menuItem.icon({ className: styles.icon })
            )
          ) : null}
          <Typography
            aria-label={menuItem.ariaLabel}
            className={clsx(styles.label, styles.labelRoot ?? '', shrunk && 'w-0 opacity-0')}
            variant="body2"
          >
            {menuItem.label}
          </Typography>
        </span>
        {!!menuItem.children?.length && (open ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
      </Link>
      {!!menuItem.children?.length && (
        <Menu
          className={'transition'}
          open={open}
          anchorEl={anchor.current}
          onClose={() => setOpen(false)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{ sx: { minWidth: 156 } }}
        >
          {menuItem.children.map((subMenuItem) => {
            if (subMenuItem.url || subMenuItem.children) {
              const linkProps = getLinkProps(subMenuItem);
              return (
                <MuiMenuItem
                  aria-label={subMenuItem.ariaLabel}
                  component={Link}
                  className={clsx(styles.label, styles.subMenuLabel)}
                  key={subMenuItem.url}
                  onClick={(event: MouseEvent) => handleClick(event, subMenuItem)}
                  data-test="submenu-item-label"
                  data-test-id={subMenuItem.id}
                  selected={activeId === subMenuItem.id}
                  {...linkProps}
                >
                  {subMenuItem.label}
                </MuiMenuItem>
              );
            }

            return (
              <Typography
                key={subMenuItem.label}
                variant="caption"
                className={styles.subMenuHeader ?? ''}
              >
                {subMenuItem.label}
              </Typography>
            );
          })}
        </Menu>
      )}
    </>
  );
};

MenuItem.displayName = 'MenuItem';
