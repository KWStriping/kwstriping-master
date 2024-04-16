import { useTranslation } from '@core/i18n';
import Grid from '@core/ui/components/Grid';
import CardTitle from '@dashboard/components/core/CardTitle';
import { ControlledCheckbox } from '@dashboard/components/forms/ControlledCheckbox';
import type { DiscountErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@dashboard/oldSrc/utils/errors/discounts';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent } from 'react';

import type { VoucherDetailsPageFormData } from './VoucherDetailsPage';

interface VoucherDatesProps {
  data: VoucherDetailsPageFormData;
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const VoucherDates = ({ data, disabled, errors, onChange }: VoucherDatesProps) => {
  const { t } = useTranslation();

  const formErrors = getFormErrors(['startDate', 'endDate'], errors);

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.jcN9w',
          'Active Dates'
          // time during voucher is active, header
        )}
      />
      <CardContent>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            error={!!formErrors.startDate}
            helperText={getDiscountErrorMessage(formErrors.startDate, t)}
            name={'startDate' as keyof VoucherDetailsPageFormData}
            onChange={onChange}
            label={t('dashboard.startDate', 'Start Date')}
            value={data?.startDate}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.startDate}
            helperText={getDiscountErrorMessage(formErrors.startDate, t)}
            name={'startTime' as keyof VoucherDetailsPageFormData}
            onChange={onChange}
            label={t('dashboard.startHour', 'Start Hour')}
            value={data?.startTime}
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <ControlledCheckbox
          checked={data?.hasEndDate}
          label={t(
            'dashboard.VF5T5',
            'Set end date'
            // voucher end date, switch button
          )}
          name={'hasEndDate' as keyof VoucherDetailsPageFormData}
          onChange={onChange}
        />
        {data?.hasEndDate && (
          <Grid variant="uniform">
            <TextField
              disabled={disabled}
              error={!!formErrors.endDate}
              helperText={getDiscountErrorMessage(formErrors.endDate, t)}
              name={'endDate' as keyof VoucherDetailsPageFormData}
              onChange={onChange}
              label={t('dashboard.ndDate', 'End Date')}
              value={data?.endDate}
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
            <TextField
              disabled={disabled}
              error={!!formErrors.endDate}
              helperText={getDiscountErrorMessage(formErrors.endDate, t)}
              name={'endTime' as keyof VoucherDetailsPageFormData}
              onChange={onChange}
              label={t('dashboard.ndHour', 'End Hour')}
              value={data?.endTime}
              type="time"
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
            />
          </Grid>
        )}
      </CardContent>
    </Card>
  );
};
export default VoucherDates;
