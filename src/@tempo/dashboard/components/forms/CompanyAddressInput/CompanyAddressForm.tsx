import * as m from '@paraglide/messages';
import Grid from '@tempo/ui/components/Grid';
import type { SingleAutocompleteChoiceType } from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import SingleAutocompleteSelectField from '@tempo/dashboard/components/fields/SingleAutocompleteSelectField';
import FormSpacer from '@tempo/dashboard/components/forms/Form/FormSpacer';
import type {
  AccountErrorFragment,
  ShopErrorFragment,
  WarehouseErrorFragment,
} from '@tempo/api/generated/graphql';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';
import type { AddressTypeInput } from '@tempo/dashboard/oldSrc/customers/types';
import { getFormErrors } from '@tempo/dashboard/oldSrc/utils/errors';
import getAccountErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/account';
import getShopErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/shop';
import getWarehouseErrorMessage from '@tempo/dashboard/oldSrc/utils/errors/warehouse';
import TextField from '@mui/material/TextField';
import type { TFunction } from '@tempo/next/i18n';
import type { FC } from 'react';

import { useAddressValidation } from '../AddressEdit/useAddressValidation';

export interface CompanyAddressFormProps {
  countries: SingleAutocompleteChoiceType[];
  data: AddressTypeInput;
  displayCountry: string;
  errors: Array<AccountErrorFragment | ShopErrorFragment | WarehouseErrorFragment>;
  disabled: boolean;
  onChange: (event: ChangeEvent) => void;
  onCountryChange: (event: ChangeEvent) => void;
}

function getErrorMessage(
  err: AccountErrorFragment | ShopErrorFragment | WarehouseErrorFragment,
  t: TFunction
): string {
  switch (err?.__typename) {
    case 'AccountError':
      return getAccountErrorMessage(err, t);
    case 'WarehouseError':
      return getWarehouseErrorMessage(err, t);
    default:
      return getShopErrorMessage(err, t);
  }
}

const CompanyAddressForm: FC<CompanyAddressFormProps> = (props) => {
  const { countries, data, disabled, displayCountry, errors, onChange, onCountryChange } = props;
  const { areas, isFieldAllowed, getDisplayValue } = useAddressValidation(data?.country);

  const formFields = [
    'companyName',
    'streetAddress1',
    'streetAddress2',
    'city',
    'postalCode',
    'country',
    'countryArea',
    'companyArea',
    'phone',
  ];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <div>
      <TextField
        disabled={disabled}
        error={!!formErrors.companyName}
        helperText={getErrorMessage(formErrors.companyName, t)}
        label={m.dashboard_YazHG() ?? 'Company'}
        name={'companyName' as keyof AddressTypeInput}
        onChange={onChange}
        value={data?.companyName}
        fullWidth
        InputProps={{
          autoComplete: 'organization',
          spellCheck: false,
        }}
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress1}
        helperText={getErrorMessage(formErrors.streetAddress1, t)}
        label={m.dashboard_52Em/ ?? 'Address line 1'}
        name={'streetAddress1' as keyof AddressTypeInput}
        onChange={onChange}
        value={data?.streetAddress1}
        fullWidth
        InputProps={{
          autoComplete: 'address-line1',
          spellCheck: false,
        }}
      />
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.streetAddress2}
        helperText={getErrorMessage(formErrors.streetAddress2, t)}
        label={m.dashboard_QY_a_() ?? 'Address line 2'}
        name={'streetAddress2' as keyof AddressTypeInput}
        onChange={onChange}
        value={data?.streetAddress2}
        fullWidth
        InputProps={{
          autoComplete: 'address-line2',
          spellCheck: false,
        }}
      />
      <FormSpacer />
      <Grid>
        <TextField
          disabled={disabled}
          error={!!formErrors.city}
          helperText={getErrorMessage(formErrors.city, t)}
          label={m.dashboard_E_fIS() ?? 'City'}
          name={'city' as keyof AddressTypeInput}
          onChange={onChange}
          value={data?.city}
          fullWidth
          InputProps={{
            autoComplete: 'address-level2',
            spellCheck: false,
          }}
        />
      </Grid>
      <FormSpacer />
      {isFieldAllowed('countryArea') && (
        <SingleAutocompleteSelectField
          disabled={disabled}
          autoComplete="new-password"
          data-test-id="address-edit-country-area-field"
          displayValue={data?.countryArea ? getDisplayValue(data?.countryArea) : ''}
          error={!!formErrors.countryArea}
          helperText={getErrorMessage(formErrors.countryArea, t)}
          label={m.dashboard_uwpCm() ?? 'Country area'}
          name="countryArea"
          onChange={onChange}
          value={data?.countryArea ?? ''}
          choices={areas}
          InputProps={{
            spellCheck: false,
          }}
        />
      )}
      <FormSpacer />
      <SingleAutocompleteSelectField
        data-test-id="address-edit-country-select-field"
        disabled={disabled}
        autoComplete="new-password"
        displayValue={displayCountry}
        error={!!formErrors.countryCode}
        helperText={getErrorMessage(formErrors.countryCode, t)}
        label={m.dashboard_ONi_O() ?? 'Country'}
        name={'country' as keyof AddressTypeInput}
        onChange={onCountryChange}
        value={data?.countryCode}
        choices={countries}
        InputProps={{
          spellCheck: false,
          autoComplete: 'new-password',
        }}
      />
      <FormSpacer />
      <Grid>
        <TextField
          disabled={disabled}
          error={!!formErrors.postalCode}
          helperText={getErrorMessage(formErrors.postalCode, t)}
          label={m.dashboard_YGfnY() ?? 'ZIP / Postal code'}
          name={'postalCode' as keyof AddressTypeInput}
          onChange={onChange}
          value={data?.postalCode}
          fullWidth
          InputProps={{
            autoComplete: 'postal-code',
            spellCheck: false,
          }}
        />
      </Grid>
      <FormSpacer />
      <TextField
        disabled={disabled}
        error={!!formErrors.phone}
        fullWidth
        helperText={getErrorMessage(formErrors.phone, t)}
        label={m.dashboard___R_Z() ?? 'Phone'}
        name={'phone' as keyof AddressTypeInput}
        value={data?.phone}
        onChange={onChange}
        InputProps={{
          autoComplete: 'tel',
          spellCheck: false,
        }}
      />
    </div>
  );
};
CompanyAddressForm.displayName = 'CompanyAddressForm';
export default CompanyAddressForm;
