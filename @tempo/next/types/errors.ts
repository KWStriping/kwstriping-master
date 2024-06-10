export type GenericErrorCode = 'invalid' | 'required' | 'unique';

export type ErrorCode =
  | GenericErrorCode
  | 'quantityGreaterThanLimit'
  | 'insufficientStock'
  | 'invalidCredentials'
  | PasswordErrorCode
  | CheckoutFinalizeErrorCode;

export type PasswordErrorCode =
  | 'passwordTooShort'
  | 'passwordTooSimilar'
  | 'passwordTooCommon'
  | 'passwordInvalid';

export type CheckoutFinalizeErrorCode = 'missingFields';

export interface ValidationError<TFormData> {
  type: ErrorCode;
  path: keyof TFormData;
  message: string;
}

export interface ApiError<TFormData> {
  field: keyof TFormData;
  code: string;
  message: string;
}

export interface Error<TFormData> {
  field: keyof TFormData;
  code: ErrorCode;
  message: string;
}
