import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

export interface BaseChipProps {
  className?: string;
  onClose?: () => void;
}

export type ChipProps = BaseChipProps &
  (
    | {
        label: ReactNode;
        children?: never;
      }
    | {
        children: ReactNode;
        label?: never;
      }
  );

export const Chip: FC<ChipProps> = ({ className, label, onClose, children }) => {
  return (
    <div className={clsx(styles.root, className)}>
      <Typography className={styles.label ?? ''} variant="caption">
        {label}
        {children}
        {onClose && <CloseIcon className={styles.closeIcon ?? ''} onClick={onClose} />}
      </Typography>
    </div>
  );
};
Chip.displayName = 'Chip';

export default Chip;
