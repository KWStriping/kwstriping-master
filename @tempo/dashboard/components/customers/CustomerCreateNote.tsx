import * as m from '@paraglide/messages';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import { FormSpacer } from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { AccountErrorFragment } from '@tempo/api/generated/graphql';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

export interface CustomerCreateNoteProps {
  data: {
    note: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const CustomerCreateNote: FC<CustomerCreateNoteProps> = ({
  data,
  disabled,
  errors,
  onChange,
}) => {
  const formErrors = getFormErrors(['note'], errors);

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_NcoRY() ?? 'Notes'
          // notes about customer header
        }
      />
      <CardContent>
        <Typography>
          {m.dashboard__sGrD() ?? 'Enter any extra infotmation regarding this customer.'}
        </Typography>
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.note}
          fullWidth
          multiline
          name="note"
          helperText={getAccountErrorMessage(formErrors.note, t)}
          label={t(
            'dashboard_UQ+Al',
            'Note'
            // note about customer
          )}
          value={data?.note}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
CustomerCreateNote.displayName = 'CustomerCreateNote';
export default CustomerCreateNote;
