import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import { createCountryHandler } from '@dashboard/components/forms/AddressEdit/createCountryHandler';
import CompanyAddressInput from '@dashboard/components/forms/CompanyAddressInput';
import Form from '@dashboard/components/forms/Form';
import type {
  CountryWithCodeFragment,
  WarehouseErrorFragment,
} from '@core/api/graphql';
import useAddressValidation from '@dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
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
  const { t } = useTranslation();
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
            <Backlink href={'/warehouses'}>{t('dashboard.warehouses', 'Warehouses')}</Backlink>
            <PageHeader
              title={t(
                'dashboard.hcypC',
                'Create Warehouse'
                // header
              )}
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
                  header={t(
                    'dashboard.3Nlay',
                    'Address Information'
                    // warehouse
                  )}
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
