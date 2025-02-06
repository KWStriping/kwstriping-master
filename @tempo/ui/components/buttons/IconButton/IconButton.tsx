import ButtonBase from '@mui/material/ButtonBase';
import type {
  IconButtonProps as MuiIconButtonProps,
  IconButtonTypeMap as MuiIconButtonTypeMap,
} from '@mui/material/IconButton';
import MuiIconButton from '@mui/material/IconButton';
import type { OverrideProps } from '@mui/material/OverridableComponent';
import clsx from 'clsx';
import type { ElementType } from 'react';
import { forwardRef } from 'react';

import styles from './index.module.css';

type UserInteraction = 'default' | 'hover' | 'active';

export interface IconButtonInnerProps {
  error?: boolean;
  hoverOutline?: boolean;
  state?: UserInteraction;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export interface IconButtonTypeMap<P = any, D extends ElementType = 'button'> {
  props: Omit<MuiIconButtonTypeMap<P, D>['props'], 'variant'> &
    IconButtonInnerProps & { href?: string } & OverrideProps<MuiIconButtonTypeMap<P, D>, 'a'>;
  defaultComponent: D;
  classKey: never;
}

export type IconButtonProps<T extends ElementType = 'button'> = MuiIconButtonProps<
  T,
  { component?: T }
> &
  IconButtonInnerProps & { href?: string };

const _IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, error, hoverOutline = true, variant = 'primary', state = 'default', ...props },
    ref
  ) => {
    if (variant === 'ghost' || variant === 'secondary') {
      return (
        <ButtonBase
          ref={ref}
          className={clsx(
            styles[variant],
            className,
            hoverOutline && !props.disabled && (styles.hoverOutline ?? ''),
            state === 'hover' && !props.disabled && (styles.hover ?? ''),
            state === 'active' && !props.disabled && (styles.active ?? ''),
            error && (styles.error ?? ''),
            error && props.disabled && styles.disabledError
          )}
          disableRipple
          {...props}
        />
      );
    }

    return (
      <MuiIconButton
        ref={ref}
        className={clsx(
          styles.primary ?? '',
          className,
          state === 'hover' && !props.disabled && (styles.hover ?? ''),
          state === 'active' && !props.disabled && (styles.active ?? ''),
          error && (styles.error ?? ''),
          error && props.disabled && styles.disabledError
        )}
        disableRipple
        {...props}
      />
    );
  }
);
_IconButton.displayName = 'Button';

export const IconButton = _IconButton;
export default IconButton;
