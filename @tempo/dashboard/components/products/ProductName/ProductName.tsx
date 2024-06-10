import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { ProductErrorFragment } from '@tempo/api/generated/graphql';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import { getFormErrors, getProductErrorMessage } from '@tempo/dashboard/oldSrc/utils/errors';

interface ProductNameProps {
  value: string;
  onChange: FormChange<unknown>;
  disabled?: boolean;
  errors: ProductErrorFragment[];
}

const ProductName: FC<ProductNameProps> = ({ value, onChange, disabled, errors }) => {
  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={m.dashboard__f_Yl() ?? 'Variant Name'} />
      <CardContent>
        <TextField
          name="name"
          value={value}
          label={m.dashboard_name() ?? 'Name'}
          onChange={onChange}
          error={!!formErrors.name}
          fullWidth
          disabled={disabled}
          helperText={getProductErrorMessage(formErrors.name, t)}
          data-test-id="variant-name"
        />
      </CardContent>
    </Card>
  );
};

ProductName.displayName = 'ProductName';
export default ProductName;
