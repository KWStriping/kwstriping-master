import type { FC } from 'react';

import SortableHandle from './SortableHandle';

const SortableTableRow: FC<TableRowProps> = ({ children, ...props }) => (
  <TableRow {...props}>
    <SortableHandle />
    {children}
  </TableRow>
);

export default SortableTableRow;
