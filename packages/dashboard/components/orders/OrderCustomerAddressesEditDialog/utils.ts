import { getById } from '@core/utils';
import type { Dispatch, SetStateAction } from 'react';
import type { OrderCustomerAddressesEditData, OrderCustomerAddressesEditHandlers } from './form';
import type { OrderCustomerAddressEditProps } from './OrderCustomerAddressEdit';
import type { OrderCustomerSearchAddressState } from './types';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import type {
  AccountErrorFragment,
  AddressFragment,
  AddressUpdateInput,
  Node,
  OrderErrorFragment,
} from '@core/api/graphql';
import { AddressType } from '@core/api/constants';
import type { FormChange } from '@dashboard/hooks/useForm';
import { flatten } from '@dashboard/oldSrc/misc';

interface AddressEditCommonProps {
  showCard: boolean;
  loading: boolean;
  countryChoices: SingleAutocompleteChoiceType[];
  customerAddresses: AddressFragment[];
}

export const stringifyAddress = (address: Partial<AddressFragment>): string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, ...addressWithoutId } = address;
  return Object.values(flatten(addressWithoutId)).join(' ');
};

export const parseQuery = (query: string) => query.replace(/([.?*+\-=:^$\\[\]<>(){}|])/g, '\\$&');

export function validateDefaultAddress<T extends AddressFragment>(
  defaultAddress: Node,
  customerAddresses: T[]
): Node {
  const fallbackAddress = {
    id: customerAddresses[0]?.id,
  } as AddressFragment;
  if (!defaultAddress) {
    return fallbackAddress;
  }
  if (!customerAddresses.some(getById(defaultAddress.id))) {
    return fallbackAddress;
  }
  return defaultAddress;
}

const filterAddressErrors = (
  dialogErrors: Array<OrderErrorFragment | AccountErrorFragment>,
  addressType: AddressType
) => dialogErrors?.filter((error) => error.addressType === addressType);

interface ShippingAddresses {
  shippingAddress: AccountErrorFragment[] | AddressUpdateInput;
  billingAddress: AccountErrorFragment[] | AddressUpdateInput;
}

export const hasPreSubmitErrors = (input: ShippingAddresses) =>
  Object.values(input)
    .flat()
    .some((el) => 'code' in el);

export const getAddressEditProps = (
  variant: 'shipping' | 'billing',
  data: OrderCustomerAddressesEditData,
  handlers: OrderCustomerAddressesEditHandlers,
  change: FormChange,
  dialogErrors: Array<OrderErrorFragment | AccountErrorFragment>,
  setAddressSearchState: Dispatch<SetStateAction<OrderCustomerSearchAddressState>>,
  addressEditCommonProps: AddressEditCommonProps
): OrderCustomerAddressEditProps => {
  if (variant === 'shipping') {
    return {
      ...addressEditCommonProps,
      addressInputName: 'shippingAddressInputOption',
      formErrors: filterAddressErrors(dialogErrors, AddressType.Shipping),
      onEdit: () =>
        setAddressSearchState({
          open: true,
          type: AddressType.Shipping,
        }),
      onChangeAddressInputOption: change,
      addressInputOption: data?.shippingAddressInputOption,
      selectedCustomerAddressId: data?.customerShippingAddress?.id,
      formAddress: data?.shippingAddress,
      formAddressCountryName: data?.shippingCountryName,
      onChangeFormAddress: (event) => handlers.changeFormAddress(event, 'shippingAddress'),
      onChangeFormAddressCountry: handlers.selectShippingCountry,
    };
  }
  return {
    ...addressEditCommonProps,
    addressInputName: 'billingAddressInputOption',
    formErrors: filterAddressErrors(dialogErrors, AddressType.Billing),
    onEdit: () =>
      setAddressSearchState({
        open: true,
        type: AddressType.Billing,
      }),
    onChangeAddressInputOption: change,
    addressInputOption: data?.billingAddressInputOption,
    selectedCustomerAddressId: data?.customerBillingAddress?.id,
    formAddress: data?.billingAddress,
    formAddressCountryName: data?.billingCountryName,
    onChangeFormAddress: (event) => handlers.changeFormAddress(event, 'billingAddress'),
    onChangeFormAddressCountry: handlers.selectBillingCountry,
  };
};
