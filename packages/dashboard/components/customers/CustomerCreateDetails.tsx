import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { AccountErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@dashboard/oldSrc/utils/errors/account';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

import type { CustomerCreatePageFormData } from '../CustomerCreatePage';

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'grid',
      gridColumnGap: theme.spacing(2),
      gridRowGap: theme.spacing(3),
      gridTemplateColumns: '1fr 1fr',
    },
  }),
  { name: 'CustomerCreateDetails' }
);

export interface CustomerCreateDetailsProps {
  data: CustomerCreatePageFormData;
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const CustomerCreateDetails: FC<CustomerCreateDetailsProps> = (props) => {
  const { data, disabled, errors, onChange } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  const formErrors = getFormErrors(['customerFirstName', 'customerLastName', 'email'], errors);

  return (
    <Card>
      <CardTitle
        title={t(
          'dashboard.jPWOA',
          'Customer Overview'
          // header
        )}
      />
      <CardContent>
        <div className={styles.root ?? ''}>
          <TextField
            disabled={disabled}
            error={!!formErrors.customerFirstName}
            fullWidth
            name="customerFirstName"
            label={t('dashboard.irstName', 'First Name')}
            helperText={getAccountErrorMessage(formErrors.customerFirstName, t)}
            type="text"
            value={data?.customerFirstName}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.customerLastName}
            fullWidth
            name="customerLastName"
            label={t('dashboard.astName', 'Last Name')}
            helperText={getAccountErrorMessage(formErrors.customerLastName, t)}
            type="text"
            value={data?.customerLastName}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.email}
            fullWidth
            name="email"
            label={t('dashboard.email', 'Email address')}
            helperText={getAccountErrorMessage(formErrors.email, t)}
            type="email"
            value={data?.email}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

CustomerCreateDetails.displayName = 'CustomerCreateDetails';
export default CustomerCreateDetails;
