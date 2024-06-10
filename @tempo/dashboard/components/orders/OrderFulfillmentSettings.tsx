import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

import type { OrderSettingsFormData } from '../OrderSettingsPage/form';

export interface OrderFulfillmentSettingsProps {
  data: OrderSettingsFormData;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const OrderFulfillmentSettings: FC<OrderFulfillmentSettingsProps> = ({
  data,
  disabled,
  onChange,
}) => {
  return (
    <Card data-test-id="order-fulfillment-settings">
      <CardTitle
        title={
          m.dashboard__ay_p() ?? 'Fulfillment settings'
          // section header
        }
      />
      <CardContent>
        <ControlledCheckbox
          name={'autoApproveFulfillment' as keyof OrderSettingsFormData}
          label={
            <>
              <>
                {/* checkbox label */}

                {m.dashboard__hqq_() ?? 'Automatically approve all fulfillments'}
              </>
              <Typography variant="caption">
                <>
                  {/* checkbox label description */}

                  {m.dashboard_wQQ_f() ?? 'All fulfillments will be automatically approved'}
                </>
              </Typography>
            </>
          }
          checked={data?.autoApproveFulfillment}
          onChange={onChange}
          disabled={disabled}
          data-test-id="fulfillment-auto-approve-checkbox"
        />
        <FormSpacer />
        <ControlledCheckbox
          name={'fulfillmentAllowUnpaid' as keyof OrderSettingsFormData}
          label={
            <>
              <>
                {/* checkbox label */}

                {m.dashboard_MKkgX() ?? 'Allow fulfillment without payment'}
              </>
              <Typography variant="caption">
                <>
                  {/* checkbox label description */}

                  {m.dashboard__ETHu() ??
                    'You will be able to fulfill products without capturing payment for the order.'}
                </>
              </Typography>
            </>
          }
          checked={data?.fulfillmentAllowUnpaid}
          onChange={onChange}
          disabled={disabled}
          data-test-id="fulfillment-allow-unpaid-checkbox"
        />
      </CardContent>
    </Card>
  );
};
OrderFulfillmentSettings.displayName = 'OrderFulfillmentSettings';
export default OrderFulfillmentSettings;
