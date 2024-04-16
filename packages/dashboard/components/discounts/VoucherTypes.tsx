import { useTranslation } from '@core/i18n';
import Grid from '@core/ui/components/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { ChangeEvent } from 'react';
import type { VoucherDetailsPageFormData } from './VoucherDetailsPage';
import CardTitle from '@dashboard/components/core/CardTitle';
import RadioGroupField from '@dashboard/components/fields/RadioGroupField';
import type { DiscountErrorFragment } from '@core/api/graphql';
import { DiscountType } from '@dashboard/oldSrc/discounts/types';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@dashboard/oldSrc/utils/errors/discounts';

interface VoucherTypesProps {
  data: VoucherDetailsPageFormData;
  errors: DiscountErrorFragment[];
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const VoucherTypes = ({ data, disabled, errors, onChange }: VoucherTypesProps) => {
  const { t } = useTranslation();

  const formErrors = getFormErrors(['discountType'], errors);

  const voucherTypeChoices = [
    {
      label: t(
        'dashboard.XFPD6',
        'Fixed Amount'
        // voucher discount type
      ),
      value: DiscountType.ValueFixed,
    },
    {
      label: t(
        'dashboard.EfCtO',
        'Percentage'
        // voucher discount type
      ),
      value: DiscountType.ValuePercentage,
    },
    {
      label: t(
        'dashboard.S5aVm',
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
          'dashboard.cq+c+',
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
