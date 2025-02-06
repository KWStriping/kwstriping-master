import type { Side } from '@floating-ui/react-dom-interactions';
import { useColorScheme } from '@mui/material/styles';
import clsx from 'clsx';
import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import styles from './Arrow.module.css';
import type { TooltipProps } from './Tooltip';

interface ArrowProps {
  x: number | undefined;
  y: number | undefined;
  side: Side;
  variant: TooltipProps['variant'];
  // ref: ForwardedRef<HTMLDivElement>;
}

export const Arrow: ForwardRefExoticComponent<ArrowProps & RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, ArrowProps>(({ x, y, side, variant }, ref) => {
    const { mode } = useColorScheme();
    // const styles = useArrowStyles({ variant, side });

    return (
      <div
        className={clsx(styles.arrowContainer, mode === 'dark' && styles.dark)}
        ref={ref}
        style={{
          top: y ?? '',
          left: x ?? '',
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 8" fill="none">
          <path
            className={styles.backgroundPath ?? ''}
            fillRule="evenodd"
            d="M12.25 7 8.6 2.133a2 2 0 0 0-3.2 0L1.75 7h10.5Z"
            clipRule="evenodd"
          />
          <path
            className={styles.borderPath ?? ''}
            fillRule="evenodd"
            d="M5.8 2.433c.6-.8 1.8-.8 2.4 0L11.25 6.5h1.25L9 1.833a2.5 2.5 0 0 0-4 0L1.5 6.5h1.25L5.8 2.433Z"
            clipRule="evenodd"
          />
          <path className={styles.backgroundPath ?? ''} d="M12.5 6.5h-11l-.75 1h12.5l-.75-1Z" />
        </svg>
      </div>
    );
  });
Arrow.displayName = 'Arrow';
