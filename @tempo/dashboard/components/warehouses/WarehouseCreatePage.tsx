import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import { createCountryHandler } from '@tempo/dashboard/components/forms/AddressEdit/createCountryHandler';
import CompanyAddressInput from '@tempo/dashboard/components/forms/CompanyAddressInput';
import Form from '@tempo/dashboard/components/forms/Form';
import type {
  CountryWithCodeFragment,
  WarehouseErrorFragment,
} from '@tempo/api/generated/graphql';
import useAddressValidation from '@tempo/dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import useStateFromProps from '@tempo/dashboard/hooks/useStateFromProps';
import type { AddressTypeInput } from '@tempo/dashboard/oldSrc/customers/types';
import createSingleAutocompleteSelectHandler from '@tempo/dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@tempo/dashboard/oldSrc/utils/maps';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';

import WarehouseInfo from './WarehouseInfo';

export interface WarehouseCreatePageFormData extends AddressTypeInput {
  name: string;
}
export interface WarehouseCreatePageProps {
  countries: CountryWithCodeFragment[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: WarehouseCreatePageFormData) => SubmitPromise;
}

const initialForm: WarehouseCreatePageFormData = {
  city: '',
  companyName: '',
  country: '',
  countryArea: '',
  name: '',
  phone: '',
  postalCode: '',
  streetAddress1: '',
  streetAddress2: '',
};

const WarehouseCreatePage: FC<WarehouseCreatePageProps> = ({
  countries,
  disabled,
  errors,
  saveButtonBarState,
  onSubmit,
}) => {
  const router = useRouter();

  const [displayCountry, setDisplayCountry] = useStateFromProps('');

  const { errors: validationErrors, submit: handleSubmit } = useAddressValidation(onSubmit);

  return (
    <Form confirmLeave initial={initialForm} onSubmit={handleSubmit}>
      {({ change, data, set, submit }) => {
        const countryChoices = mapCountriesToChoices(countries);
        const countrySelect = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices
        );

        const handleCountrySelect = createCountryHandler(countrySelect, set);

        return (
          <Container>
            <Backlink href={'/warehouses'}>{m.dashboard_warehouses() ?? 'Warehouses'}</Backlink>
            <PageHeader
              title={
                m.dashboard_hcypC() ?? 'Create Warehouse'
                // header
              }
            />
            <Grid>
              <div>
                <WarehouseInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CompanyAddressInput
                  countries={countryChoices}
                  data={data}
                  disabled={disabled}
                  displayCountry={displayCountry}
                  errors={[...errors, ...validationErrors]}
                  header={
                    m.dashboard__Nlay() ?? 'Address Information'
                    // warehouse
                  }
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={disabled}
              onCancel={() => router.push('/warehouses')}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};

WarehouseCreatePage.displayName = 'WarehouseCreatePage';
export default WarehouseCreatePage;
