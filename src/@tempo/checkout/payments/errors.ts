import type { OrderFragment } from '@tempo/api/generated/graphql';
import type { PaymentProviderID } from '@tempo/checkout/types/payments';
import type { Errors } from './types';

export class MissingUrlError extends Error {
  constructor(public provider: PaymentProviderID, public order?: OrderFragment) {
    super(`Missing url! Provider: ${provider} | Order ID: ${order?.id ?? '(missing)'}`);
    Object.setPrototypeOf(this, MissingUrlError.prototype);
  }
}

export class KnownPaymentError extends Error {
  constructor(public provider: PaymentProviderID, public errors: Errors) {
    super(`Error! Provider: ${provider} | Errors: ${errors.join(', ')}`);
    Object.setPrototypeOf(this, KnownPaymentError.prototype);
  }
}

export class UnknownPaymentError extends Error {
  constructor(
    public provider: PaymentProviderID,
    public error: Error,
    public order?: OrderFragment
  ) {
    super(`Error! Provider: ${provider} | Error: ${error.message}`);
    Object.setPrototypeOf(this, UnknownPaymentError.prototype);
  }
}
