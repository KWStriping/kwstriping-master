import type { UserDetailsFragment } from '@tempo/api/generated/graphql';
import { useLogout } from '@tempo/api/auth/react/hooks';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import styles from './index.module.css';
import NavIconButton from './NavIconButton';

interface UserMenuProps extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  user: Maybe<Pick<UserDetailsFragment, 'avatar' | 'firstName' | 'isStaff'>>;
}

const DASHBOARD_URL = process.env.NEXT_PUBLIC_DASHBOARD_URL ?? '';

function UserMenu({ user, className, ...rest }: UserMenuProps) {
  const { logout } = useLogout();
  return (
    <div className={clsx(styles['user-menu-container'], className)} {...rest}>
      {user?.avatar?.url ? (
        <Avatar alt={`${user.firstName}'s avatar`} src={`${user.avatar.url}`} />
      ) : (
        <NavIconButton icon="user" aria-hidden="true" />
      )}
      <div className={styles['user-menu'] ?? ''}>
        <MenuItem className={styles['user-menu-item'] ?? ''}>
          <Link href={'/account/preferences'} tabIndex={0}>
            <Typography>{'Account preferences'}</Typography>
          </Link>
        </MenuItem>
        <Divider />
        <MenuItem className={styles['user-menu-item'] ?? ''}>
          {user?.isStaff && DASHBOARD_URL && (
            <Typography component="a" href={DASHBOARD_URL}>
              {'Dashboard'}
            </Typography>
          )}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => logout()}
          tabIndex={-1}
          className={styles['user-menu-item'] ?? ''}
        >
          <Typography>{'Log out'}</Typography>
        </MenuItem>
      </div>
    </div>
  );
}

export default UserMenu;
