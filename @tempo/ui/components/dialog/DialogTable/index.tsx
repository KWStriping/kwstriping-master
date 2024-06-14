import type { TableProps } from '@mui/material/Table';
import Table from '@mui/material/Table';
import { forwardRef } from 'react';
import type { RefObject } from 'react';
import styles from './index.module.css';

export interface DialogTableProps extends TableProps {
  innerRef?: RefObject<HTMLTableElement>;
}

export const DialogTable = forwardRef<HTMLDivElement, DialogTableProps>(
  ({ children, innerRef, ...props }, ref) => {
    return (
      <div className={styles.wrapper ?? ''} ref={ref}>
        <Table ref={innerRef} {...props}>
          {children}
        </Table>
      </div>
    );
  }
);
DialogTable.displayName = 'DialogTable';

export default DialogTable;
