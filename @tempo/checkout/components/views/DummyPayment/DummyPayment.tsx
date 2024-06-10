import * as m from '@paraglide/messages';
import { useOrderQuery } from '@tempo/api/generated/graphql';
// import { useTranslation } from '@tempo/next/i18n';
import { Button } from '@tempo/ui/components/buttons/Button';
import { useFetch, useGetInputProps } from '@tempo/ui/hooks';
import { useQueryParams } from '@tempo/utils/url';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { dummyPaymentMessages } from './messages';
import type { DummyPayRequestBody, DummyPayRequestResult } from '@tempo/checkout';
import { CHECKOUT_API_URL } from '@tempo/checkout/constants';
import { dummyPay as dummyPayRequest } from '@tempo/checkout/fetch';

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
  (charged: DummyPayRequestBody['amountCharged']) => Promise<void>,
];

const showError = (text: string) => toast(<Typography>{text}</Typography>, { type: 'error' });

const useDummyPay = (): UseDummyPayValues => {
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
          : m[dummyPaymentMessages.error.id] ?? dummyPaymentMessages.error.defaultMessage;
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
          {m[dummyPaymentMessages.dummyPayment.id] ??
            dummyPaymentMessages.dummyPayment.defaultMessage}
        </h2>
        <div className="checkout-form w-auto gap-4 px-4 py-4">
          <div className="flex flex-col">
            <p>
              <span className="text-text-secondary">
                {m[dummyPaymentMessages.orderTotalPrice.id] ??
                  dummyPaymentMessages.orderTotalPrice.defaultMessage}
              </span>
              : {orderPaymentAmount} {orderPaymentCurrency}
            </p>
            <p>
              <span className="text-text-secondary">
                {m[dummyPaymentMessages.orderAlreadyPaid.id] ??
                  dummyPaymentMessages.orderAlreadyPaid.defaultMessage}
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
              label={
                m[dummyPaymentMessages.dummyPaymentAmountPlaceholder.id]({
                  currency: orderPaymentCurrency.toUpperCase(),
                }) ?? dummyPaymentMessages.dummyPaymentAmountPlaceholder.defaultMessage
              }
              InputProps={{
                inputProps: {
                  max: paymentBalance,
                },
              }}
            />
            <Button
              disabled={orderResult.fetching}
              type="submit"
              aria-label={
                m[dummyPaymentMessages.dummyPay.id] ??
                dummyPaymentMessages.dummyPay.defaultMessage
              }
            >
              {dummyPayResult.fetching
                ? m[dummyPaymentMessages.loadingWithDots.id] ??
                  dummyPaymentMessages.loadingWithDots.defaultMessage
                : m[dummyPaymentMessages.dummyPay.id] ??
                  dummyPaymentMessages.dummyPay.defaultMessage}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
