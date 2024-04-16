import type { ErrorCode } from '@core/types/errors';

export type AlertType = 'error';

export interface AlertErrorData {
  scope: CheckoutScope;
  code: ErrorCode;
  field: string;
}

export type CustomError =
  | Pick<AlertErrorData, 'code'>
  | Pick<AlertErrorData, 'code' | 'field'>
  | { message: string };

export interface Alert {
  message: string;
  id: string;
  type: AlertType;
}

export type CheckoutScope =
  | 'checkoutFinalize'
  | 'checkoutShippingUpdate'
  | 'attachCustomerToCheckout'
  | 'checkoutBillingUpdate'
  | 'addPromoCodeToCheckout'
  | 'updateCheckoutFulfillmentMethod'
  | 'userAddressCreate'
  | 'userAddressUpdate'
  | 'userAddressDelete'
  | 'checkoutPay'
  | 'userRegister'
  | 'requestPasswordReset'
  | 'updateCheckoutLines'
  | 'updateCheckoutContactInfo'
  | 'resetPassword'
  | 'login';
