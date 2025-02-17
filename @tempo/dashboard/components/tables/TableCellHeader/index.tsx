import TableCell from '@mui/material/TableCell';
import type { TableCellProps } from '@mui/material/TableCell';
import clsx from 'clsx';
import type { FC } from 'react';
import { forwardRef } from 'react';
import styles from './index.module.css';
import ArrowSort from '@tempo/dashboard/oldSrc/icons/ArrowSort';

export type TableCellHeaderArrowDirection = 'asc' | 'desc';
export type TableCellHeaderArrowPosition = 'left' | 'right';
export interface TableCellHeaderProps extends TableCellProps {
  arrowPosition?: TableCellHeaderArrowPosition;
  direction?: Maybe<TableCellHeaderArrowDirection>;
  textAlign?: 'left' | 'center' | 'right';
  disabled?: boolean;
}

const TableCellHeader: FC<TableCellHeaderProps> = forwardRef<unknown, TableCellHeaderProps>(
  (props, ref) => {
    const {
      arrowPosition,
      children,
      className,
      direction,
      textAlign,
      disabled = false,
      onClick,
      ...rest
    } = props;

    return (
      <TableCell
        {...rest}
        ref={ref}
        onClick={(e) => {
          if (disabled || !onClick) {
            e.preventDefault();
          } else {
            onClick(e);
          }
        }}
        className={clsx(
          styles.root ?? '',
          className,
          disabled && (styles.disabled ?? ''),
          !onClick && styles.notSortable
        )}
      >
        <div
          className={clsx(
            styles.labelContainer ?? '',
            !!direction && !!arrowPosition && (styles.labelContainerActive ?? ''),
            textAlign === 'center' && (styles.labelContainerCenter ?? ''),
            textAlign === 'right' && styles.labelContainerRight
          )}
        >
          {!!direction && arrowPosition === 'left' && (
            <ArrowSort
              className={clsx(
                styles.arrow ?? '',
                styles.arrowLeft ?? '',
                direction === 'asc' && styles.arrowUp
              )}
            />
          )}
          <div className={styles.label ?? ''}>{children}</div>
          {!!direction && arrowPosition === 'right' && (
            <ArrowSort className={clsx(styles.arrow, direction === 'asc' && styles.arrowUp)} />
          )}
        </div>
      </TableCell>
    );
  }
);

TableCellHeader.displayName = 'TableCellHeader';
TableCellHeader.defaultProps = {
  arrowPosition: 'left',
  textAlign: 'left',
};
export default TableCellHeader;
