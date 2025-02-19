import type { CreatePaymentData, CreatePaymentResult } from '@tempo/checkout/payments/types';

export const createDummyPayment = async ({
  redirectUrl,
}: Pick<CreatePaymentData, 'redirectUrl'>): Promise<CreatePaymentResult> => {
  return {
    url: redirectUrl,
    id: '',
  };
};
