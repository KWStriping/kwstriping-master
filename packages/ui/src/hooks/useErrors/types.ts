import type { ApiError } from '@core/types/errors';
import type { FieldErrors, FieldValues } from 'react-hook-form';

export type ApiErrors<TFormData> = ApiError<TFormData>[];

export type Errors<TFormData extends FieldValues> = Partial<FieldErrors<TFormData>>;
