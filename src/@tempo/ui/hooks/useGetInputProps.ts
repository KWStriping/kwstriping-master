import type { Error } from '@tempo/next/types/errors';
import type {
  Control,
  RegisterOptions,
  UseFormReturn,
  FieldPath,
  UseFormRegisterReturn,
} from 'react-hook-form';

export type ControlFormData<FormControl> =
  FormControl extends Control<infer FormData> ? FormData : never;

export type FormInputProps<
  TControl extends Control,
  TData extends ControlFormData<TControl>,
> = UseFormRegisterReturn & {
  name: FieldPath<TData>;
  error: Error<TData> | undefined;
  control: Control<TData>;
};

export type GetInputProps = <
  TControl extends Control,
  TData extends ControlFormData<TControl>,
  TName extends FieldPath<TData> = FieldPath<TData>,
>(
  name: TName,
  options?: RegisterOptions<TData, TName>
) => FormInputProps<TControl, TData>;

type UseGetInputProps<TControl extends Control, TData extends ControlFormData<TControl>> = Pick<
  UseFormReturn<TData>,
  'formState' | 'register' | 'getFieldState'
> & {
  control: TControl;
};

export const useGetInputProps = <
  TControl extends Control,
  TData extends ControlFormData<TControl>,
>(
  { register, control, getFieldState, formState }: UseGetInputProps<TControl, TData>,
  defaultOptions?: RegisterOptions<TData>
) => {
  return <TName extends FieldPath<TData> = FieldPath<TData>>(
    name: TName,
    options?: RegisterOptions<TData, TName>
  ) => {
    const fieldState = getFieldState(name, formState);
    const inputProps = register(name, { ...defaultOptions, ...options } as any);
    console.log('inputProps', inputProps);
    return {
      ...inputProps,
      name,
      error: fieldState.error as Pick<Error<TData>, 'message'>,
      control,
    };
  };
};
