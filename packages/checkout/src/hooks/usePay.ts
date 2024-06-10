import { useFetch } from '@core/ui/hooks/useFetch';
import { useLocale } from '@core/ui/hooks/useLocale';
import type { PaySuccessResult } from '@core/checkout/types/api';
import type {
  OrderBody,
  PaymentRequestBody,
  CheckoutBody,
} from '@core/checkout/types/payments-api';

const API_URL = '/api';

const getRedirectUrl = () => {
  const url = new URL(window.location.href);
  const redirectUrl = url.searchParams.get('redirectUrl');

  // get redirectUrl from query params (passed from storefront)
  if (redirectUrl) {
    return redirectUrl;
  }

  // return existing url without any search params
  return location.origin + location.pathname;
};

type UsePayReturnType = [
  (body: PaymentRequestBody) => Promise<{ ok?: boolean }>,
  {
    loading: boolean;
    error: any; // TODO
    data: any; // TODO
  },
];

export const usePay = (): UsePayReturnType => {
  const { languageCode } = useLocale();
  const [{ data, fetching: loading, error }, pay] = useFetch<
    PaySuccessResult,
    PaymentRequestBody
  >(`${API_URL}/pay`, {
    method: 'POST',
    skip: true,
  });

  const processPayment = async ({
    provider,
    method,
    ...rest
  }: Omit<PaymentRequestBody, 'languageCode'>) => {
    if ((rest as CheckoutBody).checkoutId) {
      const { checkoutId, totalAmount } = rest as CheckoutBody;
      const redirectUrl = getRedirectUrl();
      const result = await pay({
        languageCode,
        provider,
        method,
        checkoutId,
        totalAmount,
        redirectUrl,
      });
      console.log('processPayment.result', result);
      if (result?.data?.paymentUrl) {
        const {
          orderId,
          data: { paymentUrl },
        } = result;

        const newUrl = `?order=${orderId}`;

        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          '',
          newUrl
        );
        window.location.href = paymentUrl;
      }

      if (!result?.ok && result?.orderId) {
        // Order created, payment creation failed, checkout doesn't exist
        const newUrl = `?order=${result.orderId}`;
        window.location.href = newUrl;
      }

      return result;
    }
    const { orderId } = rest as OrderBody;
    const redirectUrl = getRedirectUrl();
    const result = await pay({
      languageCode,
      provider,
      method,
      orderId,
      redirectUrl,
    });

    if (result?.data?.paymentUrl) {
      window.location.href = result.data.paymentUrl;
    }

    return result;
  };
  return [processPayment, { data, loading, error }];
};
