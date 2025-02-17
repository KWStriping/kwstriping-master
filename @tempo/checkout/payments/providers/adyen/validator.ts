import { hmacValidator } from '@adyen/api-library';
import type HmacValidator from '@adyen/api-library/lib/src/utils/hmacValidator';

export const adyenHmacValidator = new hmacValidator();

// wrap exceptions from validator in promise
export const validateHmac: (
  ...params: Parameters<HmacValidator['validateHMAC']>
) => Promise<boolean> = async (notificationRequestItem, hmac) => {
  return adyenHmacValidator.validateHMAC(notificationRequestItem, hmac);
};
