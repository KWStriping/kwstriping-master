import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import type { ProductErrorFragment } from '@core/api/graphql';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';
import createNonNegativeValueChangeHandler from '@dashboard/oldSrc/utils/handlers/nonNegativeValueChangeHandler';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

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

  const { t } = useTranslation();

  const formErrors = getFormErrors(['weight'], errors);
  const handleChange = createNonNegativeValueChangeHandler(onChange);

  return (
    <Card>
      <CardTitle title={t('dashboard.productShipping', 'Shipping')} />
      <CardContent>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            label={t('dashboard.productWeight', 'Weight')}
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
