import * as m from '@paraglide/messages';
import { useShopSettings } from '@tempo/ui/providers/ShopSettingsProvider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

import type { OrderSettingsFormData } from '../OrderSettingsPage/types';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface OrderSettingsProps {
  data: OrderSettingsFormData;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const OrderSettings: FC<OrderSettingsProps> = ({ data, disabled, onChange }) => {
  const { enableGiftCards } = useShopSettings();
  return (
    <Card data-test-id="order-settings">
      <CardTitle title={m.dashboard_settings() ?? 'Settings'} />
      <CardContent>
        <ControlledCheckbox
          name="autoConfirmAllNewOrders"
          label={
            <>
              {m.dashboard_autoConfirmNewOrders_label() ?? 'Automatically confirm all orders'}
              <Typography variant="caption">
                {m.dashboard_autoConfirmNewOrders_helpText() ??
                  'All orders will be automatically confirmed and all payments will be captured.'}
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
                {m.dashboard_autoFulfillNonShippableGiftCards() ??
                  'Automatically fulfill non shippable gift cards'}
                <Typography variant="caption">
                  <>
                    {/* checkbox gift cards label description */}

                    {m.dashboard_fh_QM() ??
                      'when activated non-shippable gift cards will be automatically set as fulfilled and sent to customer'}
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
