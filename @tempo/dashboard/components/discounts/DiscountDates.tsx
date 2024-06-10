import * as m from '@paraglide/messages';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import Grid from '@tempo/ui/components/Grid';
import { ControlledCheckbox } from '@tempo/dashboard/components/forms/ControlledCheckbox';
import type { DiscountErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getDiscountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/discounts';

interface DiscountDatesProps {
  data: {
    endDate: string;
    endTime: string;
    hasEndDate: boolean;
    startDate: string;
    startTime: string;
  };
  disabled: boolean;
  errors: DiscountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const DiscountDates = ({ data, disabled, errors, onChange }: DiscountDatesProps) => {
  const formErrors = getFormErrors(['startDate', 'endDate'], errors);

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_KOGkU() ?? 'Active Dates'
          // time during discount is active, header
        }
      />
      <CardContent>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            error={!!formErrors.startDate}
            helperText={getDiscountErrorMessage(formErrors.startDate, t)}
            name={'startDate' as keyof FormData}
            onChange={onChange}
            label={m.dashboard_startDate() ?? 'Start Date'}
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
            name={'startTime' as keyof FormData}
            onChange={onChange}
            label={m.dashboard_startHour() ?? 'Start Hour'}
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
          label={
            m.dashboard_VF_T_() ?? 'Set end date'
            // voucher end date, switch button
          }
          name={'hasEndDate' as keyof FormData}
          onChange={onChange}
        />
        {data?.hasEndDate && (
          <Grid variant="uniform">
            <TextField
              disabled={disabled}
              error={!!formErrors.endDate}
              helperText={getDiscountErrorMessage(formErrors.endDate, t)}
              name={'endDate' as keyof FormData}
              onChange={onChange}
              label={m.dashboard_ndDate() ?? 'End Date'}
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
              name={'endTime' as keyof FormData}
              onChange={onChange}
              label={m.dashboard_ndHour() ?? 'End Hour'}
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
export default DiscountDates;
