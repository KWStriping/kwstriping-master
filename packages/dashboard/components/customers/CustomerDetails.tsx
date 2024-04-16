import { Trans, useTranslation } from '@core/i18n';
import { useLocale } from '@core/ui/hooks/useLocale';
import { makeStyles } from '@core/ui/theme/styles';
import CardTitle from '@dashboard/components/core/CardTitle';
import { ControlledCheckbox } from '@dashboard/components/forms/ControlledCheckbox';
import type { AccountErrorFragment, CustomerDetailsQuery } from '@core/api/graphql';
import { maybe } from '@dashboard/oldSrc/misc';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@dashboard/oldSrc/utils/errors/account';
import { Temporal, Intl } from '@js-temporal/polyfill';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { ChangeEvent, ReactNode, FC } from 'react';

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
  const { t } = useTranslation();
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
CustomerDetails.displayName = 'CustomerDetails';
export default CustomerDetails;
