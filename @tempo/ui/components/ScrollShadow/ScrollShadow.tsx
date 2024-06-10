import clsx from 'clsx';
import type { DetailedHTMLProps, HTMLAttributes, FC } from 'react';
import { useStyles } from './styles';

export interface ScrollShadowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  show: boolean;
  variant: 'bottom' | 'top';
}

export const ScrollShadow: FC<ScrollShadowProps> = ({ show, variant, children, ...props }) => {
  const styles = useStyles();

  if (variant === 'bottom') {
    return (
      <>
        <div {...props} className={clsx(styles.root, show && styles.bottom)}>
          {children}
        </div>
      </>
    );
  }

  return (
    <div {...props} className={clsx(styles.root, show && styles.top)}>
      {children}
    </div>
  );
};
ScrollShadow.displayName = 'ScrollShadow';
