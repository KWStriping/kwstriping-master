import { useTranslation } from '@core/i18n';

import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import Grid from '@core/ui/components/Grid';
import { Backlink } from '@core/ui/components/Layout/Backlink';
import useNotifier from '@core/ui/hooks/useNotifier';
import { makeStyles } from '@core/ui/theme/styles';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useQuery } from '@core/urql/hooks/useQuery';
import { extractMutationErrors } from '@core/urql/utils';
import { findInEnum } from '@core/utils/enums';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import type { ChangeEvent, FC } from 'react';
import CardTitle from '@dashboard/components/core/CardTitle';
import PageHeader from '@dashboard/components/core/PageHeader';
import PageSectionHeader from '@dashboard/components/core/PageSectionHeader';
import SaveBar from '@dashboard/components/core/SaveBar';
import { WindowTitle } from '@dashboard/components/core/WindowTitle';
import { createCountryHandler } from '@dashboard/components/forms/AddressEdit/createCountryHandler';
import CompanyAddressInput from '@dashboard/components/forms/CompanyAddressInput';
import Form from '@dashboard/components/forms/Form';

import FormSpacer from '@dashboard/components/forms/Form/FormSpacer';
import { CountryCode } from '@core/api/constants';

import { SiteSettingsDocument, ShopSettingsUpdateDocument } from '@core/api/graphql';
import type { ShopErrorFragment, SiteSettingsQuery } from '@core/api/graphql';
import useAddressValidation from '@dashboard/hooks/useAddressValidation';
import type { SubmitPromise } from '@dashboard/hooks/useForm';
import useStateFromProps from '@dashboard/hooks/useStateFromProps';
import type { SiteSettingsUrlQueryParams } from '@dashboard/oldSrc/siteSettings/urls';
import { getFormErrors } from '@dashboard/oldSrc/utils/errors';
import createSingleAutocompleteSelectHandler from '@dashboard/oldSrc/utils/handlers/singleAutocompleteSelectChangeHandler';
import { mapCountriesToChoices } from '@dashboard/oldSrc/utils/maps';

export interface SiteSettingsProps {
  params: SiteSettingsUrlQueryParams;
}

export const SiteSettings = () => {
  const notify = useNotifier();
  const { t } = useTranslation();

  const [siteSettings] = useQuery(SiteSettingsDocument, {
    displayLoader: true,
  });

  const [updateShopSettings, updateShopSettingsOpts] = useMutation(ShopSettingsUpdateDocument, {
    onCompleted: (data) => {
      if (
        [...(data?.updateShopAddress?.errors || []), ...(data?.updateShopSettings?.errors || [])]
          .length === 0
      ) {
        notify(t('dashboard.savedChanges', 'Saved changes'), {
          type: 'success',
        });
      }
    },
  });

  const errors = [
    ...(updateShopSettingsOpts.data?.updateShopSettings?.errors || []),
    ...(updateShopSettingsOpts.data?.updateShopAddress?.errors || []),
  ];
  const loading = siteSettings.fetching || updateShopSettingsOpts.fetching;

  const handleUpdateShopSettings = async (data: SiteSettingsPageFormData) => {
    const addressInput = areAddressInputFieldsModified(data)
      ? {
          city: data?.city,
          companyName: data?.companyName,
          country: data?.country ? findInEnum(data?.country, CountryCode) : undefined,
          countryArea: data?.countryArea,
          phone: data?.phone,
          postalCode: data?.postalCode,
          streetAddress1: data?.streetAddress1,
          streetAddress2: data?.streetAddress2,
        }
      : {
          companyName: data?.companyName,
        };

    return extractMutationErrors(
      updateShopSettings({
        addressInput,
        shopSettingsInput: {
          description: data?.description,
          reserveStockDurationAnonymousUser: data?.reserveStockDurationAnonymousUser || null,
          reserveStockDurationAuthenticatedUser:
            data?.reserveStockDurationAuthenticatedUser || null,
        },
      })
    );
  };

  return (
    <>
      <WindowTitle title={t('dashboard.siteSettings', 'Site Settings')} />
      <SiteSettingsPage
        disabled={loading}
        errors={errors}
        shop={siteSettings.data?.shop}
        onSubmit={handleUpdateShopSettings}
        saveButtonBarState={updateShopSettingsOpts.status}
      />
    </>
  );
};
export default SiteSettings;

