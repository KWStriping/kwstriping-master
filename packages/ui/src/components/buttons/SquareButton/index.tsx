import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import clsx from 'clsx';
import type { FC } from 'react';
import { forwardRef } from 'react';

import styles from './index.module.css';

export const SquareButton: FC<ButtonBaseProps> = forwardRef(({ className, ...rest }, ref) => {
  return (
    <ButtonBase
      className={clsx(styles.root, className, rest.disabled && styles.disabled)}
      disableRipple
      ref={ref}
      {...rest}
    />
  );
});

SquareButton.displayName = 'SquareButton';
