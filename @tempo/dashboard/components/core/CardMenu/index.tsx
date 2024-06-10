import * as m from '@paraglide/messages';
import type { IconButtonProps } from '@tempo/ui/components/buttons/IconButton';
import { IconButton } from '@tempo/ui/components/buttons/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CircularProgress from '@mui/material/CircularProgress';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { ElementType, FC, KeyboardEvent, ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';
import styles from './index.module.css';

// const ITEM_HEIGHT = 48;

export interface CardMenuItem {
  disabled?: boolean;
  label: string;
  testId?: string;
  onSelect: () => void;
  loading?: boolean;
  withLoading?: boolean;
  hasError?: boolean;
  Icon?: ReactElement;
}

export interface CardMenuProps {
  className?: string;
  disabled?: boolean;
  menuItems: CardMenuItem[];
  outlined?: boolean;
  Icon?: ElementType<{}>;
  IconButtonProps?: IconButtonProps;
}

const CardMenu: FC<CardMenuProps> = (props) => {
  const {
    className,
    disabled,
    menuItems,
    outlined,
    Icon: icon,
    IconButtonProps = {},
    ...rest
  } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  useEffect(() => {
    const hasAnyItemsLoadingOrWithError = menuItems
      ?.filter(({ withLoading }) => withLoading)
      ?.some(({ loading, hasError }) => loading || hasError);

    if (!hasAnyItemsLoadingOrWithError) {
      setOpen(false);
    }
  }, [menuItems]);

  const handleMenuClick = (index: number) => {
    const selectedItem = menuItems[index];
    selectedItem?.onSelect();

    if (!selectedItem?.withLoading) {
      setOpen(false);
    }
  };

  const isWithLoading = menuItems.some(({ withLoading }) => withLoading);

  const Icon = icon ?? SettingsIcon;

  return (
    <div className={className} {...rest}>
      <IconButton
        data-test-id="show-more-button"
        aria-label="More"
        aria-owns={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        disabled={disabled}
        ref={anchorRef}
        onClick={handleToggle}
        variant={outlined ? 'primary' : 'secondary'}
        state={open ? 'active' : 'default'}
        {...IconButtonProps}
      >
        <Icon />
      </IconButton>
      <Popper
        placement="bottom-end"
        className={styles.container ?? ''}
        open={open}
        anchorEl={anchorRef.current}
        transition
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
              overflowY: 'auto',
            }}
          >
            <Paper className={styles.paper ?? ''} elevation={8}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {menuItems.map((menuItem, menuItemIndex) => (
                    <MenuItem
                      data-test-id={menuItem.testId}
                      disabled={menuItem.loading || menuItem.disabled}
                      onClick={() => handleMenuClick(menuItemIndex)}
                      key={menuItem.label}
                    >
                      <div className={clsx(className, isWithLoading && styles.loadingContent)}>
                        {menuItem.loading ? (
                          <>
                            <Typography variant="subtitle1">
                              {m.dashboard_cardMenuItemLoading() ?? 'working...'}
                            </Typography>
                            <CircularProgress size={24} />
                          </>
                        ) : (
                          <Typography>{menuItem.label}</Typography>
                        )}
                      </div>
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
CardMenu.displayName = 'CardMenu';
export default CardMenu;
