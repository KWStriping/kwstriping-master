import * as m from '@paraglide/messages';
import type { ProductErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { FC } from 'react';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import PreviewPill from '@tempo/dashboard/components/core/PreviewPill';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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

  const formErrors = getFormErrors(['quantityLimitPerCustomer'], errors);

  return (
    <Card>
      <CardTitle
        title={
          <>
            {m.dashboard_checkoutLimits() ?? 'Checkout limits'}
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
          label={m.dashboard_checkoutLineLimit() ?? 'Limit quantity per checkout (optional)'}
          helperText={
            m.dashboard_checkoutLimitsDescription() ??
            "Your customer won't be allowed to buy bigger quantity per checkout than shown here."
          }
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
