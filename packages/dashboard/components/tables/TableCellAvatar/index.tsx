import TableCell from '@mui/material/TableCell';
import type { TableCellProps } from '@mui/material/TableCell';
import clsx from 'clsx';
import type { FC } from 'react';

import type { AvatarProps } from './Avatar';
import Avatar from './Avatar';
import styles from './index.module.css';

interface TableCellAvatarProps extends TableCellProps, Omit<AvatarProps, 'children'> {
  className?: string;
}

const TableCellAvatar: FC<TableCellAvatarProps> = (props) => {
  const { className, ...rest } = props;
  return (
    <TableCell
      className={clsx(styles.root, className)}
      data-test-id="table-cell-avatar"
      {...rest}
    >
      <Avatar {...rest} />
    </TableCell>
  );
};

export default TableCellAvatar;
