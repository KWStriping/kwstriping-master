import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import { transformAddressToAddressInput } from '@tempo/utils/address';
import type {
  AddressFragment,
  CustomerAddressesQuery,
  OrderDetailsQuery,
  OrderErrorFragment,
} from '@tempo/api/generated/graphql';
import type { FC } from 'react';

import type { OrderCustomerAddressesEditDialogProps } from './OrderCustomerAddressesEditDialog';
import OrderCustomerAddressesEditDialog from './OrderCustomerAddressesEditDialog';
import type { OrderCustomerAddressesEditDialogOutput } from './OrderCustomerAddressesEditDialog/types';
import { AddressEditDialogVariant } from './OrderCustomerAddressesEditDialog/types';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';

interface OrderAddressFieldsProps {
  action: string;
  isDraft: boolean;
  customerAddressesLoading: boolean;
  customer: CustomerAddressesQuery['user'];
  countries: OrderDetailsQuery['shop']['countries'];
  onClose: () => void;
  onConfirm: (data: OrderCustomerAddressesEditDialogOutput) => SubmitPromise;
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  orderShippingAddress: Maybe<AddressFragment>;
  orderBillingAddress: Maybe<AddressFragment>;
}

const OrderAddressFields: FC<OrderAddressFieldsProps> = ({
  action,
  isDraft,
  customerAddressesLoading,
  customer,
  countries,
  onClose,
  onConfirm,
  confirmButtonState,
  errors,
  orderShippingAddress,
  orderBillingAddress,
}) => {
  const addressFieldCommonProps: Omit<OrderCustomerAddressesEditDialogProps, 'open' | 'variant'> =
    {
      loading: customerAddressesLoading,
      confirmButtonState,
      countries,
      errors,
      orderShippingAddress: transformAddressToAddressInput(orderShippingAddress),
      orderBillingAddress: transformAddressToAddressInput(orderBillingAddress),
      customerAddresses: customer?.addresses,
      defaultShippingAddress: customer?.defaultShippingAddress,
      defaultBillingAddress: customer?.defaultBillingAddress,
      onClose,
      onConfirm,
    };

  return (
    <>
      {isDraft && (
        <OrderCustomerAddressesEditDialog
          open={action === 'edit-customer-addresses'}
          variant={AddressEditDialogVariant.ChangeCustomer}
          {...addressFieldCommonProps}
        />
      )}

      <OrderCustomerAddressesEditDialog
        open={action === 'edit-shipping-address'}
        variant={AddressEditDialogVariant.ChangeShippingAddress}
        {...addressFieldCommonProps}
      />
      <OrderCustomerAddressesEditDialog
        open={action === 'edit-billing-address'}
        variant={AddressEditDialogVariant.ChangeBillingAddress}
        {...addressFieldCommonProps}
      />
    </>
  );
};

export default OrderAddressFields;
