import type { ChangeEvent } from 'react';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

export function createPageKlassSelectHandler(
  setPageKlass: (pageKlassId: string) => void,
  triggerChange: () => void
): FormChange {
  return (event: ChangeEvent<unknown>) => {
    const id = event.target.value;
    setPageKlass(id);
    triggerChange();
  };
}
