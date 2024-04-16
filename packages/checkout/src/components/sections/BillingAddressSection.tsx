import { CheckoutBillingAddressUpdateDocument } from '@core/api';
import { useUser } from '@core/auth/react/hooks';
import { useTranslation } from '@core/i18n';
import type { AddressFormData } from '@core/types';
import { AddressDisplay } from '@core/ui/components/AddressDisplay';
import { useShopSettings } from '@core/ui/providers';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { notNullable } from '@core/ui/utils/money';
import { useMutation } from '@core/urql/hooks/useMutation';

import { assert } from 'tsafe/assert';
import { useSectionState } from '@core/checkout/hooks/state';
import { AddressForm } from '../forms/AddressForm';
import { SavedAddressSelectionList } from '../SavedAddressSelectionList';
import type { CommonCheckoutSectionProps } from './CheckoutSection';
import CheckoutSection from './CheckoutSection';

export function BillingAddressSection({ checkout, className }: CommonCheckoutSectionProps) {
  const { t } = useTranslation();
  const { authenticated } = useUser();
  const { countries } = useShopSettings();
  const [{ editing }, updateState] = useSectionState('billingAddress');
  const [updateBillingAddress] = useMutation(CheckoutBillingAddressUpdateDocument);
  const { query } = useLocalization();

  const { billingAddress } = checkout ?? {};

  const handleBillingAddressUpdate = async (formData: AddressFormData) => {
    console.log('BillingAddressSection.handleBillingAddressUpdate');
    assert(!!checkout);
    const { state, countryArea, ...address } = formData;
    const { data, error } = await updateBillingAddress({
      address: {
        ...address,
        countryArea: state || countryArea,
      },
      id: checkout.id,
      // languageCode: query.languageCode,
    });
    console.log('>>>> data', data);
    if (!error && !data?.updateCheckoutBillingAddress?.errors?.length)
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
      header={t('checkout.billingAddressCardHeader', 'Billing address')}
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
