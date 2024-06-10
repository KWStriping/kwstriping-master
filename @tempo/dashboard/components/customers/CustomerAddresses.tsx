import * as m from '@paraglide/messages';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import AddressFormatter from '@tempo/dashboard/components/core/AddressFormatter';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import type { CustomerDetailsFragment } from '@tempo/api/generated/graphql';
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

  return (
    <Card>
      <CardTitle
        title={m.dashboard_fJGij() ?? 'Address Information'}
        toolbar={
          <Button
            data-test-id="manage-addresses"
            disabled={disabled}
            color="secondary"
            href={manageAddressHref}
          >
            {m.dashboard_anage() ?? 'Manage'}
          </Button>
        }
      />
      {customer.defaultBillingAddress.id !== customer.defaultShippingAddress.id ? (
        <>
          {customer.defaultBillingAddress !== null && (
            <CardContent>
              <Typography className={styles.label ?? ''}>
                {m.dashboard_illingAddress() ?? 'Billing address'}
              </Typography>
              <AddressFormatter address={customer.defaultBillingAddress} />
            </CardContent>
          )}
          {customer.defaultBillingAddress && customer.defaultShippingAddress && <Divider />}
          {customer.defaultShippingAddress && (
            <CardContent>
              <Typography className={styles.label ?? ''}>
                {m.dashboard_shippingAddress() ?? 'Shipping Address'}
              </Typography>
              <AddressFormatter address={customer.defaultShippingAddress} />
            </CardContent>
          )}
        </>
      ) : customer.defaultBillingAddress === null && customer.defaultShippingAddress === null ? (
        <CardContent>
          <Typography>{m.dashboard_d_RXL() ?? 'This customer has no addresses yet'}</Typography>
        </CardContent>
      ) : (
        <CardContent>
          <Typography className={styles.label ?? ''}>
            {m.dashboard_address() ?? 'Address'}
          </Typography>
          <AddressFormatter address={customer.defaultBillingAddress} />
        </CardContent>
      )}
    </Card>
  );
};
CustomerAddresses.displayName = 'CustomerAddresses';
export default CustomerAddresses;
