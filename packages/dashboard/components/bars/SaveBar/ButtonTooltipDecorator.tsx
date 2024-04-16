import Tooltip from '@mui/material/Tooltip';
import type { FC, ReactNode } from 'react';

interface ButtonTooltipDecoratorProps {
  tooltip?: string;
  children: ReactNode;
}

export const ButtonTooltipDecorator: FC<ButtonTooltipDecoratorProps> = ({
  tooltip,
  children,
}) => {
  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement="top">
        <span>{children}</span>
      </Tooltip>
    );
  }

  return <>{children}</>;
};
ButtonTooltipDecorator.displayName = 'ButtonTooltipDecorator';
