import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import MuiButton from '@mui/material/Button';
import clsx from 'clsx';
import type { ElementType, FC } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.css';

export type ButtonProps<T extends ElementType = 'button'> = MuiButtonProps<T>;

export const Button: FC<ButtonProps> = forwardRef(
  (
    { className, color = 'primary', variant = 'contained', size = 'medium', children, ...props },
    ref
  ) => {
    return (
      <MuiButton
        ref={ref}
        className={clsx(styles.button, className)}
        variant={variant}
        color={color}
        size={size}
        disableRipple
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = 'RawButton';

export default Button;
