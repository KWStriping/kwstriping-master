import type { AddressFragment } from '@core/api';
import { useUserQuery } from '@core/api';
import { useTranslation } from '@core/i18n';
import type { AddressFormData } from '@core/types/addresses';
import { Checkbox } from '@core/ui/components/inputs/Checkbox';
import { useErrors } from '@core/ui/hooks/useErrors';
import { useMutation } from '@core/urql/hooks/useMutation';
import { getAddressValidationRulesVariables, getAddressInputData } from '@core/utils';
import { omit } from 'lodash-es';
import { useSetBillingSameAsShipping } from '@core/checkout/components/sections/~BillingAddressSection/useSetBillingSameAsShipping';
import { useSubmit } from '@core/checkout/hooks/useSubmit';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';
import { GuestAddressSection } from '../GuestAddressSection/GuestAddressSection';
import { UserAddressSection } from '../UserAddressSection/UserAddressSection';
import { billingMessages } from './messages';

export const BillingAddressSection = () => {
  const { t } = useTranslation();
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

  const [updateCheckoutBillingAddress] = useMutation(CheckoutBillingAddressUpdateDocument);

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
          label={t(
            billingMessages.useShippingAsBilling.id,
            billingMessages.useShippingAsBilling.defaultMessage
          )}
          data-testid={'useShippingAsBillingCheckbox'}
        />
      )}
      {!isBillingSameAsShipping && (
        <div className="mt-4" data-testid="billingAddressSection">
          {authUser ? (
            <UserAddressSection
              {...errorProps}
              title={t(
                billingMessages.billingAddress.id,
                billingMessages.billingAddress.defaultMessage
              )}
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
              title={t(
                billingMessages.billingAddress.id,
                billingMessages.billingAddress.defaultMessage
              )}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      )}
    </div>
  );
};
