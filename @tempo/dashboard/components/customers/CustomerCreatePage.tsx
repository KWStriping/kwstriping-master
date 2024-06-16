import * as m from '@paraglide/messages';
import type { AddressFormData } from '@tempo/next/types';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import { extractMutationErrors } from '@tempo/api/utils';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC } from 'react';
import { CardSpacer } from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import { createCountryHandler } from '@tempo/dashboard/components/forms/AddressEdit/createCountryHandler';
import Form from '@tempo/dashboard/components/forms/Form';
import type {
  AccountErrorFragment,
  AddressUpdateInput,
  CustomerCreateDataQuery,
} from '@tempo/api/generated/graphql';
import useAddressValidation from '@tempo/dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import createSingleAutocompleteSelectHandler from '@tempo/dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@tempo/dashboard/oldSrc/utils/maps';
import CustomerCreateNote from './CustomerCreateNote';
import CustomerCreateDetails from './CustomerCreateDetails';
import CustomerCreateAddress from './CustomerCreateAddress';

export interface CustomerCreatePageFormData {
  customerFirstName: string;
  customerLastName: string;
  email: string;
  note: string;
}
export interface CustomerCreatePageSubmitData extends CustomerCreatePageFormData {
  address: AddressUpdateInput;
}

const initialForm: CustomerCreatePageFormData & AddressFormData = {
  city: '',
  cityArea: '',
  companyName: '',
  countryCode: '',
  countryArea: '',
  customerFirstName: '',
  customerLastName: '',
  email: '',
  firstName: '',
  lastName: '',
  note: '',
  phone: '',
  postalCode: '',
  streetAddress1: '',
  streetAddress2: '',
};

export interface CustomerCreatePageProps {
  countries: CustomerCreateDataQuery['shop']['countries'];
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onSubmit: (data: CustomerCreatePageSubmitData) => SubmitPromise;
}

const CustomerCreatePage: FC<CustomerCreatePageProps> = ({
  countries,
  disabled,
  errors: apiErrors,
  saveButtonBar,
  onSubmit,
}: CustomerCreatePageProps) => {
  const router = useRouter();

  const [countryDisplayName, setCountryName] = useState('');
  const countryChoices = mapCountriesToChoices(countries);
  const { errors: validationErrors, submit: handleSubmitWithAddress } = useAddressValidation<
    CustomerCreatePageFormData,
    void
  >((formData) =>
    onSubmit({
      address: {
        city: formData.city,
        cityArea: formData.cityArea,
        companyName: formData.companyName,
        countryCode: formData.countryCode,
        countryArea: formData.countryArea,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        postalCode: formData.postalCode,
        streetAddress1: formData.streetAddress1,
        streetAddress2: formData.streetAddress2,
      },
      customerFirstName: formData.customerFirstName,
      customerLastName: formData.customerLastName,
      email: formData.email,
      note: formData.note,
    })
  );

  const errors = [...apiErrors, ...validationErrors];

  const handleSubmit = (formData: CustomerCreatePageFormData & AddressTypeInput) => {
    const areAddressInputFieldsModified = (
      [
        'city',
        'companyName',
        'country',
        'countryArea',
        'firstName',
        'lastName',
        'phone',
        'postalCode',
        'streetAddress1',
        'streetAddress2',
      ] as Array<keyof AddressTypeInput>
    )
      .map((key) => formData[key])
      .some((field) => field !== '');

    if (areAddressInputFieldsModified) {
      return handleSubmitWithAddress(formData);
    }

    return extractMutationErrors(
      onSubmit({
        address: null,
        customerFirstName: formData.customerFirstName,
        customerLastName: formData.customerLastName,
        email: formData.email,
        note: formData.note,
      })
    );
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={handleSubmit} disabled={disabled}>
      {({ change, set, data, isSaveDisabled, submit }) => {
        const countrySelect = createSingleAutocompleteSelectHandler(
          change,
          setCountryName,
          countryChoices
        );

        const handleCountrySelect = createCountryHandler(countrySelect, set);

        return (
          <Container>
            <Backlink href={'/customers'}>{m.dashboard_customers() ?? 'Customers'}</Backlink>
            <PageHeader
              title={
                m.dashboard___zUg() ?? 'Create Customer'
                // page header
              }
            />
            <Grid>
              <div>
                <CustomerCreateDetails
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CustomerCreateAddress
                  countries={countryChoices}
                  countryDisplayName={countryDisplayName}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
                <CardSpacer />
                <CustomerCreateNote
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              state={saveButtonBar}
              onSubmit={submit}
              onCancel={() => router.push('/customers')}
            />
          </Container>
        );
      }}
    </Form>
  );
};
CustomerCreatePage.displayName = 'CustomerCreatePage';
export default CustomerCreatePage;
