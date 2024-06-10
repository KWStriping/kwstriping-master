import type { FormChange } from '@dashboard/hooks/useForm';
import type { ChangeEvent } from 'react';

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
