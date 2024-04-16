import { useTranslation } from '@core/i18n';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { ProductErrorFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import { getFormErrors, getProductErrorMessage } from '@dashboard/oldSrc/utils/errors';

interface ProductNameProps {
  value: string;
  onChange: FormChange<unknown>;
  disabled?: boolean;
  errors: ProductErrorFragment[];
}

const ProductName: FC<ProductNameProps> = ({
  value,
  onChange,
  disabled,
  errors,
}) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(['name'], errors);

  return (
    <Card>
      <CardTitle title={t('dashboard.1f2Yl', 'Variant Name')} />
      <CardContent>
        <TextField
          name="name"
          value={value}
          label={t('dashboard.name', 'Name')}
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
