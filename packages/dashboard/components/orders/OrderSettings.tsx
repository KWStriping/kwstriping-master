import { useTranslation } from '@core/i18n';
import { useShopSettings } from '@core/ui/providers/ShopSettingsProvider';
import CardTitle from '@dashboard/components/core/CardTitle';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

import type { OrderSettingsFormData } from '../OrderSettingsPage/types';

export interface OrderSettingsProps {
  data: OrderSettingsFormData;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const OrderSettings: FC<OrderSettingsProps> = ({ data, disabled, onChange }) => {
  const { t } = useTranslation();
  const { enableGiftCards } = useShopSettings();
  return (
    <Card data-test-id="order-settings">
      <CardTitle title={t('dashboard.settings', 'Settings')} />
      <CardContent>
        <ControlledCheckbox
          name="autoConfirmAllNewOrders"
          label={
            <>
              {t('dashboard.autoConfirmNewOrders.label', 'Automatically confirm all orders')}
              <Typography variant="caption">
                {t(
                  'dashboard.autoConfirmNewOrders.helpText',
                  'All orders will be automatically confirmed and all payments will be captured.'
                )}
              </Typography>
            </>
          }
          checked={data?.autoConfirmAllNewOrders}
          onChange={onChange}
          disabled={disabled}
          data-test-id="automatically-confirm-all-new-orders-checkbox"
        />
        {enableGiftCards && (
          <ControlledCheckbox
            name="autoFulfillNonShippableGiftCard"
            label={
              <>
                {t(
                  'dashboard.autoFulfillNonShippableGiftCards',
                  'Automatically fulfill non shippable gift cards'
                )}
                <Typography variant="caption">
                  <>
                    {/* checkbox gift cards label description */}

                    {t(
                      'dashboard.fh9QM',
                      'when activated non-shippable gift cards will be automatically set as fulfilled and sent to customer'
                    )}
                  </>
                </Typography>
              </>
            }
            checked={data?.autoFulfillNonShippableGiftCard}
            onChange={onChange}
            disabled={disabled}
            data-test-id="automatically-fulfill-non-shippable-gift-cards-checkbox"
          />
        )}
      </CardContent>
    </Card>
  );
};
OrderSettings.displayName = 'OrderSettings';
export default OrderSettings;
