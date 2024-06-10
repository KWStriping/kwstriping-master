import type { FormDataBase } from '@tempo/next/types/misc';
import { debounce, isEqual } from 'lodash-es';
import { useCallback, useRef } from 'react';

interface UseFormAutofillSubmit<TFormData extends FormDataBase> {
  onSubmit: (formData: TFormData) => Promise<unknown> | void;
  getValues: () => TFormData;
  defaultFormData?: TFormData;
  onUnchanged?: () => void;
}

export const useFormDebouncedSubmit = <TFormData extends FormDataBase>({
  defaultFormData,
  getValues,
  onSubmit,
  onUnchanged,
}: UseFormAutofillSubmit<TFormData>) => {
  const previousFormData = useRef<TFormData | undefined>(defaultFormData);

  // because eslint is unable to read deps inside of debounce
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(
    debounce(() => {
      const formData = getValues();

      if (isEqual(formData, previousFormData.current)) {
        return onUnchanged?.();
      }

      previousFormData.current = formData;
      void onSubmit(formData);
    }, 2000),
    [onSubmit, getValues]
  );
};
