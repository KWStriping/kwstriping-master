import type { AddressUpdateInput, AddressType } from '@core/api/constants';

export interface OrderCustomerSearchAddressState {
  open: boolean;
  type: AddressType;
}
export interface OrderCustomerAddressesEditDialogOutput {
  shippingAddress: AddressUpdateInput;
  billingAddress: AddressUpdateInput;
}
export enum AddressEditDialogVariant {
  ChangeCustomer,
  ChangeShippingAddress,
  ChangeBillingAddress,
}
