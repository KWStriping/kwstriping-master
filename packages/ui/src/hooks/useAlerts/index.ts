import { useTranslation } from '@core/i18n';
import type { ErrorCode } from '@core/types/errors';
import { errorMessages } from '@core/ui/hooks/useErrorMessages/messages';
import type { ApiErrors } from '@core/ui/hooks/useErrors';
import { useGetParsedApiErrors } from '@core/ui/hooks/useErrors';
import { camelCase } from 'lodash-es';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import type { Alert, AlertType, AlertErrorData, CheckoutScope, CustomError } from './types';

export type { CheckoutScope };

function useAlerts(scope: CheckoutScope): {
  showErrors: (errors: ApiErrors<any>) => void;
  showCustomErrors: (errors: CustomError[]) => void;
};

function useAlerts(): {
  showErrors: (errors: ApiErrors<any>, scope: CheckoutScope) => void;
  showCustomErrors: (errors: CustomError[], scope: CheckoutScope) => void;
};

function useAlerts(globalScope?: any): any {
  const { t } = useTranslation();
  const { getParsedApiErrors } = useGetParsedApiErrors();

  const getMessageKey = (
    { scope, field, code }: AlertErrorData,
    { error } = { error: false }
  ) => {
    const keyBase = `${scope}-${field}-${code}`;
    return camelCase(error ? `${keyBase}-error` : keyBase);
  };

  const getErrorMessage = useCallback(
    ({ code, field, scope }: AlertErrorData): string => {
      const messageKey = getMessageKey({ code, field, scope }, { error: true }) as Extract<
        keyof typeof errorMessages,
        string
      >;
      if (!errorMessages[messageKey]) {
        throw new Error('Missing error message');
      }
      try {
        return t(messageKey, errorMessages[messageKey].defaultMessage) as unknown as string;
      } catch (e) {
        // warnAboutMissingTranslation(messageKey);
        return t(
          'alerts.somethingWentWrong',
          'Sorry, something went wrong. Please try again in a moment.'
        );
      }
    },
    [t]
  );

  const getParsedAlert = useCallback(
    (data: AlertErrorData, type: AlertType): Alert => {
      const { scope, field, code } = data;

      return {
        id: camelCase(`${scope}-${field}-${code}`),
        message: getErrorMessage({ scope, code, field }),
        type,
      };
    },
    [getErrorMessage]
  );

  const showAlert = useCallback(
    ({
      message,
      type = 'error',
      ...rest
    }: Pick<Alert, 'message'> & { type?: AlertType; id?: string }) =>
      toast(message, { type, ...rest }),
    []
  );

  const showDefaultAlert = useCallback(
    (alertErrorData: AlertErrorData, { type }: { type: AlertType } = { type: 'error' }) => {
      const parsedAlert = getParsedAlert(alertErrorData, type);
      showAlert(parsedAlert);
    },
    [showAlert, getParsedAlert]
  );

  const showErrors = useCallback(
    (errors: ApiErrors<any>, scope: CheckoutScope = globalScope) =>
      getParsedApiErrors(errors).forEach((error) => showDefaultAlert({ ...error, scope })),
    [getParsedApiErrors, showDefaultAlert, globalScope]
  );

  const showCustomErrors = (errors: CustomError[], scope: CheckoutScope = globalScope) => {
    const parsedErrors = errors.map((error) => ({
      field: '',
      message: '',
      code: '',
      ...error,
    }));

    parsedErrors.forEach(({ field, message, code }) => {
      if (message) {
        showAlert({ message });
      } else if (field && code) {
        showDefaultAlert({ scope, field, code: code as ErrorCode });
      }
    });
  };

  return { showErrors, showCustomErrors };
}

export { useAlerts };
