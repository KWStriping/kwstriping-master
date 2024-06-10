import type { ApiError } from '@tempo/next/types/errors';
import type { FieldErrors, FieldValues } from 'react-hook-form';

export type ApiErrors<TFormData> = ApiError<TFormData>[];

export type Errors<TFormData extends FieldValues> = Partial<FieldErrors<TFormData>>;
