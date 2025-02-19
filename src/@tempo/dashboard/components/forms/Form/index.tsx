import type { FormEvent, HTMLProps, ReactNode } from 'react';
import type { FormId } from './ExitFormDialogProvider';
import type { SubmitPromise, UseFormResult } from '@tempo/dashboard/hooks/useForm';
import useForm from '@tempo/dashboard/hooks/useForm';

export type CheckIfSaveIsDisabledFnType<T> = (data: T) => boolean;

export interface FormProps<TData, TErrors>
  extends Omit<HTMLProps<HTMLFormElement>, 'onSubmit' | 'children'> {
  children: (props: UseFormResult<TData>) => ReactNode;
  confirmLeave?: boolean;
  initial?: TData;
  resetOnSubmit?: boolean;
  onSubmit?: (data: TData) => SubmitPromise<TErrors[]> | void;
  formId?: FormId;
  checkIfSaveIsDisabled?: CheckIfSaveIsDisabledFnType<TData>;
  mergeData?: boolean;
}

function Form<TData, Terrors>({
  children,
  initial,
  resetOnSubmit,
  onSubmit,
  confirmLeave = false,
  formId,
  checkIfSaveIsDisabled,
  disabled,
  mergeData,
  ...rest
}: FormProps<TData, Terrors>) {
  const renderProps = useForm(initial, onSubmit, {
    confirmLeave,
    formId,
    checkIfSaveIsDisabled,
    disabled,
    mergeData,
  });

  function handleSubmit(event?: FormEvent<unknown>, cb?: () => void) {
    const { reset, submit } = renderProps;

    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (cb) {
      cb();
    }

    if (resetOnSubmit) {
      reset();
    }

    submit();
  }

  return (
    <form {...rest} onSubmit={handleSubmit}>
      {children(renderProps)}
    </form>
  );
}
Form.displayName = 'Form';

export default Form;
