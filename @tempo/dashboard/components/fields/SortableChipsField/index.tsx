import DraggableChip from '@tempo/ui/components/chip/SortableChip';
import SortableContainer from '@tempo/dashboard/components/core/SortableContainer';
import type { ReorderAction, ReorderEvent } from '@tempo/dashboard/oldSrc/types';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

export interface SortableChipsFieldValueType {
  label: string;
  value: string;
}

export interface SortableChipsFieldProps extends SortableContainerProps {
  loading?: boolean;
  values: SortableChipsFieldValueType[];
  error?: boolean;
  helperText?: string;
  onValueDelete: (id: string) => void;
  onValueReorder: ReorderAction;
}

const SortableChipsField: FC<SortableChipsFieldProps> = (props) => {
  const { loading, values, error, helperText, onValueDelete, onValueReorder } = props;
  const handleSortStart = () => {
    document.body.classList.add(styles.grabbing);
  };

  const handleSortEnd = (event: ReorderEvent) => {
    document.body.classList.remove(styles.grabbing);
    onValueReorder(event);
  };

  return (
    <SortableContainer
      items={values.map(({ label }) => label)}
      // axis="xy"
      // lockAxis="xy"
      // useDragHandle
      onSortStart={handleSortStart}
      onSortEnd={handleSortEnd}
      // helperClass={styles.chipHelper}
    >
      <div>
        {loading ? (
          <Skeleton />
        ) : (
          values.map((value) => (
            <DraggableChip
              className={styles.chip ?? ''}
              key={value.label}
              label={value.label}
              onClose={() => onValueDelete(value.value)}
            />
          ))
        )}
        {error && (
          <Typography variant="caption" className={styles.errorText ?? ''}>
            {helperText}
          </Typography>
        )}
      </div>
    </SortableContainer>
  );
};

SortableChipsField.displayName = 'SortableChipsField';
export default SortableChipsField;
