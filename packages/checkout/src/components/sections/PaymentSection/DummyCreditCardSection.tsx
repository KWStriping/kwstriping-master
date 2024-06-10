import type { CheckoutFragment } from '@core/api';
import { CheckoutPaymentCreateDocument } from '@core/api';
import { useTranslation } from '@core/i18n';
import { useLocalization } from '@core/ui/providers/LocalizationProvider';
import { usePaths } from '@core/ui/providers/PathsProvider';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DEMO_MODE } from '@core/checkout/constants';
import { useCheckout } from '@core/checkout/providers/CheckoutProvider';

import { CompleteCheckoutButton } from '../../CompleteCheckoutButton';

export const DUMMY_CREDIT_CARD_GATEWAY = 'mirumee.payments.dummy';

interface CardForm {
  cardNumber: string;
  expDate: string;
  cvc: string;
}

interface DummyCreditCardSectionInterface {
  checkout: Maybe<CheckoutFragment>;
}

export function DummyCreditCardSection({ checkout }: DummyCreditCardSectionInterface) {
  const { t } = useTranslation();
  const { resetCheckoutId: resetCheckoutToken } = useCheckout();
  const paths = usePaths();
  const router = useRouter();
  const { formatPrice } = useLocalization();
  const [createCheckoutPaymentMutation] = useMutation(CheckoutPaymentCreateDocument);
  const [completeCheckoutMutation] = useMutation(CheckoutCompleteDocument);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const totalPrice = checkout.totalPrice?.gross;
  const payLabel = t('checkout.checkout.paymentButton', 'Pay {{total}}', {
    total: formatPrice(totalPrice),
  });

  const defaultValues = DEMO_MODE
    ? {
        cardNumber: '4242 4242 4242 4242',
        expDate: '12/34',
        cvc: '123',
      }
    : {};

  const { register: registerCard, handleSubmit: handleSubmitCard } = useForm<CardForm>({
    defaultValues,
  });

  const redirectToOrderPage = async () => {
    // without the `await` checkout data will be removed before the redirection which will cause issue with rendering checkout view
    await router.push(paths.order());
    resetCheckoutToken();
  };

  const handleSubmit = handleSubmitCard(async (formData: CardForm) => {
    setIsPaymentProcessing(true);

    // Create Tempo payment
    const { error: paymentCreateErrors } = await createCheckoutPaymentMutation({
      checkoutId: checkout.id,
      paymentInput: {
        gateway: DUMMY_CREDIT_CARD_GATEWAY,
        amount: checkout.totalPrice?.gross.amount.toString(),
        token: formData.cardNumber,
      },
    });

    if (paymentCreateErrors) {
      console.error(paymentCreateErrors);
      setIsPaymentProcessing(false);
      return;
    }

    // Try to complete the checkout
    const { data: completeData, error: completeErrors } = await completeCheckoutMutation({
      checkoutId: checkout.id,
    });
    if (completeErrors) {
      console.error('complete errors:', completeErrors);
      setIsPaymentProcessing(false);
      return;
    }

    const order = completeData?.completeCheckout?.order;
    // If there are no errors during payment and confirmation, order should be created
    if (order) {
      return redirectToOrderPage();
    } else {
      console.error('Order was not created');
    }
  });

  return (
    <div className="py-8">
      <form onSubmit={handleSubmit}>
        <div className="py-8">
          <div className="mt-4 grid grid-cols-12 gap-x-2 gap-y-4">
            <div className="col-span-6">
              <label htmlFor="card-number" className="block text-sm font-semibold text-gray-700">
                {t('checkout.cardNumberField', 'Card number')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="card-number"
                  className="block w-full border-gray-300 rounded-md shadow-sm text-base"
                  spellCheck={false}
                  {...registerCard('cardNumber', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="col-span-3">
              <label
                htmlFor="expiration-date"
                className="block text-sm font-semibold text-gray-700"
              >
                {t('checkout.expDateField', 'Expiration date')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="expiration-date"
                  className="block w-full border-gray-300 rounded-md shadow-sm text-base"
                  placeholder="MM / YY"
                  spellCheck={false}
                  {...registerCard('expDate', {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="col-span-3">
              <label htmlFor="cvc" className="block text-sm font-semibold text-gray-700">
                {t('checkout.cvcField', 'CVC')}
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="cvc"
                  className="block w-full border-gray-300 rounded-md shadow-sm text-base"
                  spellCheck={false}
                  {...registerCard('cvc', {
                    required: true,
                  })}
                />
              </div>
            </div>
          </div>
        </div>
        <CompleteCheckoutButton
          isProcessing={isPaymentProcessing}
          isDisabled={isPaymentProcessing}
        >
          {payLabel}
        </CompleteCheckoutButton>
      </form>
    </div>
  );
}

export default DummyCreditCardSection;
