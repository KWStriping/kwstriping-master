import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import { mapEdgesToItems } from '@core/ui/utils/maps';

import { findValueInEnum } from '@core/utils/enums';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import { createCountryHandler } from '@dashboard/components/forms/AddressEdit/createCountryHandler';
import CompanyAddressInput from '@dashboard/components/forms/CompanyAddressInput';
import Form from '@dashboard/components/forms/Form';
import { CountryCode, WarehouseClickAndCollectOption } from '@core/api/constants';
import type {
  CountryWithCodeFragment,
  WarehouseDetailsFragment,
  WarehouseErrorFragment,
} from '@core/api/graphql';
import useAddressValidation from '@dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { AddressTypeInput } from '@dashboard/oldSrc/customers/types';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';

import WarehouseInfo from './WarehouseInfo';
import WarehouseSettings from './WarehouseSettings';

export interface WarehouseDetailsPageFormData extends AddressTypeInput {
  name: string;
  isPrivate: boolean;
  clickAndCollectOption: WarehouseClickAndCollectOption;
}
export interface WarehouseDetailsPageProps {
  countries: CountryWithCodeFragment[];
  disabled: boolean;
  errors: WarehouseErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  warehouse: Maybe<WarehouseDetailsFragment>;
  onDelete: () => void;
  onSubmit: (data: WarehouseDetailsPageFormData) => SubmitPromise;
}

const WarehouseDetailsPage: FC<WarehouseDetailsPageProps> = ({
  countries,
  disabled,
  errors,
  saveButtonBarState,
  warehouse,
  onDelete,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  const [displayCountry, setDisplayCountry] = useStateFromProps(
    warehouse?.address?.country.name || ''
  );

  const { errors: validationErrors, submit: handleSubmit } = useAddressValidation(onSubmit);

  const initialForm: WarehouseDetailsPageFormData = {
    city: warehouse?.address?.city ?? '',
    companyName: warehouse?.address?.companyName ?? '',
    country: warehouse ? findValueInEnum(warehouse.address?.country?.code, CountryCode) : '',
    isPrivate: !!warehouse?.isPrivate,
    clickAndCollectOption:
      warehouse?.clickAndCollectOption || WarehouseClickAndCollectOption.Disabled,
    countryArea: warehouse?.address?.countryArea ?? '',
    name: warehouse?.name ?? '',
    phone: warehouse?.address.phone ?? '',
    postalCode: warehouse?.address.postalCode ?? '',
    streetAddress1: warehouse?.address.streetAddress1 ?? '',
    streetAddress2: warehouse?.address.streetAddress2 ?? '',
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={handleSubmit} disabled={disabled}>
      {({ change, data, isSaveDisabled, submit, set }) => {
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
            <PageHeader title={warehouse?.name} />
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
              <div>
                <WarehouseSettings
                  zones={mapEdgesToItems(warehouse?.shippingZones)}
                  data={data}
                  disabled={disabled}
                  onChange={change}
                  setData={set}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              onCancel={() => router.push('/warehouses')}
              onDelete={onDelete}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </Container>
        );
      }}
    </Form>
  );
};

WarehouseDetailsPage.displayName = 'WarehouseDetailsPage';
export default WarehouseDetailsPage;
