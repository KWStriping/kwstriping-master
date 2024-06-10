import { useTranslation } from '@core/i18n';
import { SelectBox } from '@core/ui/components/inputs/SelectBox';
import { SelectBoxGroup } from '@core/ui/components/inputs/SelectBoxGroup';
import Typography from '@mui/material/Typography';
import type { ChangeEvent } from 'react';
import { usePaymentMethodsForm } from '@core/checkout/components/sections/~PaymentSection/usePaymentMethodsForm';
import type { PaymentMethodID } from '@core/checkout/types/payments';
import { AdyenDropIn } from './AdyenDropIn/AdyenDropIn';
import { paymentSectionLabels, paymentMethodsMessages } from './messages';

export const PaymentMethods = () => {
  const { t } = useTranslation();
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
          label={t(
            paymentSectionLabels.paymentProviders.id,
            paymentSectionLabels.paymentProviders.defaultMessage
          )}
          className="flex flex-row gap-2"
        >
          {availablePaymentMethods.map((paymentMethodId) => (
            <SelectBox
              key={paymentMethodId}
              className="shrink"
              value={paymentMethodId}
              selectedValue={selectedPaymentMethod || availablePaymentMethods[0]}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onSelectPaymentMethod(event.target.value as PaymentMethodID)
              }
            >
              <Typography>
                {t(
                  paymentMethodsMessages[paymentMethodId]?.id,
                  paymentMethodsMessages[paymentMethodId]?.defaultMessage
                )}
              </Typography>
            </SelectBox>
          ))}
        </SelectBoxGroup>
      )}
    </>
  );
};
