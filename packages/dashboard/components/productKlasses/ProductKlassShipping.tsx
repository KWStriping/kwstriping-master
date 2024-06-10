import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import { ControlledCheckbox } from '@dashboard/components/forms/ControlledCheckbox';
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
  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle title={t('dashboard.productKlassShippingSettingsSectionHeader', 'Shipping')} />
      <CardContent>
        <ControlledCheckbox
          checked={data?.isShippingRequired}
          disabled={disabled}
          label={t('dashboard.Bw72y', 'Is this product shippable?')}
          name="isShippingRequired"
          onChange={onChange}
        />
        {data?.isShippingRequired && (
          <TextField
            className={'mt-3'}
            disabled={disabled}
            InputProps={{ endAdornment: weightUnit }}
            label={t('dashboard.Cb8fX', 'Weight')}
            name="weight"
            helperText={t(
              'dashboard.OiUXQ',
              'Used to calculate rates for shipping for products of this product type, when specific weight is not given'
            )}
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
