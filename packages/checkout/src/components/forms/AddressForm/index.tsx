import type { AddressFragment, CheckoutError } from '@core/api';
import { CountryCode } from '@core/api/constants';
import { useTranslation } from '@core/i18n';
import type { AddressFormData, OmissibleAddressData } from '@core/types/addresses';
import Button from '@core/ui/components/buttons/Button';
import latLngData from '@data/stateLatLngs.json';
import stateNames from '@data/stateNames.json';
import TextField from '@mui/material/TextField';
import clsx from 'clsx';
import startCase from 'lodash-es/startCase';
import type { ReactNode } from 'react';
import { useState, useRef, useMemo, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import debounce from 'lodash-es/debounce';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { AddressAutocompleteInput } from './AddressAutocompleteInput';
import CountryAutocompleteField from './CountryAutocompleteField';
import type { StateCode } from './StateAutocompleteField';
import StateAutocompleteField from './StateAutocompleteField';

export interface AddressFormProps {
  autocomplete?: boolean;
  excludedFields?: (keyof OmissibleAddressData)[];
  omitHumanContactData?: boolean;
  initialData?: Maybe<Partial<AddressFragment>>;
  onChange?: (address: AddressFormData) => Promise<CheckoutError[]>;
  onSubmit?: (address: AddressFormData) => Promise<CheckoutError[]>;
  allowedCountries: { code: CountryCode; name: string }[];
  allowedStates?: StateCode[];
  onPlaceChange?: (place: google.maps.places.PlaceResult | null) => void;
  disabled?: boolean;
  children?: ReactNode;
}

const getAllExcludedFields = (
  excludedFields: AddressFormProps['excludedFields'] = [],
  omitHumanContactData: boolean
): NonNullable<AddressFormProps['excludedFields']> => [
  ...(omitHumanContactData ? (['firstName', 'lastName', 'phone'] as const) : []),
  ...excludedFields,
];

const getAddressFormDefaultData = ({
  initialData,
  allowedCountries,
  allowedStates,
  excludedFields,
}: Pick<
  AddressFormProps,
  'initialData' | 'allowedCountries' | 'allowedStates' | 'excludedFields'
>) => ({
  ...(excludedFields?.includes('firstName') ? {} : { firstName: initialData?.firstName ?? '' }),
  ...(excludedFields?.includes('lastName') ? {} : { lastName: initialData?.lastName ?? '' }),
  ...(excludedFields?.includes('phone') ? {} : { phone: initialData?.phone ?? '' }),
  streetAddress1: initialData?.streetAddress1 || '',
  city: initialData?.city
    ? /^[A-Z ]+$/.test(initialData.city)
      ? startCase(initialData.city.toLowerCase())
      : initialData.city
    : '',
  countryArea: allowedStates?.length === 1 ? allowedStates[0] : initialData?.countryArea || '',
  postalCode: initialData?.postalCode || '',
  countryCode: allowedCountries.length === 1 ? allowedCountries[0]!.code : CountryCode.Us,
});

export function AddressForm({
  autocomplete = false,
  initialData,
  onChange: _onFormChange,
  onSubmit,
  excludedFields: _excludedFields = [],
  omitHumanContactData = false,
  allowedCountries: _allowedCountries,
  allowedStates = [],
  onPlaceChange,
  disabled,
  children,
}: AddressFormProps) {
  const allowedCountries = [{ code: CountryCode.Us, name: 'United States of America' }]; // TODO
  const [selectedCountryCode, setSelectedCountryCode] = useState(CountryCode.Us);
  const excludedFields = getAllExcludedFields(_excludedFields, omitHumanContactData);
  const { t } = useTranslation();
  const [savable, setSavable] = useState(!autocomplete);
  const [saving, setSaving] = useState(false);
  const submittable = savable && !saving;
  const defaultValues = getAddressFormDefaultData({
    initialData,
    allowedCountries,
    allowedStates,
    excludedFields,
  });

  // TODO
  const addressSchema = Yup.object().shape({
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    companyName: Yup.string().optional(),
    streetAddress1: Yup.string().required(),
    streetAddress2: Yup.string().optional(),
    city: Yup.string().required(),
    countryArea:
      selectedCountryCode == CountryCode.Us ? Yup.string().required() : Yup.string().optional(),
    postalCode: Yup.string().required(),
    countryCode: Yup.mixed<CountryCode>().oneOf(Object.values(CountryCode)).required(),
  });

  const {
    control,
    watch,
    handleSubmit: handleSubmitAddress,
    formState: { errors: addressErrors },
    getValues,
    setError,
    clearErrors,
    setValue,
  } = useForm<AddressFormData>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(addressSchema),
    defaultValues,
  });

  const handleDebouncedChange = debounce(() => {
    const data = getValues();
    console.log('>>>>>> AddressForm.handleDebouncedChange', data);
    try {
      const validatedData = addressSchema.validateSync(data);
      clearErrors(); // TODO: what about errors from backend?
      _onFormChange?.(validatedData);
    } catch (e) {
      const validationError = e as Yup.ValidationError;
      // console.log(validationError.errors); // TODO
      if (validationError.path) {
        console.error();
        setError(validationError.path as keyof AddressFormData, {
          message: validationError.message || 'Invalid',
        });
      } else {
        console.error(validationError);
      }
    }
  }, 1000);

  const onFormChange = (event) => {
    console.log('>>>>>> AddressForm.onFormChange', event);
    handleDebouncedChange();
  };

  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  const selectedCountry = watch('countryCode');
  const selectedState = watch('countryArea');

  const areaLatLng = useMemo(() => {
    if (allowedStates.length) {
      const stateName =
        allowedStates.length === 1
          ? stateNames[allowedStates[0] as keyof typeof stateNames]
          : undefined;
      return latLngData.find((area) => area.state === stateName);
    }
    return undefined;
  }, [allowedStates]);

  const saveAddressFormData = handleSubmitAddress(async (formData: AddressFormData) => {
    setSaving(true);
    const errors = await onSubmit(formData);
    setSaving(false);
    // Assign errors to the form fields
    if (errors?.length) {
      errors?.forEach((e) => {
        console.error('>>> error', e);
        setError(e.field as keyof AddressFormData, {
          message: e.message || '',
        });
      });
    }
  });

  // TODO: this is to fix a bug... onFormChange should be triggered without this...
  useEffect(() => {
    console.log('>>> selectedState change', selectedState);
    onFormChange();
  }, [selectedState]);

  return (
    <form
      onChange={onFormChange}
      {...(onSubmit && { onSubmit: saveAddressFormData })}
      autoComplete={autocomplete ? 'off' : 'on'}
    >
      <div className="grid grid-cols-12 gap-3 w-full">
        {!excludedFields.includes('firstName') && (
          <div className="col-span-full sm:col-span-6">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label={t('checkout.firstNameField', 'First name')}
                  id="firstName"
                  fullWidth
                  spellCheck={false}
                  required
                  disabled={disabled}
                  {...field}
                />
              )}
            />
            {!!addressErrors.firstName?.message && <p>{addressErrors.firstName.message}</p>}
          </div>
        )}
        {!excludedFields.includes('lastName') && (
          <div className="col-span-full sm:col-span-6">
            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label={t('checkout.lastNameField', 'Last name')}
                  id="lastName"
                  fullWidth
                  spellCheck={false}
                  required
                  disabled={disabled}
                  {...field}
                />
              )}
            />
            {!!addressErrors.lastName?.message && <p>{addressErrors.lastName.message}</p>}
          </div>
        )}
        {autocomplete && (
          <div className="col-span-full">
            <AddressAutocompleteInput
              inputRef={autocompleteInputRef}
              label={t('checkout.addressField', 'Address')}
              allowNames={true}
              bounds={
                // TODO: Fix this hack!
                areaLatLng && {
                  sw: [areaLatLng.latitude - 5, areaLatLng.longitude - 5],
                  ne: [areaLatLng.latitude + 5, areaLatLng.longitude + 5],
                }
              }
              allowedCountries={allowedCountries}
              allowedStates={allowedStates}
              basedFields={{
                companyName: 'companyName',
                streetAddress1: 'streetAddress1',
                streetAddress2: 'streetAddress2',
                city: 'city',
                state: 'state',
                postalCode: 'postalCode',
                countryCode: 'countryCode',
              }}
              defaultValue={initialData?.streetAddress1}
              setValue={setValue}
              onChange={(event, place) => {
                console.log('AddressAutocompleteInput.onChange', place);
                setSavable(!!place);
                onPlaceChange?.(place);
              }}
              disabled={disabled}
            />
            {/* Don't display errors if the input is empty... */}
            {!!initialData?.streetAddress1 && !!Object.keys(addressErrors).length && (
              <ul>
                {Object.entries(addressErrors).map(([key, error], index) => (
                  <li key={index} className={'text-error'}>
                    {error.message
                      ? error.message
                      : error.type === 'required'
                        ? `The ${key} field is required.`
                        : `The ${key} field is invalid.`}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        <div
          className={clsx(
            'col-span-full grid grid-cols-12 gap-3 w-full',
            autocomplete && 'hidden'
          )}
        >
          <div className="col-span-full">
            <Controller
              name="streetAddress1"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label={t('checkout.streetAddress1', 'Address')}
                  id="streetAddress1"
                  fullWidth
                  spellCheck={false}
                  required
                  disabled={disabled}
                  {...field}
                />
              )}
            />
            {!!addressErrors.streetAddress1?.message && (
              <p>{addressErrors.streetAddress1.message}</p>
            )}
          </div>

          <div className="col-span-full">
            <Controller
              name="streetAddress2"
              control={control}
              rules={{ required: false }}
              render={({ field }) => (
                <TextField
                  label={t('checkout.streetAddress2', 'Address (line 2)')}
                  id="streetAddress2"
                  fullWidth
                  spellCheck={false}
                  disabled={disabled}
                  {...field}
                />
              )}
            />
            {!!addressErrors.streetAddress1?.message && (
              <p>{addressErrors.streetAddress1.message}</p>
            )}
          </div>

          <div className="col-span-full sm:col-span-6">
            <Controller
              name="city"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label={t('checkout.cityField', 'City')}
                  id="city"
                  fullWidth
                  spellCheck={false}
                  required
                  disabled={disabled}
                  {...field}
                />
              )}
            />
            {!!addressErrors.city?.message && <p>{addressErrors.city.message}</p>}
          </div>

          <div className="col-span-full sm:col-span-4">
            <Controller
              name="countryArea"
              control={control}
              rules={{ required: true }}
              render={({ field, fieldState }) => {
                if (selectedCountry === CountryCode.Us) {
                  const { ref, ...rest } = field;
                  return (
                    <StateAutocompleteField
                      label={t('checkout.stateField', 'State')}
                      allowedStates={allowedStates}
                      error={fieldState.error?.message}
                      inputRef={ref}
                      {...rest}
                      helperText={
                        addressErrors.phone?.message && (
                          <span className={'text-error'}>{addressErrors.phone.message}</span>
                        )
                      }
                      disabled={disabled}
                    />
                  );
                }
                return (
                  <TextField
                    label={t('checkout.countryArea', 'Province')}
                    id="countryArea"
                    spellCheck={false}
                    required
                    {...field}
                    helperText={
                      addressErrors.countryArea?.message && (
                        <span className={'text-error'}>{addressErrors.countryArea.message}</span>
                      )
                    }
                    disabled={disabled}
                  />
                );
              }}
            />
          </div>

          <div className="col-span-full sm:col-span-6">
            <Controller
              name="postalCode"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label={t('checkout.postalCodeField', 'Postal code')}
                  id="postal-code"
                  autoComplete="postal-code"
                  fullWidth
                  spellCheck={false}
                  required
                  {...field}
                  helperText={
                    addressErrors.postalCode?.message && (
                      <span className={'text-error'}>{addressErrors.postalCode.message}</span>
                    )
                  }
                  disabled={disabled}
                />
              )}
            />
          </div>

          <div className="col-span-full sm:col-span-6">
            <Controller
              name="countryCode"
              control={control}
              rules={{
                required: true,
                validate: (value) => !!value && typeof value === 'string',
              }}
              render={({ field }) => {
                // console.log('>>> allowedCountries', allowedCountries);
                const { ref, ...rest } = field;
                return (
                  <CountryAutocompleteField
                    label={t('checkout.countryField', 'Country')}
                    id="countryCode"
                    allowedCountries={allowedCountries}
                    inputRef={ref}
                    {...rest}
                    // helperText={
                    //   addressErrors.countryCode?.message && (
                    //     <span className={'text-error'}>{addressErrors.countryCode.message}</span>
                    //   )
                    // }
                    disabled={disabled}
                  />
                );
              }}
            />
            {!!addressErrors.countryCode?.message && <p>{addressErrors.countryCode.message}</p>}
          </div>
        </div>

        {!excludedFields?.includes('phone') && (
          <div className="col-span-full">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: true,
                pattern: /^(\+?[\s\d]+)?(\d{3}|\(?\d+\))?(-?\s?\d)+$/,
              }}
              render={({ field }) => {
                return (
                  <TextField
                    label={t('checkout.phoneField', 'Phone')}
                    id="phone"
                    fullWidth
                    className="border-gray-300 rounded-md shadow-sm text-base"
                    spellCheck={false}
                    {...field}
                    helperText={
                      addressErrors.phone?.message && (
                        <span className={'text-error'}>{addressErrors.phone.message}</span>
                      )
                    }
                    disabled={disabled}
                  />
                );
              }}
            />
            {!!addressErrors.phone?.message && <p>{addressErrors.phone.message}</p>}
          </div>
        )}
        {children && <div className="col-span-full">{children}</div>}
        {onSubmit && (
          <div className="col-span-full">
            <Button
              disabled={disabled || !submittable}
              type={'submit'}
              className="w-full"
              onClick={saveAddressFormData}
            >
              {t('checkout.saveButton', 'Save')}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
