import * as m from '@paraglide/messages';

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
): string {
  if (error) {
    switch (error.code) {
      case 'GRAPHQL_ERROR':
        return t('dashboard_graphqlError', commonErrorMessages.graphqlError.defaultMessage);
      case 'REQUIRED':
        return (m.dashboard_requiredField() ?? 'This field is required');
      case 'INVALID':
        return t('dashboard_invalid', commonErrorMessages.invalid.defaultMessage);

      default:
        return (m.dashboard_unknownError() ?? 'Unknown error');
    }
  }

  return undefined;
}

export default commonErrorMessages;
