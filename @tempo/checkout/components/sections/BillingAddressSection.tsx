import * as m from '@paraglide/messages';
import { CheckoutBillingAddressUpdateDocument } from '@tempo/api/generated/graphql';
import { useUser } from '@tempo/api/auth/react/hooks';
import type { AddressFormData } from '@tempo/next/types';
import { AddressDisplay } from '@tempo/ui/components/AddressDisplay';
import { useShopSettings } from '@tempo/ui/providers';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { notNullable } from '@tempo/ui/utils/money';
import { useMutation } from '@tempo/api/hooks/useMutation';

import { assert } from 'tsafe/assert';
import { AddressForm } from '../forms/AddressForm';
import { SavedAddressSelectionList } from '../SavedAddressSelectionList';
import type { CommonCheckoutSectionProps } from './CheckoutSection';
import CheckoutSection from './CheckoutSection';
import { useSectionState } from '@tempo/checkout/hooks/state';

export function BillingAddressSection({ checkout, className }: CommonCheckoutSectionProps) {
  const { authenticated } = useUser();
  const { countries } = useShopSettings();
  const [{ editing }, updateState] = useSectionState('billingAddress');
  const [updateBillingAddress] = useMutation(CheckoutBillingAddressUpdateDocument);
  // const { query } = useLocalization();
  const query = { channel: 'default' };

  const { billingAddress } = checkout ?? {};

  const handleBillingAddressUpdate = async (formData: AddressFormData) => {
    console.log('BillingAddressSection.handleBillingAddressUpdate');
    assert(!!checkout);
    const { state, countryArea, ...address } = formData;
    const { data, errors } = await updateBillingAddress({
      address: {
        ...address,
        countryArea: state || countryArea,
      },
      id: checkout.id,
      // languageCode: query.languageCode,
    });
    console.log('>>>> data', data);
    if (!errors && !data?.updateCheckoutBillingAddress?.errors?.length)
      updateState({ validating: true });
    return data?.updateCheckoutBillingAddress?.errors?.filter(notNullable) || [];
  };

  // TODO
  const validate = () => {
    // console.log('>>>> billingAddressIsValid', billingAddressIsValid);
    return !!billingAddress;
  };

  return (
    <CheckoutSection
      sectionId="billingAddress"
      header={m.checkout_billingAddressCardHeader() ?? 'Billing address'}
      className={className}
      validate={validate}
    >
      {editing ? (
        <>
          {authenticated && (
            <SavedAddressSelectionList updateAddress={handleBillingAddressUpdate} />
          )}
          <AddressForm
            initialData={checkout?.billingAddress}
            // omitHumanContactData={true}
            onChange={handleBillingAddressUpdate}
            allowedCountries={countries}
          />
        </>
      ) : (
        <div className="flex justify-between items-center">
          {!!checkout?.billingAddress && <AddressDisplay address={checkout.billingAddress} />}
        </div>
      )}
    </CheckoutSection>
  );
}

export default BillingAddressSection;
