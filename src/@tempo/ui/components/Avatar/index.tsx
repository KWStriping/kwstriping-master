import MuiAvatar from '@mui/material/Avatar';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

export interface AvatarProps {
  /** User initials, e.g. John Smith = JS */
  initials: string;
  /** URL to the user avatar image */
  avatar?: string;
}

export const Avatar: FC<AvatarProps> = ({ initials, avatar }) => {
  if (avatar) {
    return <MuiAvatar className={styles.avatar ?? ''} alt="user" src={avatar} />;
  }

  return (
    <div className={clsx(styles.avatar, styles.avatarPlaceholder)}>
      <div className={styles.avatarInitials ?? ''}>{initials}</div>
    </div>
  );
};
