import { Avatar } from '@core/ui/components/Avatar';
import { LayoutButton } from '@core/ui/components/buttons/LayoutButton';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Hidden from '@mui/material/Hidden';
import Menu from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import { useState, useRef } from 'react';
import type { FC, ReactNode } from 'react';

import { UserChipMenuContext } from './context';
import styles from './UserChipMenu.module.css';

export interface UserChipProps {
  avatar: Maybe<string>;
  initials: string;
  name: string;
  subtext?: string;
  open?: boolean;
  children?: ReactNode;
}

export const UserChipMenu: FC<UserChipProps> = ({
  avatar,
  initials,
  name,
  subtext,
  children,
  open = false,
  ...props
}) => {
  const [isMenuOpened, setMenuState] = useState(open);
  const anchor = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setMenuState(false);

  return (
    <>
      <LayoutButton
        className={styles.userChip ?? ''}
        ref={anchor}
        onClick={() => setMenuState(!isMenuOpened)}
        data-test="userMenu"
        state={isMenuOpened ? 'active' : 'default'}
        {...props}
      >
        <Avatar avatar={avatar as string | undefined} initials={initials} />
        <div className={styles.labelContainer ?? ''}>
          <Hidden mdDown>
            <div>
              <Typography className={styles.label ?? ''} variant="body2">
                {name}
              </Typography>
              {subtext && (
                <Typography className={styles.label ?? ''} variant="body2" color="textSecondary">
                  {subtext}
                </Typography>
              )}
            </div>
          </Hidden>
        </div>
      </LayoutButton>
      <Popper
        className={styles.popover ?? ''}
        open={isMenuOpened}
        anchorEl={anchor.current}
        transition
        placement="bottom-end"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={closeMenu} mouseEvent="onClick">
                <Menu disablePadding>
                  <UserChipMenuContext.Provider value={closeMenu}>
                    {children}
                  </UserChipMenuContext.Provider>
                </Menu>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
UserChipMenu.displayName = 'UserChip';
