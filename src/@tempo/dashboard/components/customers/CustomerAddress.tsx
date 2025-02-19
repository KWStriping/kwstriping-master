import * as m from '@paraglide/messages';
import { makeStyles } from '@tempo/ui/theme/styles';
import { AddressType } from '@tempo/api/generated/constants';
import type { AddressFragment } from '@tempo/api/generated/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';
import CardTitle from '@tempo/dashboard/components/core/CardTitle';
import CardMenu from '@tempo/dashboard/components/core/CardMenu';
import AddressFormatter from '@tempo/dashboard/components/core/AddressFormatter';

export interface CustomerAddressProps {
  address: Maybe<AddressFragment>;
  disabled: boolean;
  isDefaultBillingAddress: boolean;
  isDefaultShippingAddress: boolean;
  addressNumber: number;
  onEdit: () => void;
  onRemove: () => void;
  onSetAsDefault: (type: AddressType) => void;
}

const messages = {
  defaultAddress: {
    id: 'hMRP6J',
    defaultMessage: 'Default Address',
  },
  defaultBillingAddress: {
    id: 'VyzsWZ',
    defaultMessage: 'Default Billing Address',
  },
  defaultShippingAddress: {
    id: 'nLML8Y',
    defaultMessage: 'Default Shipping Address',
  },
  deleteAddress: {
    id: 'puikeb',
    defaultMessage: 'Delete Address',
  },
  editAddress: {
    id: 'w+8BfK',
    defaultMessage: 'Edit Address',
  },
  setDefaultBilling: {
    id: 'hLOEeb',
    defaultMessage: 'Set as default billing address',
  },
  setDefaultShipping: {
    id: '+7OsyM',
    defaultMessage: 'Set as default shipping address',
  },
};

const useStyles = makeStyles(
  {
    actions: {
      flexDirection: 'row',
    },
    actionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      justifyContent: 'flex-end',
    },
    card: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  { name: 'CustomerAddress' }
);

const CustomerAddress: FC<CustomerAddressProps> = (props) => {
  const {
    address,
    disabled,
    isDefaultBillingAddress,
    isDefaultShippingAddress,
    onEdit,
    onRemove,
    onSetAsDefault,
  } = props;
  const styles = useStyles(props);

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle
        title={
          address ? (
            <>
              {isDefaultBillingAddress && isDefaultShippingAddress
                ? (m.dashboard_efaultAddress() ?? 'Default Address')
                : isDefaultShippingAddress
                  ? (m.dashboard_efaultShippingAddress() ?? 'Default Shipping Address')
                  : isDefaultBillingAddress
                    ? (m.dashboard_efaultBillingAddress() ?? 'Default Billing Address')
                    : null}
            </>
          ) : (
            <Skeleton />
          )
        }
        toolbar={
          <CardMenu
            disabled={disabled}
            menuItems={[
              {
                label: m.dashboard_etDefaultShipping() ?? 'Set as default shipping address',
                onSelect: () => onSetAsDefault(AddressType.Shipping),
                testId: 'set-default-shipping-address',
              },
              {
                label: m.dashboard_etDefaultBilling() ?? 'Set as default billing address',
                onSelect: () => onSetAsDefault(AddressType.Billing),
                testId: 'set-default-billing-address',
              },
              {
                label: m.dashboard_editAddress() ?? 'Edit Address',
                onSelect: () => onEdit(),
                testId: 'edit-address',
              },
              {
                label: m.dashboard_deleteAddress() ?? 'Delete Address',
                onSelect: () => onRemove(),
                testId: 'delete-address',
              },
            ]}
          />
        }
      />
      <CardContent>
        <AddressFormatter address={address} />
      </CardContent>
    </Card>
  );
};
CustomerAddress.displayName = 'CustomerAddress';
export default CustomerAddress;
