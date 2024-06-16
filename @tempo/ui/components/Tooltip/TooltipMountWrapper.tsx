import { forwardRef } from 'react';
import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import styles from './TooltipMountWrapper.module.css';

// import { useMountWrapperStyles } from './styles';

export interface MountWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children: ReactNode;
}

/** Component used to wrap non-buttons for Tooltip support */
export const TooltipMountWrapper = forwardRef<HTMLButtonElement, { children: ReactNode }>(
  ({ children, ...props }, ref) => {
    // const styles = useMountWrapperStyles();

    return (
      <button className={styles.wrapper ?? ''} {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

TooltipMountWrapper.displayName = 'TooltipMountWrapper';
