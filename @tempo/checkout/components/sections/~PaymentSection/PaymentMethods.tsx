import * as m from '@paraglide/messages';
import { SelectBox } from '@tempo/ui/components/inputs/SelectBox';
import { SelectBoxGroup } from '@tempo/ui/components/inputs/SelectBoxGroup';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';
import { AdyenDropIn } from './AdyenDropIn/AdyenDropIn';
import { paymentSectionLabels, paymentMethodsMessages } from './messages';
import { usePaymentMethodsForm } from '@tempo/checkout/components/sections/~PaymentSection/usePaymentMethodsForm';
import type { PaymentMethodID } from '@tempo/checkout/types/payments';

export const PaymentMethods = () => {
  const {
    availablePaymentMethods,
    availablePaymentProviders,
    onSelectPaymentMethod,
    selectedPaymentMethod,
  } = usePaymentMethodsForm();

  const showAdyenDropin = availablePaymentProviders.includes('adyen');
  const showOtherPaymentProviders = availablePaymentProviders.some(
    (provider) => provider && provider !== 'adyen'
  );

  return (
    <>
      {showAdyenDropin && <AdyenDropIn />}
      {showOtherPaymentProviders && (
        <SelectBoxGroup
          label={
            m[paymentSectionLabels.paymentProviders.id] ??
            paymentSectionLabels.paymentProviders.defaultMessage
          }
          className="flex flex-row gap-2"
          value={selectedPaymentMethod || availablePaymentMethods[0]}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            onSelectPaymentMethod(event.target.value as PaymentMethodID)
          }
        >
          {availablePaymentMethods.map((paymentMethodId) => (
            <SelectBox key={paymentMethodId} className="shrink" value={paymentMethodId}>
              <Typography>
                {m[paymentMethodsMessages[paymentMethodId]?.id] ??
                  paymentMethodsMessages[paymentMethodId]?.defaultMessage}
              </Typography>
            </SelectBox>
          ))}
        </SelectBoxGroup>
      )}
    </>
  );
};
