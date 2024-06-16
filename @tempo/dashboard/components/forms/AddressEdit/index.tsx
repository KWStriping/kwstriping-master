import * as m from '@paraglide/messages';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type { AccountErrorFragment, OrderErrorFragment } from '@tempo/api/generated/graphql';
import type { AddressTypeInput } from '@tempo/dashboard/oldSrc/customers/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';
import getOrderErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/order';
import TextField from '@mui/material/TextField';
import type { ChangeEvent, FC } from 'react';
import styles from './index.module.css';

import { useAddressValidation } from './useAddressValidation';

interface AddressEditProps {
  countries: SingleAutocompleteChoiceType[];
  countryDisplayValue: string;
  data: AddressTypeInput;
  disabled?: boolean;
  errors: Array<AccountErrorFragment | OrderErrorFragment>;
  onChange: (event: ChangeEvent<unknown>) => void;
  onCountryChange: (event: ChangeEvent<unknown>) => void;
}

function getErrorMessage(err: AccountErrorFragment | OrderErrorFragment): string {
  if (err?.__typename === 'AccountError') {
    return getAccountErrorMessage(err, t);
  }

  return getOrderErrorMessage(err, t);
}

const PossibleFormFields = {
  CITY: 'city',
  CITY_AREA: 'cityArea',
  COUNTRY: 'country',
  COUNTRY_AREA: 'countryArea',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  COMPANY_NAME: 'companyName',
  PHONE: 'phone',
  POSTAL_CODE: 'postalCode',
  STREET_ADDRESS_1: 'streetAddress1',
  STREET_ADDRESS_2: 'streetAddress2',
} as const;

const formFields: Array<keyof AddressTypeInput> = Object.values(PossibleFormFields);

const AddressEdit: FC<AddressEditProps> = ({
  countries,
  countryDisplayValue,
  data,
  disabled,
  errors,
  onChange,
  onCountryChange,
}) => {
  const { areas, isFieldAllowed, getDisplayValue } = useAddressValidation(data?.country);

  const formErrors = getFormErrors<
    keyof AddressTypeInput,
    AccountErrorFragment | OrderErrorFragment
  >(formFields, errors);

  return (
    <>
      <div className={styles.root ?? ''}>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.firstName}
            helperText={getErrorMessage(formErrors.firstName, t)}
            label={m.dashboard_irstName() ?? 'First Name'}
            name="firstName"
            onChange={onChange}
            value={data?.firstName}
            fullWidth
            InputProps={{
              // Setting 'autoComplete: "new-password"' is the only way to
              // disable Chrome's autofill on forms as of early 2022
              autoComplete: 'new-password',
              spellCheck: false,
            }}
          />
        </div>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.lastName}
            helperText={getErrorMessage(formErrors.lastName, t)}
            label={m.dashboard_astName() ?? 'Last Name'}
            name="lastName"
            onChange={onChange}
            value={data?.lastName}
            fullWidth
            InputProps={{
              autoComplete: 'new-password',
              spellCheck: false,
            }}
          />
        </div>
      </div>
      <FormSpacer />
      <div className={styles.root ?? ''}>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.companyName}
            helperText={getErrorMessage(formErrors.companyName, t)}
            label={m.dashboard_YazHG() ?? 'Company'}
            name="companyName"
            onChange={onChange}
            value={data?.companyName}
            fullWidth
            InputProps={{
              autoComplete: 'new-password',
              spellCheck: false,
            }}
          />
        </div>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.phone}
            fullWidth
            helperText={getErrorMessage(formErrors.phone, t)}
            label={m.dashboard___R_Z() ?? 'Phone'}
            name="phone"
            value={data?.phone}
            onChange={onChange}
            InputProps={{
              autoComplete: 'new-password',
              spellCheck: false,
            }}
          />
        </div>
      </div>
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress1}
        helperText={getErrorMessage(formErrors.streetAddress1, t)}
        label={m.dashboard_52Em/ ?? 'Address line 1'}
        name="streetAddress1"
        onChange={onChange}
        value={data?.streetAddress1}
        fullWidth
        InputProps={{
          autoComplete: 'new-password',
          spellCheck: false,
        }}
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress2}
        helperText={getErrorMessage(formErrors.streetAddress2, t)}
        label={m.dashboard_QY_a_() ?? 'Address line 2'}
        name="streetAddress2"
        onChange={onChange}
        value={data?.streetAddress2}
        fullWidth
        InputProps={{
          autoComplete: 'new-password',
          spellCheck: false,
        }}
      />
      <FormSpacer />
      <div className={styles.root ?? ''}>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.city}
            helperText={getErrorMessage(formErrors.city, t)}
            label={m.dashboard_E_fIS() ?? 'City'}
            name="city"
            onChange={onChange}
            value={data?.city}
            fullWidth
            InputProps={{
              autoComplete: 'new-password',
              spellCheck: false,
            }}
          />
        </div>
        <div>
          <TextField
            disabled={disabled}
            error={!!formErrors.postalCode}
            label={m.dashboard_YGfnY() ?? 'ZIP / Postal code'}
            name="postalCode"
            onChange={onChange}
            value={data?.postalCode}
            fullWidth
            InputProps={{
              autoComplete: 'new-password',
              spellCheck: false,
            }}
          />
        </div>
      </div>
      <FormSpacer />
      <div className={styles.root ?? ''}>
        {isFieldAllowed(PossibleFormFields.COUNTRY_AREA) && (
          <div>
            <SingleAutocompleteSelectField
              disabled={disabled}
              autoComplete="new-password"
              data-test-id="address-edit-country-area-field"
              displayValue={data?.countryArea ? getDisplayValue(data?.countryArea) : ''}
              error={!!formErrors.countryArea}
              helperText={getErrorMessage(formErrors.countryArea, t)}
              label={m.dashboard_countryArea() ?? 'Country area'}
              name="countryArea"
              onChange={onChange}
              value={data?.countryArea || ''}
              choices={areas}
              InputProps={{
                spellCheck: false,
              }}
            />
          </div>
        )}
        <div>
          <SingleAutocompleteSelectField
            disabled={disabled}
            autoComplete="new-password"
            data-test-id="address-edit-country-select-field"
            displayValue={countryDisplayValue}
            error={!!formErrors.countryCode}
            helperText={getErrorMessage(formErrors.countryCode, t)}
            label={m.dashboard_ONi_O() ?? 'Country'}
            name="country"
            onChange={onCountryChange}
            value={data?.countryCode}
            choices={countries}
            InputProps={{
              spellCheck: false,
            }}
          />
        </div>
      </div>
    </>
  );
};
AddressEdit.displayName = 'AddressEdit';
export default AddressEdit;
