import TableBody from '@mui/material/TableBody';
import type { TableBodyProps } from '@mui/material/TableBody';
import type { FC } from 'react';
import styles from './index.module.css';
import SortableContainer from '@tempo/dashboard/components/core/SortableContainer';
import type { SortableContainerProps } from '@tempo/dashboard/components/core/SortableContainer';

const SortableTableBody: FC<Omit<TableBodyProps & SortableContainerProps, 'ref'>> = ({
  children,
  items,
  onSortEnd,
  ...props
}) => {
  if (!items?.length) return <TableBody {...props}>{children}</TableBody>;
  return (
    <SortableContainer items={items} onSortEnd={onSortEnd}>
      <TableBody
        className={styles.ghost ?? ''}
        // axis="y"
        // lockAxis="y"
        // useDragHandle
        {...props}
      >
        {children}
      </TableBody>
    </SortableContainer>
  );
};

export default SortableTableBody;
