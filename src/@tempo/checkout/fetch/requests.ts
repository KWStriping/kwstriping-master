import type { FetchResponse } from '@tempo/ui/hooks/useFetch';
import join from 'url-join';
import type {
  PaymentStatusResponse,
  DummyPayRequestResult,
  DummyPayRequestBody,
} from '@tempo/checkout';
import type {
  AdyenDropInCreateSessionResponse,
  PostDropInAdyenSessionsBody,
  PostDropInAdyenPaymentsBody,
  PostAdyenDropInPaymentsResponse,
  PostDropInAdyenPaymentsDetailsBody,
  PostAdyenDropInPaymentsDetailsResponse,
} from '@tempo/checkout/adyen-drop-in';

export const urlJoinTrailingSlash = (...parts: string[]): string => {
  return join(...parts, '/');
};

export type PaymentMethodsRequestArgs = {
  channelId: string;
  checkoutApiUrl: string;
};

export const getOrderPaymentStatus = ({
  orderId,
  checkoutApiUrl = 'http://localhost:3000/api/', // TODO
}: {
  orderId: string;
  checkoutApiUrl: string;
}): FetchResponse<PaymentStatusResponse> =>
  fetch(urlJoinTrailingSlash(checkoutApiUrl, 'payment-status', orderId));

export const createDropInAdyenSession = ({
  checkoutApiUrl,
  ...body
}: PostDropInAdyenSessionsBody & {
  checkoutApiUrl: string;
}): FetchResponse<AdyenDropInCreateSessionResponse> => {
  return fetch(urlJoinTrailingSlash(checkoutApiUrl, 'drop-in', 'adyen', 'sessions'), {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const createDropInAdyenPayment = ({
  checkoutApiUrl,
  ...body
}: PostDropInAdyenPaymentsBody & {
  checkoutApiUrl: string;
}): FetchResponse<PostAdyenDropInPaymentsResponse | { message: string }> => {
  return fetch(urlJoinTrailingSlash(checkoutApiUrl, 'drop-in', 'adyen', 'payments'), {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const handleDropInAdyenPaymentDetails = ({
  checkoutApiUrl,
  ...body
}: PostDropInAdyenPaymentsDetailsBody & {
  checkoutApiUrl: string;
}): FetchResponse<PostAdyenDropInPaymentsDetailsResponse | { message: string }> => {
  return fetch(urlJoinTrailingSlash(checkoutApiUrl, 'drop-in', 'adyen', 'payments', 'details'), {
    method: 'POST',
    body: JSON.stringify(body),
  });
};

export const dummyPay = ({
  checkoutApiUrl,
  ...body
}: DummyPayRequestBody): FetchResponse<DummyPayRequestResult> =>
  fetch(urlJoinTrailingSlash(checkoutApiUrl, 'dummy-pay'), {
    method: 'POST',
    body: JSON.stringify(body),
  });
