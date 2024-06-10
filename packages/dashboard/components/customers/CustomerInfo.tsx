import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import Grid from '@core/ui/components/Grid';
import type { AccountErrorFragment } from '@core/api/graphql';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@dashboard/oldSrc/utils/errors/account';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    content: {
      paddingTop: theme.spacing(2),
    },
    hr: {
      margin: theme.spacing(3, 0),
    },
    sectionHeader: {
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'CustomerInfo' }
);

export interface CustomerInfoProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const CustomerInfo: FC<CustomerInfoProps> = (props) => {
  const { data, disabled, errors, onChange } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();

  const formErrors = getFormErrors(['firstName', 'lastName', 'email'], errors);

  return (
    <Card>
      <CardTitle
        title={
          <>
            {/* account information, header */}

            {t('dashboard.v5gfh', 'Account Information')}
          </>
        }
      />
      <CardContent className={styles.content ?? ''}>
        <Typography className={styles.sectionHeader ?? ''}>
          {t('dashboard.generalInformation', 'General Information')}
        </Typography>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            error={!!formErrors.firstName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.firstName, t)}
            name="firstName"
            type="text"
            label={t('dashboard.irstName', 'First Name')}
            value={data?.firstName}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.lastName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.lastName, t)}
            name="lastName"
            type="text"
            label={t('dashboard.astName', 'Last Name')}
            value={data?.lastName}
            onChange={onChange}
            inputProps={{
              spellCheck: false,
            }}
          />
        </Grid>
        <Divider className={styles.hr ?? ''} />
        <Typography className={styles.sectionHeader ?? ''}>
          <>
            {/* customer contact section, header */}

            {t('dashboard.Makqb', 'Contact Information')}
          </>
        </Typography>
        <TextField
          disabled={disabled}
          error={!!formErrors.email}
          fullWidth
          helperText={getAccountErrorMessage(formErrors.email, t)}
          name="email"
          type="email"
          label={t('dashboard.email', 'Email address')}
          value={data?.email}
          onChange={onChange}
          inputProps={{
            spellCheck: false,
          }}
        />
      </CardContent>
    </Card>
  );
};
CustomerInfo.displayName = 'CustomerInfo';
export default CustomerInfo;
