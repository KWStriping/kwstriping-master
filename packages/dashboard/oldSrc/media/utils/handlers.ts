import type { FormChange } from '@dashboard/hooks/useForm';
import type { ChangeEvent } from 'react';

export function createMediaTypeSelectHandler(
  setMediaType: (mediaTypeId: string) => void,
  triggerChange: () => void
): FormChange {
  return (event: ChangeEvent<unknown>) => {
    const id = event.target.value;
    setMediaType(id);
    triggerChange();
  };
}