export interface SiteSettingsPageAddressFormData {
  city: string;
  companyName: string;
  country: string;
  countryArea: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettingsPageFormData extends SiteSettingsPageAddressFormData {
  description: string;
  reserveStockDurationAnonymousUser: number;
  reserveStockDurationAuthenticatedUser: number;
  maxItemCountPerCheckout: number;
}

export interface SiteSettingsPageProps {
  disabled: boolean;
  errors: ShopErrorFragment[];
  shop?: SiteSettingsQuery['shop'];
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit: (data: SiteSettingsPageFormData) => SubmitPromise;
}

export function areAddressInputFieldsModified(data: SiteSettingsPageAddressFormData): boolean {
  return (
    [
      'city',
      'country',
      'countryArea',
      'phone',
      'postalCode',
      'streetAddress1',
      'streetAddress2',
    ] as Array<keyof SiteSettingsPageAddressFormData>
  )
    .map((key) => data[key])
    .some((field) => field !== '');
}

const useStyles = makeStyles(
  (theme) => ({
    hr: {
      gridColumnEnd: 'span 2',
      margin: theme.spacing(1, 0),
    },
  }),
  {
    name: 'SiteSettingsPage',
  }
);

const SiteSettingsPage: FC<SiteSettingsPageProps> = (props) => {
  const { disabled, errors, saveButtonBarState, shop, onSubmit } = props;
  // const styles = useStyles();
  const styles = {};
  const { t } = useTranslation();
  const router = useRouter();

  const [displayCountry, setDisplayCountry] = useStateFromProps(
    shop?.companyAddress?.country.name || ''
  );

  const { errors: validationErrors, submit: handleSubmitWithAddress } =
    useAddressValidation(onSubmit);

  const initialFormAddress: SiteSettingsPageAddressFormData = {
    city: shop?.companyAddress?.city || '',
    companyName: shop?.companyAddress?.companyName || '',
    country: shop?.companyAddress?.country.code || '',
    countryArea: shop?.companyAddress?.countryArea || '',
    phone: shop?.companyAddress?.phone || '',
    postalCode: shop?.companyAddress?.postalCode || '',
    streetAddress1: shop?.companyAddress?.streetAddress1 || '',
    streetAddress2: shop?.companyAddress?.streetAddress2 || '',
  };
  const initialForm: SiteSettingsPageFormData = {
    ...initialFormAddress,
    description: shop?.description || '',
    reserveStockDurationAnonymousUser: shop?.reserveStockDurationAnonymousUser ?? 0,
    reserveStockDurationAuthenticatedUser: shop?.reserveStockDurationAuthenticatedUser ?? 0,
    maxItemCountPerCheckout: shop?.maxItemCountPerCheckout ?? 0,
  };

  return (
    <Form
      initial={initialForm}
      onSubmit={(data) => {
        const submitFunc = areAddressInputFieldsModified(data)
          ? handleSubmitWithAddress
          : onSubmit;
        return submitFunc(data);
      }}
      confirmLeave
      disabled={disabled}
    >
      {({ change, data, set, isSaveDisabled, submit }) => {
        const countryChoices = mapCountriesToChoices(shop?.countries || []);
        const countrySelect = createSingleAutocompleteSelectHandler(
          change,
          setDisplayCountry,
          countryChoices
        );

        const handleCountrySelect = createCountryHandler(countrySelect, set);

        return (
          <Container>
            <Backlink href={'/configuration'}>
              {t('dashboard.configuration', 'Configuration')}
            </Backlink>
            <PageHeader title={t('dashboard.siteSettings', 'Site Settings')} underline={true} />
            <Grid variant="inverted">
              <PageSectionHeader
                title={t('dashboard.sectionCheckoutTitle', 'Checkout Configuration')}
                description={t(
                  'dashboard.sectionCheckoutDescription',
                  'You can set basic checkout rules that will be applied globally to all your channels'
                )}
              />
              <SiteCheckoutSettingsCard
                data={data}
                errors={errors}
                disabled={disabled}
                onChange={change}
              />
              <Divider className={styles.hr ?? ''} />
              <PageSectionHeader
                title={t('dashboard.sectionCompanyTitle', 'Company Information')}
                description={t(
                  'dashboard.sectionCompanyDescription',
                  'This address will be used to generate invoices and calculate shipping rates. Email address you provide here will be used as a contact address for your customers.'
                )}
              />
              <CompanyAddressInput
                data={data}
                displayCountry={displayCountry}
                countries={countryChoices}
                errors={[...errors, ...validationErrors]}
                disabled={disabled}
                header={t('dashboard.storeInformation', 'Store Information')}
                onChange={change}
                onCountryChange={handleCountrySelect}
              />
            </Grid>
            <SaveBar
              state={saveButtonBarState}
              disabled={!!isSaveDisabled}
              onCancel={() => router.push('/configuration')}
              onSubmit={submit}
            />
          </Container>
        );
      }}
    </Form>
  );
};

interface SiteCheckoutSettingsCardProps {
  data: SiteSettingsPageFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: ChangeEvent<unknown>) => void;
}

