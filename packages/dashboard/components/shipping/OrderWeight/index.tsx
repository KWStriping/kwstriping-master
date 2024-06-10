import { useTranslation } from '@core/i18n';
import { useShopSettings } from '@core/ui/hooks/useShopSettings';
import CardTitle from '@dashboard/components/core/CardTitle';
import ControlledCheckbox from '@dashboard/components/forms/ControlledCheckbox';
import type { ShippingErrorFragment } from '@core/api/graphql';
import type { ChangeEvent } from '@dashboard/hooks/useForm';
import { getShippingWeightRateErrorMessage } from '@dashboard/oldSrc/shipping/errors';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';
import styles from './index.module.css';

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
  const { t } = useTranslation();
  const shop = useShopSettings();

  const formFields = ['minimumOrderWeight', 'maximumOrderWeight'];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.orderWeightCardTitle', 'Order Weight')} />
      <CardContent>
        <ControlledCheckbox
          name="orderValueRestricted"
          label={
            <>
              {t('dashboard.restrictOrderWeightCheckboxLabel', 'Restrict order weight')}
              <Typography variant="caption">
                {t('dashboard.restrictOrderWeightHelpText', 'This rate will apply to all orders')}
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
                label={t('dashboard.+5Djm', 'Min. Order Weight')}
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
                label={t('dashboard.0V06N', 'Max. Order Weight')}
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
