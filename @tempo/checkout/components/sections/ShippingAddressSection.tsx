import type { CheckoutError, CountryCode } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { CheckoutShippingAddressUpdateDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { AddressDisplay } from '@tempo/ui/components/AddressDisplay';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useShopSettings } from '@tempo/ui/providers';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { notNullable } from '@tempo/ui/utils/money';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { AddressFormProps } from '../forms/AddressForm';
import { AddressForm } from '../forms/AddressForm';
import { SavedAddressSelectionList } from '../SavedAddressSelectionList';
import { AddressFormWithMap } from '../forms/AddressFormWithMap';
import { MapContextProvider } from '../Map';
import type { CommonCheckoutSectionProps } from './CheckoutSection';
import CheckoutSection from './CheckoutSection';
import { useSectionState } from '@tempo/checkout/hooks/state';

type ShippingAddressSectionProps = CommonCheckoutSectionProps &
  Pick<AddressFormProps, 'omitHumanContactData'>;

export function ShippingAddressSection({
  checkout,
  omitHumanContactData,
  className,
  disabled,
}: ShippingAddressSectionProps) {
  const {
    countries,
    enableGoogleMapsAPI,
    enableUseSameAsBilling,
    omitNameFromShippingAddress,
    allowedStates,
  } = useShopSettings();
  const { query } = useLocalization();
  const { authenticated } = useUser();
  const [{ editing }, updateState] = useSectionState('shippingAddress');
  const [updateShippingAddress, { error }] = useMutation(CheckoutShippingAddressUpdateDocument);
  if (!checkout) return null;
  const { shippingAddress, billingAddress } = checkout;
  const onSameAsBilling = async () => {
    if (!billingAddress) return;
    const { data, errors } = await updateShippingAddress({
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
    if (errors) {
      // ?? data?.updateCheckoutShippingAddress?.errors?.length) {
      // todo: add error handling
      console.error(errors);
      return;
    }
    // Successfully updated the shipping address
    updateState({ validating: true });
  };
  const handleShippingAddressUpdate = async (formData: AddressFormData) => {
    // console.log('>>>> handleShippingAddressUpdate', formData);
    const { state, countryArea, ...addressFields } = formData;
    const { data, errors } = await updateShippingAddress({
      address: {
        ...addressFields,
        countryArea: state || countryArea,
      },
      id: checkout.id,
      // languageCode: query.languageCode,
    });
    updateState({ validating: true });
    return (errors?.filter(notNullable) as unknown as CheckoutError[]) || []; // TODO
  };
  // TODO
  const validate = () => {
    // console.log('shippingAddressIsValid', shippingAddressIsValid);
    return !!shippingAddress && !error;
  };
  return (
    <CheckoutSection
      sectionId="shippingAddress"
      header={m.checkout_shippingAddress_header() ?? 'Shipping address'}
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
                {m.checkout_sameAsBillingButton() ?? 'Use the same address as billing'}
              </Button>
            </div>
          )}
          {enableGoogleMapsAPI ? (
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
