import { SquareButton } from '@tempo/ui/components/buttons/SquareButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { ButtonProps } from '@mui/material/Button';
import clsx from 'clsx';
import type { FC } from 'react';

import styles from './index.module.css';

export interface ExpandButtonProps extends ButtonProps {
  isShrunk: boolean;
}

export const ExpandButton: FC<ExpandButtonProps> = ({ isShrunk, ...rest }) => {
  return (
    <SquareButton disableRipple {...rest}>
      <ExpandMoreIcon className={clsx(styles.arrow, !isShrunk && styles.shrunk)} />
    </SquareButton>
  );
};

ExpandButton.displayName = 'ExpandButton';
