import * as m from '@paraglide/messages';
import Grid from '@tempo/ui/components/Grid';
import type { ProductErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';
import createNonNegativeValueChangeHandler from '@tempo/dashboard/oldSrc/utils/handlers/nonNegativeValueChangeHandler';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

interface ProductShippingProps {
  data: {
    weight: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  weightUnit: string;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const ProductShipping: FC<ProductShippingProps> = (props) => {
  const { data, disabled, errors, weightUnit, onChange } = props;

  const formErrors = getFormErrors(['weight'], errors);
  const handleChange = createNonNegativeValueChangeHandler(onChange);

  return (
    <Card>
      <CardTitle title={m.dashboard_productShipping() ?? 'Shipping'} />
      <CardContent>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            label={m.dashboard_productWeight() ?? 'Weight'}
            error={!!formErrors.weight}
            helperText={getProductErrorMessage(formErrors.weight, t)}
            name="weight"
            value={data?.weight}
            onChange={handleChange}
            InputProps={{
              endAdornment: <InputAdornment position="end">{weightUnit || ''}</InputAdornment>,
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
ProductShipping.displayName = 'ProductShipping';
export default ProductShipping;
