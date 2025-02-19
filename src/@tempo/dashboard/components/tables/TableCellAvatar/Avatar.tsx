import { ImageIcon } from '@tempo/ui/icons';
import { Avatar as MuiAvatar } from '@mui/material';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

export const AVATAR_MARGIN = 40;

export interface AvatarProps {
  thumbnail?: string;
  alignRight?: boolean;
  avatarProps?: string;
  children?: ReactNode | ReactNode[];
  badge?: ReactNode;
}

const Avatar: FC<AvatarProps> = ({ children, alignRight, thumbnail, avatarProps, badge }) => {
  return (
    <div className={clsx(styles.content, alignRight && styles.alignRight)}>
      {badge}
      {!thumbnail ? (
        <MuiAvatar className={clsx(styles.avatar, avatarProps)}>
          <ImageIcon color="primary" data-test-id="imageIcon" />
        </MuiAvatar>
      ) : (
        <MuiAvatar className={clsx(styles.avatar, avatarProps)} src={thumbnail} />
      )}
      {!alignRight && <div className={styles.children ?? ''}>{children}</div>}
    </div>
  );
};

export default Avatar;
