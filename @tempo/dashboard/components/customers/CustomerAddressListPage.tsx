import * as m from '@paraglide/messages';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { Button } from '@tempo/ui/components/buttons/Button';
import { makeStyles } from '@tempo/ui/theme/styles';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import type { AddressType, CustomerAddressesFragment } from '@tempo/api/generated/graphql';
import { customerUrl } from '@tempo/dashboard/oldSrc/customers/urls';
import { getStringOrPlaceholder } from '@tempo/dashboard/oldSrc/misc';
import { renderCollection } from '@tempo/ui/utils';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import CustomerAddress from './CustomerAddress';

export interface CustomerAddressListPageProps {
  customer: Maybe<CustomerAddressesFragment>;
  disabled: boolean;
  onAdd: () => void;
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
  onSetAsDefault: (id: string, type: AddressType) => void;
}

const messages = {
  addAddress: {
    id: 'rjy9/k',
    defaultMessage: 'Add address',
  },
  doesntHaveAddresses: {
    id: 'kErneR',
    defaultMessage:
      'This customer doesn’t have any addresses added to his address book. You can add address using the button below.',
  },
  fullNameAddress: {
    id: 'n5vskv',
    defaultMessage: "{fullName}'s Address Book",
    description: "customer's address book, header",
  },
  noNameToShow: {
    id: 'CWqmRU',
    defaultMessage: 'Address Book',
    description: "customer's address book when no customer name is available, header",
  },
  fullNameDetail: {
    id: 'MpR4zK',
    defaultMessage: '{fullName} Details',
    description: 'customer details, header',
  },
  noAddressToShow: {
    id: 'y/UWBR',
    defaultMessage: 'There is no address to show for this customer',
  },
};

const useStyles = makeStyles(
  (theme) => ({
    addButton: {
      marginTop: theme.spacing(2),
    },
    description: {
      marginTop: theme.spacing(1),
    },
    empty: {
      margin: `${theme.spacing(13)}px auto 0`,
      textAlign: 'center',
      width: 600,
    },
    root: {
      display: 'grid',
      gap: theme.spacing(3),
      gridTemplateColumns: 'repeat(3, 1fr)',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(1, 1fr)',
      },
    },
  }),
  { name: 'CustomerAddressListPage' }
);

const CustomerAddressListPage: FC<CustomerAddressListPageProps> = (props) => {
  const { customer, disabled, onAdd, onEdit, onRemove, onSetAsDefault } = props;
  const styles = useStyles(props);

  const isEmpty = customer?.addresses?.length === 0;
  const fullName = getStringOrPlaceholder(
    customer && [customer.firstName, customer.lastName].join(' ')
  );

  return (
    <Container>
      <Backlink href={customerUrl(customer?.id)}>
        {fullName.trim().length > 0
          ? m.dashboard_fullNameDetail({ fullName }) ?? '{{fullName}} Details'
          : m.dashboard_oNameToShow() ?? 'Address Book'}
      </Backlink>
      {!isEmpty && (
        <PageHeader
          title={
            fullName.trim().length > 0
              ? m.dashboard_fullNameAddress({
                  fullName,
                }) ?? "{{fullName}}'s Address Book"
              : m.dashboard_oNameToShow() ?? 'Address Book'
          }
        >
          <Button color="primary" onClick={onAdd} data-test-id="add-address">
            {m.dashboard_addAddress() ?? 'Add address'}
          </Button>
        </PageHeader>
      )}
      {isEmpty ? (
        <div className={styles.empty ?? ''}>
          <Typography variant="h5">
            {m.dashboard_oAddressToShow() ?? 'There is no address to show for this customer'}
          </Typography>
          <Typography className={styles.description ?? ''}>
            {m.dashboard_oesntHaveAddresses() ??
              'This customer doesn’t have any addresses added to his address book. You can add address using the button below.'}
          </Typography>
          <Button className={styles.addButton ?? ''} color="primary" onClick={onAdd}>
            {m.dashboard_addAddress() ?? 'Add address'}
          </Button>
        </div>
      ) : (
        <div className={styles.root ?? ''}>
          {renderCollection(customer?.addresses, (address, addressNumber) => (
            <CustomerAddress
              address={address}
              addressNumber={addressNumber + 1}
              disabled={disabled}
              isDefaultBillingAddress={customer?.defaultBillingAddress?.id === address?.id}
              isDefaultShippingAddress={customer?.defaultShippingAddress?.id === address?.id}
              onEdit={() => onEdit(address.id)}
              onRemove={() => onRemove(address.id)}
              onSetAsDefault={(type) => onSetAsDefault(address.id, type)}
              key={address?.id || 'skeleton'}
            />
          ))}
        </div>
      )}
    </Container>
  );
};
CustomerAddressListPage.displayName = 'CustomerAddressListPage';
export default CustomerAddressListPage;
