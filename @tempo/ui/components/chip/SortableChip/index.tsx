import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import type { MouseEvent, ReactNode } from 'react';
import styles from './index.module.css';

import SortableHandle from './SortableHandle';

export interface SortableChipProps {
  className?: string;
  label: ReactNode;
  onClose?: () => void;
  children?: ReactNode;
}

const SortableChip = (props: SortableChipProps) => {
  const { className, label, onClose } = props;
  const handleClose = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.content ?? ''}>
        <SortableHandle
          className={styles.sortableHandle ?? ''}
          data-test-id="button-drag-handle"
        />
        <Typography data-test-id="chip-label">{label}</Typography>
        {onClose && (
          <button
            className={styles.closeButton ?? ''}
            onClick={handleClose}
            data-test-id="button-close"
          >
            <CloseIcon className={styles.closeIcon ?? ''} />
          </button>
        )}
      </div>
    </div>
  );
};

SortableChip.displayName = 'SortableChip';
export default SortableChip;
