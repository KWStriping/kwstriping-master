import type { ChangeEvent } from 'react';
import type { FormChange } from '@tempo/dashboard/hooks/useForm';
import type { AddressTypeInput } from '@tempo/dashboard/oldSrc/customers/types';

export const createCountryHandler =
  (currentHandler: FormChange, set: (dataSet: Partial<AddressTypeInput>) => void) =>
  (event: ChangeEvent<unknown>) => {
    currentHandler(event);
    set({ countryArea: '' });
  };
