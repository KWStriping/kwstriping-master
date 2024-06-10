import { useTranslation } from '@core/i18n';
import { makeStyles } from '@core/ui/theme/styles';
import AddressFormatter from '@dashboard/components/core/AddressFormatter';
import CardMenu from '@dashboard/components/core/CardMenu';
import CardTitle from '@dashboard/components/core/CardTitle';
import { AddressType } from '@core/api/constants';
import type { AddressFragment } from '@core/api/graphql';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import type { FC } from 'react';

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

  const { t } = useTranslation();

  return (
    <Card className={styles.card ?? ''}>
      <CardTitle
        title={
          address ? (
            <>
              {isDefaultBillingAddress && isDefaultShippingAddress
                ? t('dashboard.efaultAddress', 'Default Address')
                : isDefaultShippingAddress
                ? t('dashboard.efaultShippingAddress', 'Default Shipping Address')
                : isDefaultBillingAddress
                ? t('dashboard.efaultBillingAddress', 'Default Billing Address')
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
                label: t('dashboard.etDefaultShipping', 'Set as default shipping address'),
                onSelect: () => onSetAsDefault(AddressType.Shipping),
                testId: 'set-default-shipping-address',
              },
              {
                label: t('dashboard.etDefaultBilling', 'Set as default billing address'),
                onSelect: () => onSetAsDefault(AddressType.Billing),
                testId: 'set-default-billing-address',
              },
              {
                label: t('dashboard.editAddress', 'Edit Address'),
                onSelect: () => onEdit(),
                testId: 'edit-address',
              },
              {
                label: t('dashboard.deleteAddress', 'Delete Address'),
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
