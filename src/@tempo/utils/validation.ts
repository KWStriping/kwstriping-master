import type { ValidationError, ErrorCode } from '@tempo/next/types/errors';
import type { FormDataBase } from '@tempo/next/types/misc';
import { useCallback } from 'react';
import type { FieldErrors } from 'react-hook-form';
import type { ObjectSchema, ValidationError as YupValidationErrorObject } from 'yup';

export const getAllValidationErrors = <TFormData>({
  inner,
  ...rest
}: YupValidationErrorObject): ValidationError<TFormData>[] => {
  if (inner) {
    return inner.map(extractValidationError);
  }

  return [extractValidationError(rest)];
};

export const extractValidationError = <TFormData>({
  type,
  path,
  message,
}: Pick<YupValidationErrorObject, 'type' | 'path' | 'message'>): ValidationError<TFormData> => ({
  type: type as ErrorCode,
  path: path as keyof TFormData,
  message,
});

export const getErrorsAsObject = <TFormData extends Record<string, unknown>>(
  errors: ValidationError<TFormData>[]
): FieldErrors<TFormData> =>
  errors.reduce(
    (result, { path, ...rest }) => ({ ...result, [path]: rest }),
    {} as FieldErrors<TFormData>
  );

export const useValidationResolver = <
  TFormData extends FormDataBase,
  TShape extends Record<keyof TFormData, unknown>
>(
  schema: ObjectSchema<TShape>
) =>
  useCallback(
    async (data: TFormData) => {
      try {
        const values = await schema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (error) {
        const errors = getErrorsAsObject(
          getAllValidationErrors(error as YupValidationErrorObject)
        );
        return { values: {}, errors };
      }
    },
    [schema]
  );
