import * as m from '@paraglide/messages';
import { Tooltip } from '@tempo/ui/components/Tooltip';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import PreviewPill from '@tempo/dashboard/components/core/PreviewPill';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import { AllocationStrategy } from '@tempo/api/generated/constants';
import type { StockSettingsInput } from '@tempo/api/generated/graphql';
import HelpOutline from '@mui/icons-material/HelpOutline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { FC, ChangeEvent } from 'react';

import { messages } from './messages';
import { useStyles } from './styles';

const strategyOptions = [
  {
    title: messages.prioritizeBySortOrder,
    subtitle: messages.prioritizeBySortOrderDescription,
    type: AllocationStrategy.PrioritizeSortingOrder,
  },
  {
    title: messages.prioritizeByHighestStock,
    subtitle: messages.prioritizeByHighestStockDescription,
    type: AllocationStrategy.PrioritizeHighStock,
  },
];

interface ChannelAllocationStrategyProps {
  data?: StockSettingsInput;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const ChannelAllocationStrategy: FC<ChannelAllocationStrategyProps> = ({
  data,
  disabled,
  onChange,
}) => {
  const styles = useStyles();
  return (
    <Card>
      <CardTitle
        title={
          <div className={styles.preview ?? ''}>
            {m.dashboard_allocationStrategy() ?? 'Allocation strategy'}
            <PreviewPill />
          </div>
        }
      />
      <CardContent>
        <RadioGroupField
          label={
            <Typography>
              {m.dashboard_allocationStrategyDescription() ??
                'Strategy defines the preference of warehouses for stock allocations and reservations.'}
              <Tooltip
                title={
                  <>
                    {m.dashboard_allocationMayOccur() ?? 'Stock allocations occur when:'}
                    <ul>
                      <li>
                        {m.dashboard_allocationMayOccurWithTrackInventory() ??
                          'Order contains products that have "Track inventory" enabled.'}
                      </li>
                      <li>
                        {m.dashboard_allocationMayOccurWithReservationTime() ??
                          'Checkout reservation time threshold is enabled in settings.'}
                      </li>
                    </ul>
                  </>
                }
              >
                <HelpOutline className={styles.tooltipIcon ?? ''} />
              </Tooltip>
            </Typography>
          }
          choices={strategyOptions.map((option) => ({
            label: (
              <div
                className={styles.option ?? ''}
                data-test-id={`channel-allocation-strategy-option-${option.type}`}
              >
                <Typography variant="body1">
                  {m.dashboard_title() ?? option.title.defaultMessage}
                </Typography>
                {option.subtitle && (
                  <Typography color="textSecondary" variant="caption">
                    {m.dashboard_subtitle() ?? option.subtitle.defaultMessage}
                  </Typography>
                )}
              </div>
            ),
            value: option.type,
          }))}
          disabled={disabled}
          name="allocationStrategy"
          value={data?.allocationStrategy}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
ChannelAllocationStrategy.displayName = 'ChannelAllocationStrategy';
export default ChannelAllocationStrategy;
