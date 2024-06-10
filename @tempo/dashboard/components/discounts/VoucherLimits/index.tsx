import * as m from '@paraglide/messages';
import { Grid } from '@tempo/ui/components/Grid';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import { ControlledCheckbox } from '@tempo/dashboard/components/forms/ControlledCheckbox';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';

import type { VoucherDetailsPageFormData } from '../VoucherDetailsPage';

interface VoucherLimitsProps {
  data: VoucherDetailsPageFormData;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  initialUsageLimit: number;
  onChange: (event: ChangeEvent<unknown>) => void;
  setData: (data: Partial<VoucherDetailsPageFormData>) => void;
  isNewVoucher: boolean;
}

const VoucherLimits = ({
  data,
  disabled,
  errors,
  initialUsageLimit,
  onChange,
  setData,
  isNewVoucher,
}: VoucherLimitsProps) => {
  const formErrors = getFormErrors(['usageLimit'], errors);

  const usesLeft = data?.usageLimit - data?.used;

  return (
    <Card>
      <CardTitle title={m.dashboard_sageLimitsTitle() ?? 'Usage Limit'} />
      <CardContent className={styles.cardContent ?? ''}>
        <ControlledCheckbox
          testId="has-usage-limit"
          checked={data?.hasUsageLimit}
          label={
            m.dashboard_asUsageLimit() ??
            'Limit number of times this discount can be used in total'
          }
          name={'hasUsageLimit' as keyof VoucherDetailsPageFormData}
          onChange={(evt) => {
            onChange(evt);
            setData({ usageLimit: initialUsageLimit });
          }}
        />
        {data?.hasUsageLimit &&
          (isNewVoucher ? (
            <TextField
              data-test-id="usage-limit"
              disabled={disabled}
              error={!!formErrors.usageLimit || data?.usageLimit <= 0}
              helperText={getDiscountErrorMessage(formErrors.usageLimit, t)}
              label={m.dashboard_sageLimit() ?? 'Limit of Uses'}
              name={'usageLimit' as keyof VoucherDetailsPageFormData}
              value={data?.usageLimit}
              onChange={onChange}
              type="number"
              fullWidth
              inputProps={{
                min: 1,
              }}
            />
          ) : (
            <Grid variant="uniform">
              <TextField
                data-test-id="usage-limit"
                disabled={disabled}
                error={!!formErrors.usageLimit || data?.usageLimit <= 0}
                helperText={getDiscountErrorMessage(formErrors.usageLimit, t)}
                label={m.dashboard_sageLimit() ?? 'Limit of Uses'}
                name={'usageLimit' as keyof VoucherDetailsPageFormData}
                value={data?.usageLimit}
                onChange={onChange}
                type="number"
                inputProps={{
                  min: 1,
                }}
              />
              <div className={styles.usesLeftLabelWrapper ?? ''}>
                <Typography variant="caption">
                  {m.dashboard_sesLeftCaption() ?? 'Uses left'}
                </Typography>
                <Typography>{usesLeft >= 0 ? usesLeft : 0}</Typography>
              </div>
            </Grid>
          ))}
        <ControlledCheckbox
          testId="apply-once-per-customer"
          checked={data?.applyOncePerCustomer}
          label={m.dashboard_applyOncePerCustomer() ?? 'Limit to one use per customer'}
          name={'applyOncePerCustomer' as keyof VoucherDetailsPageFormData}
          onChange={onChange}
        />
        <ControlledCheckbox
          testId="only-for-staff"
          checked={data?.onlyForStaff}
          label={m.dashboard_nlyForStaff() ?? 'Limit to staff only'}
          name={'onlyForStaff' as keyof VoucherDetailsPageFormData}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
export default VoucherLimits;
