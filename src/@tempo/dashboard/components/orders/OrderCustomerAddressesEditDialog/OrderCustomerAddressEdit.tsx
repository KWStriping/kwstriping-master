import * as m from '@paraglide/messages';
import { getById } from '@tempo/utils';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import type { ChangeEvent, FC } from 'react';
import type {
  AccountErrorFragment,
  AddressFragment,
  OrderErrorFragment,
} from '@tempo/api/generated/graphql';
import { AddressInputOption } from './form';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import CustomerAddressChoiceCard from '@tempo/dashboard/components/customers/CustomerAddressChoiceCard';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import AddressEdit from '@tempo/dashboard/components/forms/AddressEdit';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { AddressTypeInput } from '@tempo/dashboard/oldSrc/customers/types';

export interface OrderCustomerAddressEditProps {
  loading: boolean;
  customerAddresses: AddressFragment[];
  countryChoices: SingleAutocompleteChoiceType[];
  addressInputOption: AddressInputOption;
  addressInputName: string;
  onChangeAddressInputOption: FormChange;
  selectedCustomerAddressId: string;
  formAddress: AddressTypeInput;
  formAddressCountryName: string;
  formErrors: Array<AccountErrorFragment | OrderErrorFragment>;
  onChangeFormAddress: (event: ChangeEvent<unknown>) => void;
  onChangeFormAddressCountry: (event: ChangeEvent<unknown>) => void;
  onEdit?: () => void;
  showCard?: boolean;
}

const OrderCustomerAddressEdit: FC<OrderCustomerAddressEditProps> = ({
  loading,
  customerAddresses,
  countryChoices,
  addressInputOption,
  addressInputName,
  onChangeAddressInputOption,
  selectedCustomerAddressId,
  formAddress,
  formAddressCountryName,
  formErrors,
  onChangeFormAddress,
  onChangeFormAddressCountry,
  onEdit,
  showCard = true,
}) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!customerAddresses.length) {
    return (
      <AddressEdit
        countries={countryChoices}
        countryDisplayValue={formAddressCountryName}
        data={formAddress}
        errors={formErrors}
        onChange={onChangeFormAddress}
        onCountryChange={onChangeFormAddressCountry}
      />
    );
  }

  return (
    <RadioGroup
      className={styles.container ?? ''}
      value={addressInputOption}
      name={addressInputName}
      onChange={(event) => onChangeAddressInputOption(event)}
    >
      <FormControlLabel
        value={AddressInputOption.CustomerAddress}
        control={
          <Radio
            color="primary"
            data-test-id={addressInputOption + AddressInputOption.CustomerAddress}
          />
        }
        label={m.dashboard_customerAddress() ?? 'Use one of customer addresses'}
        className={styles.optionLabel ?? ''}
      />
      {addressInputOption === AddressInputOption.CustomerAddress && showCard && (
        <>
          <CardSpacer />
          <CustomerAddressChoiceCard
            address={customerAddresses.find(getById(selectedCustomerAddressId))}
            editable
            onEditClick={onEdit}
          />
          <FormSpacer />
        </>
      )}
      <FormControlLabel
        value={AddressInputOption.NewAddress}
        control={
          <Radio
            color="primary"
            data-test-id={addressInputOption + AddressInputOption.NewAddress}
          />
        }
        label={m.dashboard_ewAddress() ?? 'Add new address'}
        className={styles.optionLabel ?? ''}
      />
      {addressInputOption === AddressInputOption.NewAddress && (
        <AddressEdit
          countries={countryChoices}
          countryDisplayValue={formAddressCountryName}
          data={formAddress}
          errors={formErrors}
          onChange={onChangeFormAddress}
          onCountryChange={onChangeFormAddressCountry}
        />
      )}
    </RadioGroup>
  );
};

OrderCustomerAddressEdit.displayName = 'OrderCustomerAddressEdit';
export default OrderCustomerAddressEdit;
