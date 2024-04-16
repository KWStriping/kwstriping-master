import { useTranslation } from '@core/i18n';
import { Tooltip } from '@core/ui/components/Tooltip';
import CardTitle from '@dashboard/components/core/CardTitle';
import PreviewPill from '@dashboard/components/core/PreviewPill';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import { AllocationStrategy } from '@core/api/constants';
import type { StockSettingsInput } from '@core/api/graphql';
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
  const { t } = useTranslation();
  const styles = useStyles();
  return (
    <Card>
      <CardTitle
        title={
          <div className={styles.preview ?? ''}>
            {t('dashboard.allocationStrategy', 'Allocation strategy')}
            <PreviewPill />
          </div>
        }
      />
      <CardContent>
        <RadioGroupField
          label={
            <Typography>
              {t(
                'dashboard.allocationStrategyDescription',
                'Strategy defines the preference of warehouses for stock allocations and reservations.'
              )}
              <Tooltip
                title={
                  <>
                    {t('dashboard.allocationMayOccur', 'Stock allocations occur when:')}
                    <ul>
                      <li>
                        {t(
                          'dashboard.allocationMayOccurWithTrackInventory',
                          'Order contains products that have "Track inventory" enabled.'
                        )}
                      </li>
                      <li>
                        {t(
                          'dashboard.allocationMayOccurWithReservationTime',
                          'Checkout reservation time threshold is enabled in settings.'
                        )}
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
                  {t('dashboard.title', option.title.defaultMessage)}
                </Typography>
                {option.subtitle && (
                  <Typography color="textSecondary" variant="caption">
                    {t('dashboard.subtitle', option.subtitle.defaultMessage)}
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
