import type { ButtonBaseProps } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import clsx from 'clsx';
import { forwardRef } from 'react';
import type { ElementType, ForwardedRef } from 'react';

import styles from './index.module.css';
import type { UserInteraction } from '@tempo/ui/utils';

export type LayoutButtonProps<T extends ElementType> = ButtonBaseProps<T, { component?: T }> & {
  state?: UserInteraction;
};

export const LayoutButtonInner = <T extends ElementType = 'button'>(
  { className, children, state = 'default', component, ...rest }: LayoutButtonProps<T>,
  ref: ForwardedRef<HTMLButtonElement>
) => {
  return (
    <ButtonBase
      className={clsx(
        styles.root ?? '',
        className,
        state === 'hover' && (styles.hover ?? ''),
        state === 'active' && styles.active
      )}
      component={component}
      disableRipple
      ref={ref}
      {...rest}
    >
      {children}
    </ButtonBase>
  );
};
LayoutButtonInner.displayName = 'LayoutButton';

export const LayoutButton = forwardRef(LayoutButtonInner);
