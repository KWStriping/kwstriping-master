import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { AccountErrorFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';

import type { CustomerCreatePageFormData } from '../CustomerCreatePage';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

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

  const formErrors = getFormErrors(['customerFirstName', 'customerLastName', 'email'], errors);

  return (
    <Card>
      <CardTitle
        title={
          m.dashboard_jPWOA() ?? 'Customer Overview'
          // header
        }
      />
      <CardContent>
        <div className={styles.root ?? ''}>
          <TextField
            disabled={disabled}
            error={!!formErrors.customerFirstName}
            fullWidth
            name="customerFirstName"
            label={m.dashboard_irstName() ?? 'First Name'}
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
            label={m.dashboard_astName() ?? 'Last Name'}
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
            label={m.dashboard_email() ?? 'Email address'}
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
