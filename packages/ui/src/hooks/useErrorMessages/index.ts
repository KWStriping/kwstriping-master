import { useTranslation } from '@core/i18n';
import type { ErrorCode, GenericErrorCode } from '@core/types/errors';
import { useCallback, useMemo } from 'react';
import { errorMessages } from './messages';

export type ErrorMessages = Record<GenericErrorCode, string>;

interface UseErrorMessages {
  errorMessages: ErrorMessages;
  getMessageByErrorCode: (code: GenericErrorCode) => string;
}

const errorMessageKeys: ErrorCode[] = ['invalid', 'required', 'unique'];

export const useErrorMessages = (): UseErrorMessages => {
  const { t } = useTranslation();

  const getMessageByErrorCode = useCallback(
    (errorCode: ErrorCode) => {
      try {
        return t(errorMessages[errorCode]?.id, errorMessages[errorCode].defaultMessage);
      } catch (e) {
        // warnAboutMissingTranslation(errorCode);
        return '';
      }
    },
    [t]
  );

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
