import Toolbar from '@mui/material/Toolbar';

import type { PaginationActionsProps } from './PaginationActions';
import { PaginationActions } from './PaginationActions';
import type { PaginationRowNumberSelectProps } from './PaginationRowNumberSelect';
import { PaginationRowNumberSelect } from './PaginationRowNumberSelect';

export interface PaginationProps<ActionProps = {}>
  extends PaginationActionsProps<ActionProps>,
    Omit<PaginationRowNumberSelectProps, 'className' | 'choices' | 'onChange' | 'rowNumber'> {
  choices?: number[];
  disabled?: boolean;
  rowNumber?: number;
  onRowNumberUpdate?: (rowNumber: number) => void;
}

export const Pagination = <ActionProps,>({
  choices = [10, 20, 30, 50, 100],
  disabled,
  hasNextPage,
  hasPreviousPage,
  nextIconButtonProps,
  prevIconButtonProps,
  labels,
  rowNumber,
  onNextPage,
  onPreviousPage,
  onRowNumberUpdate,
  ...other
}: PaginationProps<ActionProps>): ReactElement => {
  const styles = {};

  return (
    <Toolbar className={styles.toolbar ?? ''} disableGutters {...other}>
      <div className={styles.spacer ?? ''}>
        {rowNumber && (
          <PaginationRowNumberSelect
            choices={choices}
            disabled={disabled}
            labels={labels}
            rowNumber={rowNumber}
            onChange={onRowNumberUpdate}
          />
        )}
      </div>
      <PaginationActions
        disabled={disabled}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        nextIconButtonProps={nextIconButtonProps}
        prevIconButtonProps={prevIconButtonProps}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </Toolbar>
  );
};

Pagination.displayName = 'Pagination';
