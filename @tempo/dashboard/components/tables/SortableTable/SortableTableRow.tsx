import type { FC } from 'react';

import type { TableRowLinkProps } from '../TableRowLink';
import TableRowLink from '../TableRowLink';
import SortableHandle from './SortableHandle';

const SortableTableRow: FC<TableRowProps> = ({ children, ...props }) => (
  <TableRow {...props}>
    <SortableHandle />
    {children}
  </TableRow>
);

export default SortableTableRow;