const SiteCheckoutSettingsCard: FC<SiteCheckoutSettingsCardProps> = ({
  data,
  disabled,
  errors,
  onChange,
}) => {
  const { t } = useTranslation();

  const formErrors = getFormErrors(
    [
      'reserveStockDurationAuthenticatedUser',
      'reserveStockDurationAnonymousUser',
      'maxItemCountPerCheckout',
    ],
    errors
  );

  return (
    <Card>
      <CardTitle title={t('dashboard.reservedStock', 'Reserved stock')} />
      <CardContent>
        <Typography variant="body2">
          {t(
            'dashboard.reservedStockDescription',
            'Set up time amount that stock in checkout is reserved for the customer. You can set separate values for authenticated and anonymous customers.'
          )}
        </Typography>
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.reserveStockDurationAuthenticatedUser}
          type="number"
          fullWidth
          name="reserveStockDurationAuthenticatedUser"
          label={t(
            'dashboard.stockReservationForAuthenticatedUser',
            'Stock reservation for authenticated user (in minutes)'
          )}
          helperText={t(
            'dashboard.stockWillNotBeReserved',
            'Leaving this setting empty will mean that stock won’t be reserved'
          )}
          value={
            data?.reserveStockDurationAuthenticatedUser
              ? String(data?.reserveStockDurationAuthenticatedUser)
              : ''
          }
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: 'none',
            },
          }}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.reserveStockDurationAnonymousUser}
          type="number"
          fullWidth
          name="reserveStockDurationAnonymousUser"
          label={t(
            'dashboard.stockReservationForAnonymousUser',
            'Stock reservation for anonymous user (in minutes)'
          )}
          helperText={t(
            'dashboard.stockWillNotBeReserved',
            'Leaving this setting empty will mean that stock won’t be reserved'
          )}
          value={
            data?.reserveStockDurationAnonymousUser
              ? String(data?.reserveStockDurationAnonymousUser)
              : ''
          }
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: 'none',
            },
          }}
        />
      </CardContent>
      <CardTitle title={t('dashboard.checkoutLimits', 'Checkout limits')} />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.reserveStockDurationAuthenticatedUser}
          type="number"
          fullWidth
          name="maxItemCountPerCheckout"
          label={t('dashboard.checkoutLineLimit', 'Checkout line limit')}
          helperText={t(
            'dashboard.checkoutLimitsDescription',
            'This number defines quantity of items in checkout line that can be bought. You can override this setting per variant. Leaving this setting empty mean that there is no limits.'
          )}
          value={data?.maxItemCountPerCheckout ? String(data?.maxItemCountPerCheckout) : ''}
          onChange={onChange}
          InputProps={{
            inputProps: {
              autoComplete: 'none',
              min: 0,
            },
          }}
        />
      </CardContent>
    </Card>
  );
};
