import type { CreateOrderFromCheckoutErrorCode, OrderFragment } from '@tempo/api/generated/graphql';
import type { PayRequestResponse } from '@tempo/checkout/types/api';
import type { OrderPaymentMetafield } from '@tempo/checkout/types/common';
import type { PaymentMethodID, PaymentProviderID } from '@tempo/checkout/types/payments';

type InternalErrorCodes =
  | 'COULD_NOT_CREATE_ORDER_FROM_CHECKOUT'
  | 'TOTAL_AMOUNT_MISMATCH'
  | 'UNKNOWN_PROVIDER'
  | 'UNKNOWN_METHOD'
  | 'MISSING_CHECKOUT_OR_ORDER_ID'
  | 'ORDER_DOES_NOT_EXIST'
  | 'ALREADY_PAID'
  | 'EXPIRED';

export type ErrorCode = InternalErrorCodes | CreateOrderFromCheckoutErrorCode;

export type Errors = ErrorCode[];

export interface CreatePaymentData {
  order: OrderFragment;
  redirectUrl: string;
  appUrl: string;
  method: PaymentMethodID;
}

export interface CreatePaymentResult {
  // The URL where the user should be redirected to to complete the payment
  url?: string | undefined | null;
  // Vendor-specific ID of the payment session
  id: string;
}

export interface ReuseExistingSessionParams {
  orderId: string;
  provider: PaymentProviderID;
  method: PaymentMethodID;
  privateMetafield: string;
}
interface ReuseExistingVendorSessionParams extends ReuseExistingSessionParams {
  payment: OrderPaymentMetafield;
}
export type ReuseExistingSessionResult = Promise<PayRequestResponse | undefined> | undefined;

export type ReuseExistingVendorSessionFn = (
  params: ReuseExistingVendorSessionParams
) => ReuseExistingSessionResult;
