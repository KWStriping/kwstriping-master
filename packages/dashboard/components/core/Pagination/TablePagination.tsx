import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import type { FC } from 'react';

import type { PaginationProps } from './Pagination';
import { Pagination } from './Pagination';

export interface TablePaginationProps extends PaginationProps {
  colSpan: number;
}

export const TablePagination: FC<TablePaginationProps> = ({ colSpan, ...paginationProps }) => (
  <TableRow>
    <TableCell padding="none" colSpan={colSpan}>
      <Pagination {...paginationProps} />
    </TableCell>
  </TableRow>
);
TablePagination.displayName = 'TablePagination';
