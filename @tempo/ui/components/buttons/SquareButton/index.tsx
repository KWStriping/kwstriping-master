import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import clsx from 'clsx';
import { forwardRef } from 'react';

import styles from './index.module.css';

export const SquareButton = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  ({ className, ...rest }: ButtonBaseProps, ref) => {
    return (
      <ButtonBase
        className={clsx(styles.root, className, rest.disabled && styles.disabled)}
        disableRipple
        ref={ref}
        {...rest}
      />
    );
  }
);

SquareButton.displayName = 'SquareButton';
