import IconButton from '@core/ui/components/buttons/IconButton';
import { useTheme } from '@core/ui/theme';
import { useColorScheme } from '@core/ui/theme/styles';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import ArrowRight from '@mui/icons-material/ArrowRight';
import clsx from 'clsx';
import type { FC } from 'react';
import styles from './index.module.css';

export interface TablePaginationActionsProps {
  backIconButtonProps?: unknown;
  className?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextIconButtonProps?: unknown;
  onNextPage: (event: any) => void;
  onPreviousPage: (event: any) => void;
}

export const TablePaginationActions: FC<TablePaginationActionsProps> = (props) => {
  const {
    backIconButtonProps,
    className,
    hasNextPage,
    hasPreviousPage,
    nextIconButtonProps,
    onNextPage,
    onPreviousPage,
    ...other
  } = props;
  const { direction } = useTheme();
  const { mode } = useColorScheme();

  const isDark = mode === 'dark';

  return (
    <div className={clsx(styles.root, className)} {...other}>
      <IconButton
        color="secondary"
        className={clsx(
          styles.iconButton ?? '',
          isDark && (styles.dark ?? ''),
          !hasPreviousPage && styles.disabled
        )}
        onClick={onPreviousPage}
        disabled={!hasPreviousPage}
        data-test-id="button-pagination-back"
        {...backIconButtonProps}
      >
        {direction === 'rtl' ? <ArrowRight /> : <ArrowLeft />}
      </IconButton>
      <IconButton
        className={clsx(
          styles.iconButton ?? '',
          isDark && (styles.dark ?? ''),
          !hasNextPage && styles.disabled
        )}
        onClick={onNextPage}
        disabled={!hasNextPage}
        data-test-id="button-pagination-next"
        {...nextIconButtonProps}
      >
        {direction === 'rtl' ? <ArrowLeft /> : <ArrowRight />}
      </IconButton>
    </div>
  );
};

TablePaginationActions.displayName = 'TablePaginationActions';
export default TablePaginationActions;
