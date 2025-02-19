import { Tooltip } from '@tempo/ui/components/Tooltip';
import type { FC, ReactNode } from 'react';

import type { TableCellHeaderProps } from '../TableCellHeader';
import TableCellHeader from '../TableCellHeader';

interface TooltipTableCellHeaderProps extends TableCellHeaderProps {
  tooltip?: string | ReactNode[];
}

export const TooltipTableCellHeader: FC<TooltipTableCellHeaderProps> = (props) => {
  const { children, tooltip, disabled, ...rest } = props;

  const tooltipDisabled = () => {
    if (!tooltip) {
      return true;
    }
    return !disabled;
  };

  return (
    <Tooltip title={tooltip} placement="top" disabled={tooltipDisabled()}>
      <TableCellHeader disabled={disabled} {...rest}>
        {children}
      </TableCellHeader>
    </Tooltip>
  );
};

TooltipTableCellHeader.displayName = 'TooltipTableCellHeader';
export default TooltipTableCellHeader;
