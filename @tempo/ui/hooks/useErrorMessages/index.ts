import * as m from '@paraglide/messages';
import type { ErrorCode, GenericErrorCode } from '@tempo/next/types/errors';
import { useCallback, useMemo } from 'react';
import { errorMessages } from './messages';

export type ErrorMessages = Record<GenericErrorCode, string>;

interface UseErrorMessages {
  errorMessages: ErrorMessages;
  getMessageByErrorCode: (code: GenericErrorCode) => string;
}

const errorMessageKeys: ErrorCode[] = ['invalid', 'required', 'unique'];

export const useErrorMessages = (): UseErrorMessages => {
  const getMessageByErrorCode = useCallback((errorCode: ErrorCode) => {
    try {
      return m[errorMessages[errorCode]?.id] ?? errorMessages[errorCode].defaultMessage;
    } catch (e) {
      // warnAboutMissingTranslation(errorCode);
      return '';
    }
  }, []);

  const translatedErrorMessages: ErrorMessages = useMemo(
    () =>
      errorMessageKeys.reduce(
        (result, key) => ({
          ...result,
          [key]: getMessageByErrorCode(key),
        }),
        {} as ErrorMessages
      ),
    [getMessageByErrorCode]
  );

  return {
    errorMessages: translatedErrorMessages,
    getMessageByErrorCode,
  };
};
