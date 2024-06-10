import Debounce from '@tempo/ui/components/Debounce';
import type { FormEvent, ChangeEvent, FC, ReactNode } from 'react';

export interface DebounceFormProps {
  change: (event: ChangeEvent<unknown>, cb?: () => void) => void;
  children: (props: (event: ChangeEvent<unknown>) => void) => ReactNode;
  submit: (event: FormEvent<unknown>) => void;
  time?: number;
}

export const DebounceForm: FC<DebounceFormProps> = ({ change, children, submit, time }) => (
  <Debounce debounceFn={submit} time={time}>
    {(debounceFn) =>
      children((event) => {
        change(event, debounceFn);
      })
    }
  </Debounce>
);
export default DebounceForm;
