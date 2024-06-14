import type { ChipProps } from '@mui/material/Chip';
import Chip from '@mui/material/Chip';
import clsx from 'clsx';
import { forwardRef } from 'react';
import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import styles from './index.module.css';

export type PillColor = ChipProps['color'];

export interface PillProps
  extends Omit<
    ChipProps,
    | 'onDelete'
    | 'avatar'
    | 'disabled'
    | 'deleteIcon'
    | 'disabled'
    | 'classes'
    | 'clickable'
    | 'css'
    | 'ref'
  > {
  active?: boolean;
  outlined?: boolean;
}

export const Pill: ForwardRefExoticComponent<PillProps & RefAttributes<HTMLDivElement>> =
  forwardRef<HTMLDivElement, PillProps>(
    ({ active, className, color = 'info', outlined, onClick, size, ...rest }, ref) => {
      return (
        <Chip
          color={color}
          classes={{
            root: clsx(
              className,
              styles.root ?? '',
              active && (styles.active ?? ''),
              outlined && (styles.outlined ?? ''),
              size === 'small' && (styles.small ?? ''),
              !!onClick && styles.clickable
            ),
            label: styles.label ?? '',
            labelSmall: styles.labelSmall ?? '',
          }}
          // There is no other way to disable ripple
          clickable={false}
          component={onClick ? 'button' : 'div'}
          onClick={onClick}
          size={size}
          ref={ref}
          {...rest}
        />
      );
    }
  );

Pill.displayName = 'Pill';

export default Pill;
