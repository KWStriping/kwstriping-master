import type { CheckoutContactInfoUpdateMutation, CheckoutContactInfoUpdateMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import { CheckoutContactInfoUpdateDocument } from '@tempo/api/generated/graphql';
import { useShopSettings } from '@tempo/ui/providers';
import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { assert } from 'tsafe/assert';
import Button from '@tempo/ui/components/buttons/Button';
import { useEffect } from 'react';
import { useSectionState } from '@tempo/checkout/hooks/state';
import type { PointOfContact } from '../forms/ContactInfoForm';
import ContactInfoForm from '../forms/ContactInfoForm';
import type { CommonCheckoutSectionProps } from './CheckoutSection';
import CheckoutSection, { INCLUDE_SAVE_BUTTON } from './CheckoutSection';

export function ContactInfoSection({
  checkout,
  className,
  disabled,
}: CommonCheckoutSectionProps) {
  const { query } = useLocalization();
  const { enablePointsOfContact } = useShopSettings();
  const [{ editing }, updateState] = useSectionState('contactInfo');

  useEffect(() => {
    if (!!checkout && !editing) {
      updateState({ available: true });
    }
  }, [checkout, editing, updateState]);

  const [updateCheckoutContactInfo] = useMutation<CheckoutContactInfoUpdateMutation, CheckoutContactInfoUpdateMutationVariables>(CheckoutContactInfoUpdateDocument);

  const saveCheckoutContactInfo = async (formData: PointOfContact) => {
    assert(!!checkout);
    assert(!!formData.email);
    console.log('formData', formData);
    const result = await updateCheckoutContactInfo({
      id: checkout.id,
      input: {
        phone: formData.phone,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
      },
      // languageCode: query.languageCode,
    });
    const mutationErrors = result.data?.updateCheckoutContactInfo?.errors || [];
    if (mutationErrors?.length) {
      mutationErrors.forEach((e) => setError('email', { message: e.message || '' }));
      return;
    }
    // setEditing(false);
    updateState({ validating: true });
  };
  // TODO
  const validate = () => {
    // console.log('contactInfoIsValid', contactInfoIsValid);
    const errors = {};
    return !Object.values(errors).length;
  };
  return (
    <CheckoutSection
      sectionId="contactInfo"
      header={m.checkout_contactInfo_header() ?? 'Contact info'}
      validate={validate}
      className={className}
    >
      {editing ? (
        <>
          <ContactInfoForm
            poc={checkout}
            onChange={saveCheckoutContactInfo}
            // onSubmit={saveCheckoutContactInfo}
            defaultValues={{
              firstName: checkout?.customerFirstName || checkout?.user?.firstName || '',
              lastName: checkout?.customerLastName || checkout?.user?.lastName || '',
              email: checkout?.customerEmail || '',
              phone: checkout?.customerPhone || '',
            }}
            disabled={disabled}
          />
          {enablePointsOfContact && (
            <>
              {checkout?.pointsOfContact?.map((pointOfContact) => (
                <div key={pointOfContact.id}>
                  <ContactInfoForm
                    poc={pointOfContact}
                    onSubmit={() => {
                      throw new Error('Not yet implemented');
                    }}
                    disabled={disabled}
                  />
                </div>
              ))}
              <div>
                <Button
                  type="button"
                  onClick={() => {
                    throw new Error('Not yet implemented');
                  }}
                >
                  {m.checkout_contactInfo_addPointOfContact() ?? 'Add point of contact'}
                </Button>
              </div>
            </>
          )}
          {INCLUDE_SAVE_BUTTON && enablePointsOfContact && (
            <Button
              disabled={disabled}
              className={'w-full mt-2'}
              onClick={handleSubmit(saveCheckoutContactInfo)}
            >
              {m.checkout_contactInfo_save() ?? 'Save'}
            </Button>
          )}
        </>
      ) : (
        <>
          <div className="">
            {checkout?.customerFirstName && checkout.customerLastName && (
              <p className="text-base">
                {checkout.customerFirstName} {checkout.customerLastName}
              </p>
            )}
            <p className="text-base">{checkout?.customerEmail}</p>
            <p className="text-base">{checkout?.customerPhone}</p>
          </div>
          {enablePointsOfContact &&
            checkout?.pointsOfContact?.map((pointOfContact) => (
              <div key={pointOfContact.id}>
                <div className="flex justify-between items-center">
                  <p className="text-base">{pointOfContact?.email}</p>
                  <p className="text-base">{pointOfContact?.phone}</p>
                </div>
              </div>
            ))}
        </>
      )}
    </CheckoutSection>
  );
}

export default ContactInfoSection;
