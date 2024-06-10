import { useTranslation } from '@core/i18n';
import { getById } from '@core/utils';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import type { ChangeEvent, FC } from 'react';
import { AddressInputOption } from './form';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CustomerAddressChoiceCard from '@dashboard/components/customers/CustomerAddressChoiceCard';
import type { SingleAutocompleteChoiceType } from '@dashboard/components/fields/SingleAutocompleteSelectField';
import AddressEdit from '@dashboard/components/forms/AddressEdit';
import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import type {
  AccountErrorFragment,
  AddressFragment,
  OrderErrorFragment,
} from '@core/api/graphql';
import type { FormChange } from '@dashboard/hooks/useForm';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';

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
  const { t } = useTranslation();

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
        label={t('dashboard.customerAddress', 'Use one of customer addresses')}
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
        label={t('dashboard.ewAddress', 'Add new address')}
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
