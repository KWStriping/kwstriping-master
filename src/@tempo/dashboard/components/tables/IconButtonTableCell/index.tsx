import IconButton from '@tempo/ui/components/buttons/IconButton';
import TableCell from '@mui/material/TableCell';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import styles from './index.module.css';
import { stopPropagation } from '@tempo/dashboard/oldSrc/misc';

export interface IconButtonTableCellProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
}

const IconButtonTableCell: FC<IconButtonTableCellProps> = (props) => {
  const { children, className, disabled, onClick } = props;
  return (
    <TableCell className={clsx(styles.root, className)}>
      <IconButton color="secondary" disabled={disabled} onClick={stopPropagation(onClick)}>
        {children}
      </IconButton>
    </TableCell>
  );
};
IconButtonTableCell.displayName = 'IconButtonTableCell';
export default IconButtonTableCell;
