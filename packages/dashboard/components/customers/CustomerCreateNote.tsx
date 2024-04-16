import { useTranslation } from '@core/i18n';
import CardTitle from '@dashboard/components/core/CardTitle';
import { FormSpacer } from '@dashboard/components/forms/Form/FormSpacer';
import type { AccountErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@dashboard/oldSrc/utils/errors/account';
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
  const { t } = useTranslation();

  const formErrors = getFormErrors(['note'], errors);

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.NcoRY',
          'Notes'
          // notes about customer header
        )}
      />
      <CardContent>
        <Typography>
          {t('dashboard.3sGrD', 'Enter any extra infotmation regarding this customer.')}
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
            'dashboard.UQ+Al',
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
