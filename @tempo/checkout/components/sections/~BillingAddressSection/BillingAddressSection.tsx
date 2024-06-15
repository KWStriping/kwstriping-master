import type { CheckoutBillingAddressUpdateMutation, CheckoutBillingAddressUpdateMutationVariables } from '@tempo/api/generated/graphql';
import * as m from '@paraglide/messages';
import type { AddressFragment } from '@tempo/api/generated/graphql';
import { useUserQuery } from '@tempo/api/generated/graphql';
import type { AddressFormData } from '@tempo/next/types/addresses';
import { Checkbox } from '@tempo/ui/components/inputs/Checkbox';
import { useErrors } from '@tempo/ui/hooks/useErrors';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { getAddressValidationRulesVariables, getAddressInputData } from '@tempo/utils';
import { omit } from 'lodash-es';
import { useSetBillingSameAsShipping } from '@tempo/checkout/components/sections/~BillingAddressSection/useSetBillingSameAsShipping';
import { useSubmit } from '@tempo/checkout/hooks/useSubmit';
import { useCheckout } from '@tempo/checkout/providers/CheckoutProvider';
import { GuestAddressSection } from '../GuestAddressSection/GuestAddressSection';
import { UserAddressSection } from '../UserAddressSection/UserAddressSection';
import { billingMessages } from './messages';

export const BillingAddressSection = () => {
  const { user: authUser } = useUser();
  const { checkout } = useCheckout();
  const isShippingRequired = checkout?.isShippingRequired;
  const billingAddress = checkout?.billingAddress;
  const [{ data }] = useUserQuery({
    pause: !authUser?.id,
  });

  const user = data?.me;
  const addresses = user?.addresses;
  const errorProps = useErrors<AddressFormData>();
  const { setApiErrors } = errorProps;

  const [updateCheckoutBillingAddress] = useMutation<CheckoutBillingAddressUpdateMutation, CheckoutBillingAddressUpdateMutationVariables>(CheckoutBillingAddressUpdateDocument);

  const handleSubmit = useSubmit<AddressFormData, typeof updateCheckoutBillingAddress>({
    scope: 'checkoutBillingUpdate',
    onSubmit: updateCheckoutBillingAddress,
    formDataParse: ({ autoSave, languageCode, checkoutId, ...rest }) => ({
      languageCode,
      id: checkoutId,
      address: getAddressInputData(omit(rest, 'channel')),
      validationRules: getAddressValidationRulesVariables(autoSave),
    }),
    onError: setApiErrors,
  });

  const { isBillingSameAsShipping, setIsBillingSameAsShipping, passDefaultFormDataAddress } =
    useSetBillingSameAsShipping({
      handleSubmit,
    });

  return (
    <div className="mt-2">
      {isShippingRequired && (
        <Checkbox
          classNames={{ container: '!mb-0' }}
          value="useShippingAsBilling"
          checked={isBillingSameAsShipping}
          onChange={(event) => setIsBillingSameAsShipping(event.target.checked)}
          label={
            m[billingMessages.useShippingAsBilling.id] ??
            billingMessages.useShippingAsBilling.defaultMessage
          }
          data-testid={'useShippingAsBillingCheckbox'}
        />
      )}
      {!isBillingSameAsShipping && (
        <div className="mt-4" data-testid="billingAddressSection">
          {authUser ? (
            <UserAddressSection
              {...errorProps}
              title={
                m[billingMessages.billingAddress.id] ??
                billingMessages.billingAddress.defaultMessage
              }
              type="BILLING"
              onAddressSelect={handleSubmit}
              addresses={addresses as AddressFragment[]}
              defaultAddress={user?.defaultBillingAddress}
            />
          ) : (
            <GuestAddressSection
              {...errorProps}
              type="BILLING"
              checkAddressAvailability={false}
              defaultAddress={passDefaultFormDataAddress ? billingAddress : undefined}
              title={
                m[billingMessages.billingAddress.id] ??
                billingMessages.billingAddress.defaultMessage
              }
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};
