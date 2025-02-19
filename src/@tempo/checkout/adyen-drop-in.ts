import type { CreateCheckoutSessionResponse } from '@adyen/api-library/lib/src/typings/checkout/createCheckoutSessionResponse';
import type { PaymentResponse as AdyenPaymentResponse } from '@adyen/api-library/lib/src/typings/checkout/paymentResponse';
import * as yup from 'yup';
import { PAYMENT_METHODS, PAYMENT_PROVIDERS } from '@tempo/checkout/types';

export type AdyenDropInCreateSessionResponse = {
  session: CreateCheckoutSessionResponse;
  clientKey?: string;
};
export const postDropInAdyenSessionsBody = yup
  .object({
    currency: yup.string().required(),
    totalAmount: yup.number().required(),
    id: yup.string().required(),
    redirectUrl: yup.string().required(),
    provider: yup
      .string()
      .oneOf([...PAYMENT_PROVIDERS])
      .required(),
  })
  .required();
export type PostDropInAdyenSessionsBody = yup.InferType<typeof postDropInAdyenSessionsBody>;

export type PostAdyenDropInPaymentsResponse = {
  payment: AdyenPaymentResponse;
  orderId: string;
};
export const postDropInAdyenPaymentsBody = yup
  .object({
    id: yup.string().required(),
    provider: yup
      .string()
      .oneOf([...PAYMENT_PROVIDERS])
      .required(),
    method: yup
      .string()
      .oneOf([...PAYMENT_METHODS])
      .required(),
    redirectUrl: yup.string().required(),
    adyenStateData: yup
      .object({
        paymentMethod: yup.object().unknown(true).required(),
        browserInfo: yup.object().unknown(true).notRequired(),
      })
      .unknown(true)
      .required(),
    totalAmount: yup.number().required(),
  })
  .required();
export type PostDropInAdyenPaymentsBody = yup.InferType<typeof postDropInAdyenPaymentsBody>;

export type PostAdyenDropInPaymentsDetailsResponse = {
  payment: AdyenPaymentResponse;
  orderId: string;
};
export const postDropInAdyenPaymentsDetailsBody = yup
  .object({
    adyenStateData: yup.object().unknown(true).required(),
  })
  .required();
export type PostDropInAdyenPaymentsDetailsBody = yup.InferType<
  typeof postDropInAdyenPaymentsDetailsBody
>;
