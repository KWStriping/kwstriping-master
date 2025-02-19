import * as m from '@paraglide/messages';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import Grid from '@tempo/ui/components/Grid';
import { Backlink } from '@tempo/ui/components/Layout/Backlink';
import type { CountryFragment, ShippingErrorFragment } from '@tempo/api/generated/graphql';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import type { FC } from 'react';

import ShippingZoneCountriesAssignDialog from './ShippingZoneCountriesAssignDialog';
import ShippingZoneInfo from './ShippingZoneInfo';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import Form from '@tempo/dashboard/components/forms/Form';
import SaveBar from '@tempo/dashboard/components/core/SaveBar';
import PageHeader from '@tempo/dashboard/components/core/PageHeader';
import CountryList from '@tempo/dashboard/components/core/CountryList';
import CardSpacer from '@tempo/dashboard/components/core/CardSpacer';

export interface ShippingZoneCreateFormData {
  countries: string[];
  description: string;
  name: string;
}

export interface ShippingZoneCreatePageProps {
  countries: CountryFragment[];
  restWorldCountries: string[];
  disabled: boolean;
  errors: ShippingErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: ShippingZoneCreateFormData) => SubmitPromise;
}

const ShippingZoneCreatePage: FC<ShippingZoneCreatePageProps> = ({
  countries,
  restWorldCountries,
  disabled,
  errors,
  onSubmit,
  saveButtonBarState,
}) => {
  const router = useRouter();

  const [isModalOpened, setModalStatus] = useState(false);
  const toggleModal = () => setModalStatus(!isModalOpened);

  const initialForm: ShippingZoneCreateFormData = {
    countries: [],
    description: '',
    name: '',
  };

  return (
    <Form confirmLeave initial={initialForm} onSubmit={onSubmit} disabled={disabled}>
      {({ change, data, isSaveDisabled, submit }) => (
        <>
          <Container>
            <Backlink href={'/shipping'}>{m.dashboard_shipping() ?? 'Shipping methods'}</Backlink>
            <PageHeader title={m.dashboard_createZone() ?? 'Create New Shipping Zone'} />
            <Grid>
              <div>
                <ShippingZoneInfo
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CountryList
                  countries={data?.countries?.map((selectedCountry) =>
                    countries.find((country) => country.code === selectedCountry)
                  )}
                  disabled={disabled}
                  emptyText={
                    m.dashboard_oCountriesAssigned() ??
                    'Currently, there are no countries assigned to this shipping zone'
                  }
                  onCountryAssign={toggleModal}
                  onCountryUnassign={(countryCode) =>
                    change({
                      target: {
                        name: 'countries',
                        value: data?.countries?.filter((country) => country !== countryCode),
                      },
                    } as unknown)
                  }
                  title={m.dashboard_countries() ?? 'Countries'}
                />
              </div>
            </Grid>
            <SaveBar
              disabled={isSaveDisabled}
              onCancel={() => router.push('/shipping')}
              onSubmit={submit}
              state={saveButtonBarState}
            />
          </Container>
          <ShippingZoneCountriesAssignDialog
            open={isModalOpened}
            onConfirm={(formData) => {
              change({
                target: {
                  name: 'countries',
                  value: formData.countries,
                },
              } as unknown);
              toggleModal();
            }}
            confirmButtonState="default"
            countries={countries}
            restWorldCountries={restWorldCountries}
            initial={data?.countries}
            onClose={toggleModal}
          />
        </>
      )}
    </Form>
  );
};
ShippingZoneCreatePage.displayName = 'ShippingZoneCreatePage';
export default ShippingZoneCreatePage;
