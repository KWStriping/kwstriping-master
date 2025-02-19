import Grid from '@tempo/ui/components/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent } from 'react';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import type { VoucherDetailsPageFormData } from './VoucherDetailsPage';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import RadioGroupField from '@tempo/dashboard/components/fields/RadioGroupField';
import { DiscountType } from '@tempo/dashboard/oldSrc/discounts/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';

interface VoucherTypesProps {
  data: VoucherDetailsPageFormData;
  errors: DiscountErrorFragment[];
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const VoucherTypes = ({ data, disabled, errors, onChange }: VoucherTypesProps) => {
  const formErrors = getFormErrors(['discountType'], errors);

  const voucherTypeChoices = [
    {
      label: t(
        'dashboard_XFPD6',
        'Fixed Amount'
        // voucher discount type
      ),
      value: DiscountType.ValueFixed,
    },
    {
      label: t(
        'dashboard_EfCtO',
        'Percentage'
        // voucher discount type
      ),
      value: DiscountType.ValuePercentage,
    },
    {
      label: t(
        'dashboard_S5aVm',
        'Free Shipping'
        // voucher discount type
      ),
      value: DiscountType.Shipping,
    },
  ];

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard_cq+c+',
          'Discount Type'
          // header
        )}
      />
      <CardContent>
        <Grid variant="uniform">
          <RadioGroupField
            choices={voucherTypeChoices}
            disabled={disabled}
            error={!!formErrors.discountType}
            hint={getDiscountErrorMessage(formErrors.discountType, t)}
            name={'discountType' as keyof VoucherDetailsPageFormData}
            value={data?.discountType}
            onChange={onChange}
          />
        </Grid>
      </CardContent>
    </Card>
  );
};
export default VoucherTypes;
