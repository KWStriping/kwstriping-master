import type { LanguageCode } from '@core/api';
import type { PaymentMethodID, PaymentProviderID } from './payments';

interface BasePaymentBody {
  languageCode: LanguageCode;
  provider: PaymentProviderID;
  method: PaymentMethodID;
  // captureAmount?: number; // support for partial payments
}

export interface OrderBody extends BasePaymentBody {
  orderId: string;
  redirectUrl: string;
}

export interface CheckoutBody extends BasePaymentBody {
  checkoutId: string;
  totalAmount: number;
  redirectUrl?: string;
}

export type PaymentRequestBody = OrderBody | CheckoutBody;

export type PayRequestBody = OrderBody | CheckoutBody;

export type PaymentStatusResponse = {
  status: 'PAID' | 'PENDING' | 'UNPAID';
  sessionLink?: string;
};

export type ChannelActivePaymentProvidersByChannel = {
  [P in PaymentMethodID]: PaymentProviderID | '';
};

export type DummyPayRequestBody = {
  checkoutApiUrl: string;
  amountCharged: {
    amount: number;
    currency: string;
  };
} & Pick<OrderBody, 'orderId'>;

export type DummyPayRequestResult =
  | {
      ok: true;
    }
  | { ok: false; error: string };
