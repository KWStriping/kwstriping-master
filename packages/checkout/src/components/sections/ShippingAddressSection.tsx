import type { CountryCode } from '@core/api';
import { CheckoutShippingAddressUpdateDocument } from '@core/api';
import { useUser } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import type { AddressFormData } from '@core/types/addresses';
import { AddressDisplay } from '@core/ui/components/AddressDisplay';
import { Button } from '@core/ui/components/buttons/Button';
import { useShopSettings } from '@core/ui/providers';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { notNullable } from '@core/ui/utils/money';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useSectionState } from '@core/checkout/hooks/state';
import type { AddressFormProps } from '../forms/AddressForm';
import { AddressForm } from '../forms/AddressForm';
import { SavedAddressSelectionList } from '../SavedAddressSelectionList';
import { AddressFormWithMap } from '../forms/AddressFormWithMap';
import { MapContextProvider } from '../Map';
import type { CommonCheckoutSectionProps } from './CheckoutSection';
import CheckoutSection from './CheckoutSection';

const ENABLE_MAP = true;

type ShippingAddressSectionProps = CommonCheckoutSectionProps &
  Pick<AddressFormProps, 'omitHumanContactData'>;

export function ShippingAddressSection({
  checkout,
  omitHumanContactData,
  className,
  disabled,
}: ShippingAddressSectionProps) {
  const { t } = useTranslation();
  const { countries, enableUseSameAsBilling, omitNameFromShippingAddress, allowedStates } =
    useShopSettings();
  const { query } = useLocalization();
  const { authenticated } = useUser();
  const [{ editing }, updateState] = useSectionState('shippingAddress');
  const [updateShippingAddress, { error }] = useMutation(CheckoutShippingAddressUpdateDocument);
  if (!checkout) return null;
  const { shippingAddress, billingAddress } = checkout;
  const onSameAsBilling = async () => {
    if (!billingAddress) return;
    const { data, error } = await updateShippingAddress({
      address: {
        firstName: billingAddress.firstName || '',
        lastName: billingAddress.lastName || '',
        companyName: billingAddress.companyName || '',
        phone: billingAddress.phone || '',
        countryCode: (billingAddress.country.code as CountryCode) || 'PL',
        countryArea: billingAddress.countryArea || '',
        streetAddress1: billingAddress.streetAddress1 || '',
        city: billingAddress.city || '',
        postalCode: billingAddress.postalCode || '',
      },
      id: checkout.id,
      // languageCode: query.languageCode,
    });
    if (error ?? data?.updateCheckoutShippingAddress?.errors?.length) {
      // todo: add error handling
      console.error(error);
      return;
    }
    // Successfully updated the shipping address
    updateState({ validating: true });
  };
  const handleShippingAddressUpdate = async (formData: AddressFormData) => {
    // console.log('>>>> handleShippingAddressUpdate', formData);
    const { state, countryArea, ...addressFields } = formData;
    const { data } = await updateShippingAddress({
      address: {
        ...addressFields,
        countryArea: state || countryArea,
      },
      id: checkout.id,
      // languageCode: query.languageCode,
    });
    updateState({ validating: true });
    return data?.updateCheckoutShippingAddress?.errors?.filter(notNullable) || [];
  };
  // TODO
  const validate = () => {
    // console.log('shippingAddressIsValid', shippingAddressIsValid);
    return !!shippingAddress && !error;
  };
  return (
    <CheckoutSection
      sectionId="shippingAddress"
      header={t('checkout.shippingAddress.header', 'Shipping address')}
      validate={validate}
      className={className}
    >
      {editing ? (
        <>
          {authenticated && (
            <SavedAddressSelectionList
              updateAddress={(address: AddressFormData) => handleShippingAddressUpdate(address)}
              disabled={disabled}
            />
          )}
          {enableUseSameAsBilling && (
            <div className="col-span-full pb-4">
              <Button
                type="button"
                className="w-full"
                onClick={onSameAsBilling}
                disabled={disabled}
              >
                {t('checkout.sameAsBillingButton', 'Use the same address as billing')}
              </Button>
            </div>
          )}
          {ENABLE_MAP ? (
            <MapContextProvider>
              <AddressFormWithMap
                omitHumanContactData={omitNameFromShippingAddress}
                initialData={shippingAddress || { countryArea: 'UT' }}
                onChange={handleShippingAddressUpdate}
                allowedCountries={countries}
                allowedStates={allowedStates}
                disabled={disabled}
              />
            </MapContextProvider>
          ) : (
            <AddressForm
              initialData={checkout.shippingAddress || undefined}
              onChange={handleShippingAddressUpdate}
              // onSubmit={handleShippingAddressUpdate}
              omitHumanContactData={omitHumanContactData}
              allowedCountries={countries}
              disabled={disabled}
            />
          )}
        </>
      ) : (
        <div className="flex justify-between items-center">
          {!!checkout.shippingAddress && <AddressDisplay address={checkout.shippingAddress} />}
        </div>
      )}
    </CheckoutSection>
  );
}

export default ShippingAddressSection;
