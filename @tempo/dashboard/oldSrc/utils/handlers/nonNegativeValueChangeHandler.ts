import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { ChangeEvent } from 'react';

function createNonNegativeValueChangeHandler(change: FormChange) {
  return (event: ChangeEvent<unknown>) => {
    if (/^\d*(\.\d*)?$/.test(event.target.value)) {
      change(event);
    }
  };
}

export default createNonNegativeValueChangeHandler;
