import type { Breakpoint } from '@mui/material/styles';
import type { TableProps } from '@mui/material/Table';
import Table from '@mui/material/Table';
import type { HTMLAttributes, ReactNode, FC } from 'react';
// import useStyles from './styles';

export interface ResponsiveTableProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | ReactNode[];
  flexBreakpoint?: Breakpoint;
  tableProps?: TableProps;
  className?: string;
  key?: string;
}

export const ResponsiveTable: FC<ResponsiveTableProps> = ({
  children,
  className,
  tableProps,
  flexBreakpoint,
  ...props
}) => {
  // const styles = useStyles({ flexBreakpoint });

  const styles = {};

  return (
    <div className={styles.root ?? ''} {...props}>
      <Table className={className} {...tableProps}>
        {children}
      </Table>
    </div>
  );
};

ResponsiveTable.displayName = 'ResponsiveTable';
