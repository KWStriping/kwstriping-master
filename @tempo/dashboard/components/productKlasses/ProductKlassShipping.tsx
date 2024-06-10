import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import { ControlledCheckbox } from '@tempo/dashboard/components/forms/ControlledCheckbox';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

interface ProductKlassShippingProps {
  data: {
    isShippingRequired: boolean;
    weight: number | null;
  };
  weightUnit: string;
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const ProductKlassShipping: FC<ProductKlassShippingProps> = ({
  data,
  weightUnit,
  disabled,
  onChange,
}) => {
  return (
    <Card>
      <CardTitle title={m.dashboard_productKlassShippingSettingsSectionHeader() ?? 'Shipping'} />
      <CardContent>
        <ControlledCheckbox
          checked={data?.isShippingRequired}
          disabled={disabled}
          label={m.dashboard_Bw__y() ?? 'Is this product shippable?'}
          name="isShippingRequired"
          onChange={onChange}
        />
        {data?.isShippingRequired && (
          <TextField
            className={'mt-3'}
            disabled={disabled}
            InputProps={{ endAdornment: weightUnit }}
            label={m.dashboard_Cb_fX() ?? 'Weight'}
            name="weight"
            helperText={
              m.dashboard_OiUXQ() ??
              'Used to calculate rates for shipping for products of this product type, when specific weight is not given'
            }
            type="number"
            value={data?.weight}
            onChange={onChange}
          />
        )}
      </CardContent>
    </Card>
  );
};

ProductKlassShipping.displayName = 'ProductKlassShipping';
export default ProductKlassShipping;
