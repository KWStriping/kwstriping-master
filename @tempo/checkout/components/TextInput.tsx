import type { Error } from '@tempo/types/errors';
import type { ControlFormData } from '@tempo/ui/hooks/useGetInputProps';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import type { ReactNode, AllHTMLAttributes, ForwardedRef } from 'react';
import { forwardRef } from 'react';
import type { Control, FieldPath, UseFormRegisterReturn } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

export type TextInputProps<
  TControl extends Control,
  TFormData extends ControlFormData<TControl>,
> = Omit<TextFieldProps, 'error' | 'ref'> &
  Omit<AllHTMLAttributes<HTMLInputElement>, 'onBlur' | 'onChange' | 'name' | 'ref'> &
  Omit<UseFormRegisterReturn, 'ref'> & {
    error: Pick<Error<TFormData>, 'message'> | undefined;
    control: TControl;
    name: FieldPath<TFormData>;
    label: string;
    optional?: boolean;
    icon?: ReactNode;
  };

const TextInputComponent = <
  TControl extends Control,
  TFormData extends ControlFormData<TControl>,
>(
  props: TextInputProps<TControl, TFormData>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const { name, control, optional, error } = props;

  const value = useWatch({
    control,
    name,
  });

  return (
    <TextField variant="outlined" inputRef={ref} name={name} value={value} required={!optional} />
  );
};

export const TextInput = forwardRef(TextInputComponent) as <
  TControl extends Control,
  TFormData extends ControlFormData<TControl>,
>(
  props: TextInputProps<TControl, TFormData> & {
    ref?: ForwardedRef<HTMLInputElement>;
  }
) => ReturnType<typeof TextInputComponent>;
