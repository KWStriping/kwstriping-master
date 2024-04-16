import { useOrderQuery } from '@core/api';
import { useTranslation } from '@core/i18n';
import { Button } from '@core/ui/components/buttons/Button';
import { useFetch, useGetInputProps } from '@core/ui/hooks';
import { useQueryParams } from '@core/utils/url';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { DummyPayRequestBody, DummyPayRequestResult } from '@core/checkout';
import { CHECKOUT_API_URL } from '@core/checkout/constants';
import { dummyPay as dummyPayRequest } from '@core/checkout/fetch';
import { dummyPaymentMessages } from './messages';

const getOrderConfirmationUrl = () => {
  const url = new URL(window.location.href);

  url.searchParams.delete('dummyPayment');

  return url.href;
};

type UseDummyPayValues = [
  {
    data?: DummyPayRequestResult | undefined | null;
    loading: boolean;
    error?: unknown;
  },
  (charged: DummyPayRequestBody['amountCharged']) => Promise<void>
];

const showError = (text: string) => toast(<Typography>{text}</Typography>, { type: 'error' });

const useDummyPay = (): UseDummyPayValues => {
  const { t } = useTranslation();
  const { orderId = '' } = useQueryParams();
  const [dummyPayResult, pay] = useFetch(dummyPayRequest);

  const dummyPay = async (amountCharged: DummyPayRequestBody['amountCharged']) => {
    try {
      const result = await pay({
        orderId,
        checkoutApiUrl: CHECKOUT_API_URL,
        amountCharged,
      });

      if (result && result.ok) {
        window.location.href = getOrderConfirmationUrl();
      }

      if (result && !result.ok) {
        showError(result.error);
      }
    } catch (e: unknown) {
      const error =
        typeof e === 'string'
          ? e
          : t(dummyPaymentMessages.error.id, dummyPaymentMessages.error.defaultMessage);
      showError(error);
    }
  };

  return [{ ...dummyPayResult }, dummyPay];
};

type DummyPaymentFormValues = {
  amount: number;
};

export const DummyPayment = () => {
  const { orderId = '' } = useQueryParams();
  const { t } = useTranslation();
  const [orderResult] = useOrderQuery({ variables: { id: orderId } });
  const [dummyPayResult, dummyPay] = useDummyPay();

  const orderPaymentAmount = orderResult.data?.order?.total.gross.amount ?? 0;
  const orderPaymentCurrency = orderResult.data?.order?.total.gross.currency ?? '';
  const paymentBalance = Math.abs(orderResult.data?.order?.totalBalance.amount ?? 0);
  const paymentCaptured = orderResult.data?.order?.totalCaptured;

  const formProps = useForm<DummyPaymentFormValues>({
    defaultValues: { amount: paymentBalance },
  });
  const { handleSubmit } = formProps;
  const getInputProps = useGetInputProps(formProps as any);

  const submitHandler = async ({ amount }: DummyPaymentFormValues) => {
    await dummyPay({ amount, currency: orderPaymentCurrency });
  };

  useEffect(() => {
    if (orderResult.data?.order?.isPaid) {
      window.location.href = getOrderConfirmationUrl();
    }
  }, [orderResult.data?.order?.id, orderResult.data?.order?.isPaid]);

  return (
    <section className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-8">
        <h2 className="font-semibold text-4xl text-center">
          {t(
            dummyPaymentMessages.dummyPayment.id,
            dummyPaymentMessages.dummyPayment.defaultMessage
          )}
        </h2>
        <div className="checkout-form w-auto gap-4 px-4 py-4">
          <div className="flex flex-col">
            <p>
              <span className="text-text-secondary">
                {t(
                  dummyPaymentMessages.orderTotalPrice.id,
                  dummyPaymentMessages.orderTotalPrice.defaultMessage
                )}
              </span>
              : {orderPaymentAmount} {orderPaymentCurrency}
            </p>
            <p>
              <span className="text-text-secondary">
                {t(
                  dummyPaymentMessages.orderAlreadyPaid.id,
                  dummyPaymentMessages.orderAlreadyPaid.defaultMessage
                )}
              </span>
              : {paymentCaptured?.amount} {paymentCaptured?.currency}
            </p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>
            <TextField
              {...getInputProps('amount')}
              error={!!getInputProps('amount').error}
              variant="outlined"
              name="amount"
              type="number"
              label={t(
                dummyPaymentMessages.dummyPaymentAmountPlaceholder.id,
                dummyPaymentMessages.dummyPaymentAmountPlaceholder.defaultMessage,
                {
                  currency: orderPaymentCurrency.toUpperCase(),
                }
              )}
              InputProps={{
                inputProps: {
                  max: paymentBalance,
                },
              }}
            />
            <Button
              disabled={orderResult.fetching}
              type="submit"
              aria-label={t(
                dummyPaymentMessages.dummyPay.id,
                dummyPaymentMessages.dummyPay.defaultMessage
              )}
            >
              {dummyPayResult.fetching
                ? t(
                    dummyPaymentMessages.loadingWithDots.id,
                    dummyPaymentMessages.loadingWithDots.defaultMessage
                  )
                : t(
                    dummyPaymentMessages.dummyPay.id,
                    dummyPaymentMessages.dummyPay.defaultMessage
                  )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
