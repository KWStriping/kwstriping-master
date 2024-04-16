import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import PreviewPill from '@dashboard/components/core/PreviewPill';
import type { ProductErrorFragment } from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';

interface ProductCheckoutSettingsProps {
  data: {
    quantityLimitPerCustomer: number | null;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: FormChange;
}

const ProductCheckoutSettings: FC<ProductCheckoutSettingsProps> = (props) => {
  const { data, disabled, errors, onChange } = props;

  const { t } = useTranslation();

  const formErrors = getFormErrors(['quantityLimitPerCustomer'], errors);

  return (
    <Card>
      <CardTitle
        title={
          <>
            {t('dashboard.checkoutLimits', 'Checkout limits')}
            <PreviewPill className={styles.preview ?? ''} />
          </>
        }
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.quantityLimitPerCustomer}
          type="number"
          fullWidth
          name="quantityLimitPerCustomer"
          label={t('dashboard.checkoutLineLimit', 'Limit quantity per checkout (optional)')}
          helperText={t(
            'dashboard.checkoutLimitsDescription',
            "Your customer won't be allowed to buy bigger quantity per checkout than shown here."
          )}
          value={data?.quantityLimitPerCustomer ? String(data?.quantityLimitPerCustomer) : ''}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: 'none',
              min: 1,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

ProductCheckoutSettings.displayName = 'ProductCheckoutSettings';
export default ProductCheckoutSettings;
