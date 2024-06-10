import { IndicatorOutlined } from '@core/ui/components/Indicator';
import { Tooltip, TooltipMountWrapper } from '@core/ui/components/Tooltip';
import type { FC } from 'react';

import OrderAlerts from '../OrderAlerts';

interface TableLineAlertProps {
  alerts?: string[];
  variant: 'warning' | 'error';
}

const TableLineAlert: FC<TableLineAlertProps> = ({ alerts, variant }) => {
  if (!alerts?.length) return null;

  const title = <OrderAlerts alerts={alerts} />;

  return (
    <Tooltip title={title} variant={variant}>
      <TooltipMountWrapper>
        <IndicatorOutlined icon={variant} />
      </TooltipMountWrapper>
    </Tooltip>
  );
};
export default TableLineAlert;
