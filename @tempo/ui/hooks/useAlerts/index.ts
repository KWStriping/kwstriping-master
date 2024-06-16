import * as m from '@paraglide/messages';
import type { ErrorCode } from '@tempo/next/types/errors';
import { camelCase } from 'lodash-es';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import type { GraphQLErrors } from '@apollo/client/errors';
import type { Alert, AlertType, AlertErrorData, CheckoutScope, CustomError } from './types';
import { useGetParsedApiErrors } from '@tempo/ui/hooks/useErrors';
import type { ApiErrors } from '@tempo/ui/hooks/useErrors';
import { errorMessages } from '@tempo/ui/hooks/useErrorMessages/messages';

export type { CheckoutScope };

function useAlerts(scope: CheckoutScope): {
  showErrors: (errors: Maybe<GraphQLErrors>) => void;
  showCustomErrors: (errors: CustomError[]) => void;
};

function useAlerts(): {
  showErrors: (errors: ApiErrors<any>, scope: CheckoutScope) => void;
  showCustomErrors: (errors: CustomError[], scope: CheckoutScope) => void;
};

function useAlerts(globalScope?: any): any {
  const { getParsedApiErrors } = useGetParsedApiErrors();

  const getMessageKey = (
    { scope, field, code }: AlertErrorData,
    { error } = { error: false }
  ) => {
    const keyBase = `${scope}-${field}-${code}`;
    return camelCase(error ? `${keyBase}-error` : keyBase);
  };

  const getErrorMessage = useCallback(({ code, field, scope }: AlertErrorData): string => {
    const messageKey = getMessageKey({ code, field, scope }, { error: true }) as Extract<
      keyof typeof errorMessages,
      string
    >;
    if (!errorMessages[messageKey]) {
      throw new Error('Missing error message');
    }
    try {
      return (m[messageKey] ?? errorMessages[messageKey].defaultMessage) as unknown as string;
    } catch (e) {
      // warnAboutMissingTranslation(messageKey);
      return m.alerts_somethingWentWrong();
    }
  }, []);

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
