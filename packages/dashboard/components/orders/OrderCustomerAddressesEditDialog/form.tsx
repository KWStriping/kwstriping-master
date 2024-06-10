import { useEffect, useState } from 'react';
import type { FormEvent, ChangeEvent, ReactNode, FC } from 'react';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import { useExitFormDialog } from '@dashboard/components/forms/Form/useExitFormDialog';
import type {
  AddressFragment,
  CountryWithCodeFragment,
  Node,
} from '@core/api/graphql';
import type {
  CommonUseFormResultWithHandlers,
  FormChange,
  SubmitPromise,
} from '@dashboard/hooks/useForm';
import useForm from '@dashboard/hooks/useForm';
import useHandleFormSubmit from '@dashboard/hooks/useHandleFormSubmit';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';

export enum AddressInputOption {
  CustomerAddress = 'customerAddress',
  NewAddress = 'newAddress',
}

export interface OrderCustomerAddressesEditFormData {
  cloneAddress: boolean;
  shippingAddressInputOption: AddressInputOption;
  billingAddressInputOption: AddressInputOption;
  customerShippingAddress: Node;
  customerBillingAddress: Node;
  shippingAddress: AddressTypeInput;
  billingAddress: AddressTypeInput;
}

export interface OrderCustomerAddressesEditData extends OrderCustomerAddressesEditFormData {
  shippingCountryName: string;
  billingCountryName: string;
}

export interface OrderCustomerAddressesEditHandlers {
  changeFormAddress: (
    event: ChangeEvent<unknown>,
    addressType: 'shippingAddress' | 'billingAddress'
  ) => void;
  changeCustomerAddress: (
    customerAddress: AddressFragment,
    addressType: 'customerShippingAddress' | 'customerBillingAddress'
  ) => void;
  selectShippingCountry: FormChange;
  selectBillingCountry: FormChange;
}

interface UseOrderCustomerAddressesEditFormResult
  extends CommonUseFormResultWithHandlers<
    OrderCustomerAddressesEditData,
    OrderCustomerAddressesEditHandlers
  > {
  submit: (event: FormEvent<unknown>) => SubmitPromise<any[]>;
}

interface UseOrderCustomerAddressesEditFormOpts {
  countryChoices: SingleAutocompleteChoiceType[];
  countries: CountryWithCodeFragment[];
  defaultShippingAddress: Node;
  defaultBillingAddress: Node;
  defaultCloneAddress: boolean;
}

export interface OrderCustomerAddressesEditFormProps
  extends UseOrderCustomerAddressesEditFormOpts {
  children: (props: UseOrderCustomerAddressesEditFormResult) => ReactNode;
  initial?: Partial<OrderCustomerAddressesEditFormData>;
  onSubmit: (data: OrderCustomerAddressesEditData) => void;
}

function useOrderCustomerAddressesEditForm(
  providedInitialFormData: Partial<OrderCustomerAddressesEditFormData>,
  onSubmit: (data: OrderCustomerAddressesEditData) => void,
  opts: UseOrderCustomerAddressesEditFormOpts
): UseOrderCustomerAddressesEditFormResult {
  const emptyAddress: AddressTypeInput = {
    city: '',
    countryCode: '',
    phone: '',
    postalCode: '',
    streetAddress1: '',
  };
  const defaultInitialFormData: OrderCustomerAddressesEditFormData = {
    cloneAddress: opts.defaultCloneAddress,
    shippingAddressInputOption: AddressInputOption.CustomerAddress,
    billingAddressInputOption: AddressInputOption.CustomerAddress,
    customerShippingAddress: opts.defaultShippingAddress,
    customerBillingAddress: opts.defaultBillingAddress,
    shippingAddress: emptyAddress,
    billingAddress: emptyAddress,
  };

  const initialData = {
    ...defaultInitialFormData,
    ...providedInitialFormData,
  };

  const { handleChange, change, data: formData } = useForm(initialData);

  const { setExitDialogSubmitRef } = useExitFormDialog();

  const [shippingCountryName, setShippingCountryName] = useState(
    opts.countries.find((country) => initialData.shippingAddress.country === country.code)
      ?.country
  );
  const [billingCountryName, setBillingCountryName] = useState(
    opts.countries.find((country) => initialData.billingAddress.country === country.code)?.country
  );

  const handleFormAddressChange = (
    event: ChangeEvent<unknown>,
    addressType: 'shippingAddress' | 'billingAddress'
  ) =>
    change({
      target: {
        name: addressType,
        value: {
          ...formData[addressType],
          [event.target.name]: event.target.value,
        },
      },
    });
  const handleCustomerAddressChange = (
    customerAddress: AddressFragment,
    addressType: 'customerShippingAddress' | 'customerBillingAddress'
  ) =>
    change({
      target: {
        name: addressType,
        value: customerAddress,
      },
    });
  const handleShippingCountrySelect = createSingleAutocompleteSelectHandler(
    (event) =>
      change({
        target: {
          name: 'shippingAddress',
          value: {
            ...formData.shippingAddress,
            [event.target.name]: event.target.value,
            countryArea: '',
          },
        },
      }),
    setShippingCountryName,
    opts.countryChoices
  );
  const handleBillingCountrySelect = createSingleAutocompleteSelectHandler(
    (event) =>
      change({
        target: {
          name: 'billingAddress',
          value: {
            ...formData.billingAddress,
            [event.target.name]: event.target.value,
            countryArea: '',
          },
        },
      }),
    setBillingCountryName,
    opts.countryChoices
  );

  const data = {
    ...formData,
    shippingCountryName,
    billingCountryName,
  };

  const handleFormSubmit = useHandleFormSubmit({
    onSubmit,
  });

  const handleSubmit = () => handleFormSubmit(data);

  const submit = (event: FormEvent<unknown>) => {
    event.stopPropagation();
    event.preventDefault();
    return handleSubmit();
  };

  useEffect(() => setExitDialogSubmitRef(submit), [handleSubmit]);

  return {
    change: handleChange,
    submit,
    data,
    handlers: {
      changeCustomerAddress: handleCustomerAddressChange,
      changeFormAddress: handleFormAddressChange,
      selectShippingCountry: handleShippingCountrySelect,
      selectBillingCountry: handleBillingCountrySelect,
    },
  };
}

const OrderCustomerAddressesEditForm: FC<OrderCustomerAddressesEditFormProps> = ({
  children,
  initial,
  onSubmit,
  ...rest
}) => {
  const props = useOrderCustomerAddressesEditForm(initial || {}, onSubmit, rest);

  return (
    <form onSubmit={props.submit} autoComplete="off">
      {children(props)}
    </form>
  );
};

OrderCustomerAddressesEditForm.displayName = 'OrderCustomerAddressesEditForm';
export default OrderCustomerAddressesEditForm;
