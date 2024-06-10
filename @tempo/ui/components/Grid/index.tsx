import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

export type GridVariant = 'default' | 'inverted' | 'uniform';
export interface GridProps {
  children: ReactNode[] | ReactNode;
  className?: string;
  variant?: GridVariant;
  richText?: boolean;
}

export const Grid: FC<GridProps> = (props) => {
  const { className, children, variant, richText } = props;
  return (
    <div
      className={clsx(
        className,
        styles.root ?? '',
        variant === 'default' && (styles.default ?? ''),
        variant === 'inverted' && (styles.inverted ?? ''),
        variant === 'uniform' && (styles.uniform ?? ''),
        richText && styles.richText
      )}
    >
      {children}
    </div>
  );
};
Grid.displayName = 'Grid';
Grid.defaultProps = {
  variant: 'default',
};
export default Grid;
