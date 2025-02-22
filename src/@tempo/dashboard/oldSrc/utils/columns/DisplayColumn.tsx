import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

import { isSelected } from '../lists';

export interface DisplayColumnProps<TColumn extends string = string> {
  displayColumns: TColumn[];
  column: TColumn;
  children: ReactNode;
}

const DisplayColumn: FC<DisplayColumnProps> = ({ displayColumns, children, column }) => {
  const display = useMemo(
    () => isSelected(column, displayColumns, (a, b) => a === b),
    [column, displayColumns]
  );

  return <>{display && children}</>;
};

DisplayColumn.displayName = 'DisplayColumn';
export default DisplayColumn;
