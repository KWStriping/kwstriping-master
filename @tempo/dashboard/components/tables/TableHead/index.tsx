import { Trans } from '@tempo/next/i18n';
import type { Node } from '@tempo/ui/types';
import Checkbox from '@tempo/dashboard/components/core/Checkbox';
import TableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import type { TableHeadProps as MuiTableHeadProps } from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';

import type { FC, ReactNode } from 'react';

import styles from './index.module.css';

export interface TableHeadProps extends MuiTableHeadProps {
  colSpan: number;
  disabled: boolean;
  dragRows?: boolean;
  selected?: number;
  items: Node[];
  toolbar?: ReactNode | ReactNode[];
  toggleAll?: (items: Node[], selected: number) => void;
}

function getColSpan(colSpan: number, dragRows: boolean): number {
  if (dragRows) {
    return colSpan - 2;
  }

  return colSpan - 1;
}

const TableHead: FC<TableHeadProps> = ({
  children,
  colSpan,
  disabled,
  dragRows,
  items,
  selected,
  toggleAll,
  toolbar,
  ...muiTableHeadProps
}) => {
  return (
    <MuiTableHead {...muiTableHeadProps}>
      <TableRow>
        {dragRows && (items === undefined || !!items?.length) && <TableCell />}
        {(items === undefined || !!items?.length) && (
          <TableCell
            padding="checkbox"
            className={clsx(styles.cell, dragRows && styles.dragRows)}
          >
            <Checkbox
              indeterminate={items && items.length > selected && selected > 0}
              checked={selected === 0 ? false : true}
              disabled={disabled}
              onChange={() => toggleAll(items, selected)}
            />
          </TableCell>
        )}
        {selected ? (
          <>
            <TableCell
              className={clsx(styles.cell, styles.root)}
              colSpan={getColSpan(colSpan, dragRows)}
            >
              <div className={styles.container ?? ''}>
                {selected && (
                  <Typography data-test-id="SelectedText">
                    <Trans
                      id="qu/hXD"
                      defaultMessage="Selected {number} items"
                      values={{
                        number: selected,
                      }}
                    />
                  </Typography>
                )}
                <div className={styles.spacer ?? ''} />
                {toolbar && <div className={styles.toolbar ?? ''}>{toolbar}</div>}
              </div>
            </TableCell>
          </>
        ) : (
          children
        )}
      </TableRow>
    </MuiTableHead>
  );
};
TableHead.displayName = 'TableHead';
export default TableHead;
