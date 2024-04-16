import type { Errors } from '@core/ui/hooks/useErrors';
import { forEach } from 'lodash-es';
import { useCallback, useEffect } from 'react';
import type { FieldError, FieldValues, Path, UseFormSetError } from 'react-hook-form';

export interface SetFormErrorsProps<TFormData extends FieldValues> {
  setError: UseFormSetError<TFormData>;
  errors?: Errors<TFormData>;
}

export const setFormErrors = <TFormData extends FieldValues>({
  setError,
  errors,
}: SetFormErrorsProps<TFormData>) => {
  forEach(errors, (error, key) => {
    setError(key as Path<TFormData>, {
      message: (error as unknown as FieldError).message,
    });
  });
};

function useSetFormErrors<TFormData extends FieldValues>({
  setError,
  errors,
}: {
  setError: UseFormSetError<TFormData>;
  errors?: Errors<TFormData>;
}) {
  const setFormErrors = useCallback(() => {
    // because we don't get this prop when setting errors from hook form
    const hasErrors = typeof errors === 'object' ? !!Object.keys(errors).length : false;

    if (hasErrors) {
      forEach(errors, (error, key) => {
        setError(key as Path<TFormData>, {
          message: (error as unknown as FieldError).message,
        });
      });
    }
  }, [errors, setError]);

  useEffect(() => {
    setFormErrors();
  }, [errors, setFormErrors]);
}

export { useSetFormErrors };
