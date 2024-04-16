import type { TFunction } from '@core/i18n';

const commonErrorMessages = {
  graphqlError: {
    id: 'c5pMZ8',
    defaultMessage: 'API error',
  },
  invalid: {
    id: '577R2r',
    defaultMessage: 'Invalid value',
  },
  unknownError: {
    id: 'qDwvZ4',
    defaultMessage: 'Unknown error',
  },
};

export const CommonErrorCode = {
  GRAPHQL_ERROR: 'GRAPHQL_ERROR',
  INVALID: 'INVALID',
  REQUIRED: 'REQUIRED',
} as const;

export type CommonErrorCode = (typeof CommonErrorCode)[keyof typeof CommonErrorCode];

export interface CommonError<ErrorCode> {
  code: ErrorCode | CommonErrorCode;
  field: string | null;
  message?: string | null;
}

export function getCommonFormFieldErrorMessage<ErrorCode>(
  error: CommonError<ErrorCode> | undefined,
  t: TFunction
): string {
  if (error) {
    switch (error.code) {
      case 'GRAPHQL_ERROR':
        return t('dashboard.graphqlError', commonErrorMessages.graphqlError.defaultMessage);
      case 'REQUIRED':
        return t('dashboard.requiredField', 'This field is required');
      case 'INVALID':
        return t('dashboard.invalid', commonErrorMessages.invalid.defaultMessage);

      default:
        return t('dashboard.unknownError', 'Unknown error');
    }
  }

  return undefined;
}

export default commonErrorMessages;
