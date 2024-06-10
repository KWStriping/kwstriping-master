import { useTranslation } from '@core/i18n';
import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import CardSpacer from '@dashboard/components/core/CardSpacer';
import CountryList from '@dashboard/components/core/CountryList';
import PageHeader from '@dashboard/components/core/PageHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import Form from '@dashboard/components/forms/Form';
import type { CountryFragment, ShippingErrorFragment } from '@core/api/graphql';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { FC } from 'react';

import ShippingZoneCountriesAssignDialog from './ShippingZoneCountriesAssignDialog';
import ShippingZoneInfo from './ShippingZoneInfo';

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
  const { t } = useTranslation();
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
            <Backlink href={'/shipping'}>{t('dashboard.shipping', 'Shipping methods')}</Backlink>
            <PageHeader title={t('dashboard.createZone', 'Create New Shipping Zone')} />
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
                  emptyText={t(
                    'dashboard.oCountriesAssigned',
                    'Currently, there are no countries assigned to this shipping zone'
                  )}
                  onCountryAssign={toggleModal}
                  onCountryUnassign={(countryCode) =>
                    change({
                      target: {
                        name: 'countries',
                        value: data?.countries?.filter((country) => country !== countryCode),
                      },
                    } as unknown)
                  }
                  title={t('dashboard.countries', 'Countries')}
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
