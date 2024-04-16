import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { makeStyles } from '@core/ui/theme/styles';
import AddressFormatter from '@dashboard/components/core/AddressFormatter';
import CardTitle from '@dashboard/components/core/CardTitle';
import type { CustomerDetailsFragment } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

const useStyles = makeStyles(
  (theme) => ({
    label: {
      fontWeight: 600,
      marginBottom: theme.spacing(1),
    },
  }),
  { name: 'CustomerAddresses' }
);

export interface CustomerAddressesProps {
  customer: Maybe<CustomerDetailsFragment>;
  disabled: boolean;
  manageAddressHref: string;
}

const CustomerAddresses: FC<CustomerAddressesProps> = (props) => {
  const { customer, disabled, manageAddressHref } = props;
  const styles = useStyles(props);

  const { t } = useTranslation();

  return (
    <Card>
      <CardTitle
        title={t('dashboard.fJGij', 'Address Information')}
        toolbar={
          <Button
            data-test-id="manage-addresses"
            disabled={disabled}
            color="secondary"
            href={manageAddressHref}
          >
            {t('dashboard.anage', 'Manage')}
          </Button>
        }
      />
      {customer.defaultBillingAddress.id !== customer.defaultShippingAddress.id ? (
        <>
          {customer.defaultBillingAddress !== null && (
            <CardContent>
              <Typography className={styles.label ?? ''}>
                {t('dashboard.illingAddress', 'Billing address')}
              </Typography>
              <AddressFormatter address={customer.defaultBillingAddress} />
            </CardContent>
          )}
          {customer.defaultBillingAddress && customer.defaultShippingAddress && <Divider />}
          {customer.defaultShippingAddress && (
            <CardContent>
              <Typography className={styles.label ?? ''}>
                {t('dashboard.shippingAddress', 'Shipping Address')}
              </Typography>
              <AddressFormatter address={customer.defaultShippingAddress} />
            </CardContent>
          )}
        </>
      ) : customer.defaultBillingAddress === null && customer.defaultShippingAddress === null ? (
        <CardContent>
          <Typography>{t('dashboard.d1RXL', 'This customer has no addresses yet')}</Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography className={styles.label ?? ''}>
            {t('dashboard.address', 'Address')}
          </Typography>
          <AddressFormatter address={customer.defaultBillingAddress} />
        </CardContent>
      )}
    </Card>
  );
};
CustomerAddresses.displayName = 'CustomerAddresses';
export default CustomerAddresses;
