import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import type { ButtonBaseTypeMap } from '@mui/material/ButtonBase';
import ButtonBase from '@mui/material/ButtonBase';
import { useColorScheme, useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import type { ElementType } from 'react';


type BaseButtonProps<M = unknown> = M extends Object
  ? ButtonBaseTypeMap<M & { component: ElementType }>['props']
  : ButtonBaseTypeMap<{ href?: string }>['props'];

export interface PaginationActionsProps<BProps = unknown> {
  className?: string;
  disabled?: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextIconButtonProps?: BaseButtonProps<BProps>;
  prevIconButtonProps?: BaseButtonProps<BProps>;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

export const PaginationActions = <BProps,>({
  className,
  disabled,
  hasNextPage,
  hasPreviousPage,
  nextIconButtonProps,
  prevIconButtonProps,
  onNextPage = () => {},
  onPreviousPage = () => {},
  ...other
}: PaginationActionsProps<BProps>) => {
  const styles = {};

  const { direction } = useTheme();
  const { mode } = useColorScheme();

  const isDark = mode === 'dark';
  const previousDisabled = !hasPreviousPage || disabled;
  const nextDisabled = !hasNextPage || disabled;

  return (
    <div className={clsx(styles.actions, className)} {...other}>
      <ButtonBase
        className={clsx(
          styles.actionsButton ?? '',
          (isDark && styles.dark) ?? '',
          previousDisabled && styles.actionsButtonDisabled
        )}
        disableRipple
        onClick={onPreviousPage}
        disabled={previousDisabled}
        data-test="button-pagination-back"
        aria-label="previous page"
        {...prevIconButtonProps}
      >
        {direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
      </ButtonBase>

      <ButtonBase
        className={clsx(
          styles.actionsButton ?? '',
          (isDark && styles.dark) ?? '',
          nextDisabled && styles.actionsButtonDisabled
        )}
        disableRipple
        onClick={onNextPage}
        disabled={nextDisabled}
        data-test="button-pagination-next"
        aria-label="next page"
        {...nextIconButtonProps}
      >
        {direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
      </ButtonBase>
    </div>
  );
};

PaginationActions.displayName = 'PaginationActions';
