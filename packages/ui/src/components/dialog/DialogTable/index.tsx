import type { TableProps } from '@mui/material/Table';
import Table from '@mui/material/Table';
import { forwardRef } from 'react';
import type { Ref } from 'react';
import { useStyles } from './styles';

export interface DialogTableProps extends TableProps {
  innerRef?: Ref<HTMLTableElement>;
}

export const DialogTable: FC<DialogTableProps> = forwardRef<HTMLDivElement, DialogTableProps>(
  ({ children, innerRef, ...props }, ref) => {
    // const styles = useStyles();
    const styles = {};

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
