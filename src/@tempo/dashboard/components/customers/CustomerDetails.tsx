import { Trans } from '@tempo/next/i18n';
import { useLocale } from '@tempo/ui/hooks/useLocale';
import { makeStyles } from '@tempo/ui/theme/styles';
import type { AccountErrorFragment, CustomerDetailsQuery } from '@tempo/api/generated/graphql';
import { Temporal, Intl } from '@js-temporal/polyfill';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, ReactNode, FC } from 'react';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import { maybe } from '@tempo/dashboard/oldSrc/misc';
import { ControlledCheckbox } from '@tempo/dashboard/components/forms/ControlledCheckbox';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';

const useStyles = makeStyles(
  (theme) => ({
    cardTitle: {
      height: 72,
    },
    checkbox: {
      marginBottom: theme.spacing(1),
    },
    content: {
      paddingTop: theme.spacing(1),
    },
    subtitle: {
      marginTop: theme.spacing(1),
    },
  }),
  { name: 'CustomerDetails' }
);

export interface CustomerDetailsProps {
  customer: CustomerDetailsQuery['user'];
  data: {
    isActive: boolean;
    note: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: ChangeEvent<unknown>) => void;
}

const CustomerDetails: FC<CustomerDetailsProps> = ({
  customer,
  data,
  disabled,
  errors,
  onChange,
}) => {
  const { locale } = useLocale();
  // const styles = useStyles();
  const styles = {};
  const formErrors = getFormErrors(['note'], errors);

  return (
    <Card>
      <CardTitle
        className={styles.cardTitle ?? ''}
        title={
          <>
            {maybe<ReactNode>(() => customer.email, <Skeleton />)}
            {customer && customer.dateJoined ? (
              <Typography className={styles.subtitle ?? ''} variant="caption" component="div">
                <Trans
                  t={t}
                  i18nKey={'MjUyhA'}
                  date={Intl.DateTimeFormat(locale).format(
                    Temporal.PlainDate.from(customer.dateJoined)
                  )}
                >
                  {'Active member since {date}'}
                </Trans>
              </Typography>
            ) : (
              <Skeleton style={{ width: '10rem' }} />
            )}
          </>
        }
      />
      <CardContent className={styles.content ?? ''}>
        <ControlledCheckbox
          checked={data?.isActive}
          className={styles.checkbox ?? ''}
          disabled={disabled}
          label={t(
            '+NUzaQ',
            'User account active'
            // check to mark this account as active
          )}
          name="isActive"
          onChange={onChange}
        />
        <TextField
          disabled={disabled}
          error={!!formErrors.note}
          fullWidth
          multiline
          helperText={getAccountErrorMessage(formErrors.note, t)}
          name="note"
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
CustomerDetails.displayName = 'CustomerDetails';
export default CustomerDetails;
