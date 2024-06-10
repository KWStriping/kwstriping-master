import Table from '@mui/material/Table';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import styles from './index.module.css';

interface ResponsiveTableProps {
  children: ReactNode | ReactNode[];
  className?: string;
  key?: string;
}

const ResponsiveTable: FC<ResponsiveTableProps> = ({ children, className }) => {
  return (
    <div className={'w-full overflow-x-auto'}>
      <Table className={clsx(styles.table, className)}>{children}</Table>
    </div>
  );
};

ResponsiveTable.displayName = 'ResponsiveTable';
export default ResponsiveTable;
