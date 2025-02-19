import * as m from '@paraglide/messages';
import { useShopSettings } from '@tempo/ui/hooks/useShopSettings';
import type { ShippingErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import { getShippingWeightRateErrorMessage } from '@tempo/dashboard/oldSrc/shipping/errors';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import ControlledCheckbox from '@tempo/dashboard/components/forms/ControlledCheckbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

export interface OrderWeightProps {
  disabled: boolean;
  errors: Maybe<ShippingErrorFragment[]>;
  orderValueRestricted: boolean;
  maxValue: string;
  minValue: string;
  onChange: (event: ChangeEvent) => void;
}

export const OrderWeight: FC<OrderWeightProps> = ({
  orderValueRestricted,
  disabled,
  errors,
  maxValue = '',
  minValue = '',
  onChange,
}) => {
  const shop = useShopSettings();

  const formFields = ['minimumOrderWeight', 'maximumOrderWeight'];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <Card>
      <CardTitle title={m.dashboard_orderWeightCardTitle() ?? 'Order Weight'} />
      <CardContent>
        <ControlledCheckbox
          name="orderValueRestricted"
          label={
            <>
              {m.dashboard_restrictOrderWeightCheckboxLabel() ?? 'Restrict order weight'}
              <Typography variant="caption">
                {m.dashboard_restrictOrderWeightHelpText() ??
                  'This rate will apply to all orders'}
              </Typography>
            </>
          }
          checked={orderValueRestricted}
          onChange={onChange}
          disabled={disabled}
        />
        {orderValueRestricted && (
          <>
            <div className={styles.grid ?? ''}>
              <TextField
                disabled={disabled}
                helperText={getShippingWeightRateErrorMessage(formErrors.minimumOrderWeight, t)}
                error={!!formErrors.minimumOrderWeight}
                fullWidth
                label={m.dashboard___Djm() ?? 'Min. Order Weight'}
                name="minValue"
                type="number"
                inputProps={{
                  min: 0,
                  type: 'number',
                }}
                InputProps={{
                  inputProps: { min: 0 },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>{shop?.defaultWeightUnit}</Typography>
                    </InputAdornment>
                  ),
                }}
                value={minValue}
                onChange={onChange}
              />
              <TextField
                disabled={disabled}
                helperText={getShippingWeightRateErrorMessage(formErrors.maximumOrderWeight, t)}
                error={!!formErrors.maximumOrderWeight}
                fullWidth
                label={m.dashboard__V__N() ?? 'Max. Order Weight'}
                name="maxValue"
                type="number"
                InputProps={{
                  inputProps: { min: minValue },
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography>{shop?.defaultWeightUnit}</Typography>
                    </InputAdornment>
                  ),
                }}
                value={maxValue}
                onChange={onChange}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderWeight;
