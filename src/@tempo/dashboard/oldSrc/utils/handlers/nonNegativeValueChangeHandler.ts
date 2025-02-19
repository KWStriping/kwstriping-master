import type { ChangeEvent } from 'react';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';

function createNonNegativeValueChangeHandler(change: FormChange) {
  return (event: ChangeEvent<unknown>) => {
    if (/^\d*(\.\d*)?$/.test(event.target.value)) {
      change(event);
    }
  };
}

export default createNonNegativeValueChangeHandler;
