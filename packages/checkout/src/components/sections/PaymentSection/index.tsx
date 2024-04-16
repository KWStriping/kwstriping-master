import { useTranslation } from '@core/i18n';
import { SelectBox } from '@core/ui/components/inputs/SelectBox';
import { SelectBoxGroup } from '@core/ui/components/inputs/SelectBoxGroup';
import Typography from '@mui/material/Typography';
import { useCallback, useEffect, useMemo } from 'react';
import {
  useCheckoutActions,
  useSectionState,
  useSelectedPaymentMethod,
} from '@core/checkout/hooks/state';
import { usePaymentMethods } from '@core/checkout/hooks/usePaymentMethods';
import type { PaymentMethodID, PaymentProviderID } from '@core/checkout/types/payments';
import type { CommonCheckoutSectionProps } from '../CheckoutSection';
import CheckoutSection from '../CheckoutSection';

const PAYMENT_PROVIDERS: { id: string; label: string; description?: string }[] = [
  {
    id: 'dummy',
    label: 'Dummy',
    description: 'Dummy payment provider for testing purposes.',
  },
];

const PAYMENT_METHODS: { id: PaymentMethodID; label: string; description?: string }[] = [
  {
    id: 'dummy',
    label: 'Dummy',
    description: 'Dummy payment method for testing purposes.',
  },
  // {
  //   id: 'credit-card',
  //   label: 'Credit card',
  //   description: 'Pay with your credit card.',
  // },
  // {
  //   id: 'invoice',
  //   label: 'Invoice',
  //   description: 'You will be invoiced after the job is completed.',
  // },
];

export function PaymentSection({ checkout, className }: CommonCheckoutSectionProps) {
  const { t } = useTranslation();
  const { setSelectedPaymentMethod: setPaymentData } = useCheckoutActions();
  const { providers: availableProviders, methods: availableMethods } = usePaymentMethods(
    checkout?.channel.id
  );
  const [{ editing, validating }, updateState] = useSectionState('payment');
  const { paymentProvider, paymentMethod } = useSelectedPaymentMethod();

  const autoselect = useCallback(() => {
    const soleProvider = availableProviders[0] as PaymentProviderID;
    let soleMethod: PaymentMethodID | undefined;
    if (availableMethods.length === 1 && paymentMethod !== availableMethods[0]) {
      soleMethod = availableMethods[0] as PaymentMethodID;
    }
    // console.log('>>> autoselect', soleProvider, soleMethod);
    setPaymentData({ paymentProvider: soleProvider, paymentMethod: soleMethod });
    updateState({ validating: true });
  }, [availableProviders, availableMethods, paymentMethod, setPaymentData, updateState]);

  useEffect(() => {
    if (!paymentProvider || !paymentMethod) autoselect();
  }, [paymentProvider, paymentMethod, autoselect]);

  const validate = () => {
    const paymentIsValid = !!paymentProvider && !!paymentMethod;
    console.log('>>> paymentIsValid', paymentIsValid);
    return paymentIsValid;
  };
  const editable = useMemo(() => {
    if (!availableMethods?.length) return false;
    // if (availableMethods.length > 1) return true;
    return true; // availableMethods[0] !== 'invoice';
  }, [availableMethods]);
  // console.log('>>> PaymentSection', { availableProviders, availableMethods });
  return (
    <CheckoutSection
      sectionId="payment"
      header={t('checkout.paymentCardHeader', 'Payment')}
      className={className}
      validate={validate}
      editable={editable}
    >
      {!!availableProviders.length && (
        <div className="block">
          <SelectBoxGroup
            value={paymentProvider ?? null}
            onChange={(_, selected) => setPaymentData({ paymentProvider: selected })}
            className="mt-2"
            hideRadioButtons={availableMethods.length === 1}
            readOnly={availableMethods.length === 1}
          >
            {availableProviders.map((providerId) => {
              const provider = PAYMENT_PROVIDERS.find(({ id }) => id === providerId);
              if (!provider) throw new Error(`Payment provider ${providerId} not found`);
              return (
                <SelectBox
                  key={provider.id}
                  value={provider.id}
                  readOnly={availableProviders.length === 1}
                >
                  <div className={'p-2 grow'}>
                    <Typography variant={'h4'} className={'mb-2 font-bold'}>
                      {provider.label}
                    </Typography>
                    {provider.description && <Typography>{provider.description}</Typography>}
                    {/* {selectedPaymentProviderId === 'dummy' && <DummyCreditCardSection checkout={checkout} />} */}
                    {/* {selectedPaymentProviderId === 'stripe' && <StripeCreditCardSection checkout={checkout} />} */}
                    {paymentProvider === 'dummy' && !!availableMethods.length && (
                      <SelectBoxGroup
                        value={paymentMethod ?? null}
                        onChange={(_, selected) =>
                          setPaymentData({ paymentProvider, paymentMethod: selected })
                        }
                        className="mt-2"
                        hideRadioButtons={availableMethods.length === 1}
                        readOnly={availableMethods.length === 1}
                      >
                        {availableMethods.map((method) => {
                          const methodData = PAYMENT_METHODS.find(({ id }) => id === method);
                          if (!methodData) {
                            throw new Error(`Payment method ${method} not found`);
                          }
                          return (
                            <SelectBox
                              key={methodData.id}
                              value={methodData.id}
                              readOnly={availableMethods.length === 1}
                            >
                              <div className={'p-2'}>
                                {methodData.label && (
                                  <Typography variant={'h4'} className={'mb-2 font-bold'}>
                                    {methodData.label}
                                  </Typography>
                                )}
                                {methodData.description && (
                                  <Typography>{methodData.description}</Typography>
                                )}
                              </div>
                            </SelectBox>
                          );
                        })}
                      </SelectBoxGroup>
                    )}
                  </div>
                </SelectBox>
              );
            })}
          </SelectBoxGroup>
        </div>
      )}
    </CheckoutSection>
  );
}

export default PaymentSection;
