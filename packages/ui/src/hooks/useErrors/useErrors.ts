import { useCallback, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { ApiErrors, Errors } from './types';
import { useGetParsedApiErrors } from './useGetParsedApiErrors';

export interface UseErrors<TFormData extends FieldValues> {
  errors: Errors<TFormData>;
  setApiErrors: (apiErrors: ApiErrors<TFormData>) => void;
  clearErrors: () => void;
  hasErrors: boolean;
}

export const useErrors = <TFormData extends FieldValues>(): UseErrors<TFormData> => {
  const [errors, setErrors] = useState<Errors<TFormData>>({});
  const { getParsedApiErrors } = useGetParsedApiErrors<TFormData>();

  const getParsedErrors = useCallback(
    (apiErrors: ApiErrors<TFormData>) => {
      if (!apiErrors) {
        return {} as Errors<TFormData>;
      }

      return getParsedApiErrors(apiErrors).reduce((result, { field, ...rest }) => {
        return {
          ...result,
          [field]: rest,
        };
      }, {} as Errors<TFormData>);
    },
    [getParsedApiErrors]
  );

  const setApiErrors = useCallback(
    (apiErrors: ApiErrors<TFormData>) => setErrors(getParsedErrors(apiErrors)),
    [setErrors, getParsedErrors]
  );

  const clearErrors = () => setErrors({});

  const hasErrors = Object.keys(errors).length > 0;

  return {
    errors,
    setApiErrors,
    clearErrors,
    hasErrors,
  };
};
