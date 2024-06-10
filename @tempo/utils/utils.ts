import type { ChangeEvent, ReactEventHandler } from 'react';

export const handleInputChange =
  <TData>(callback: (value: TData) => void): ReactEventHandler<HTMLInputElement> =>
  (event: ChangeEvent<HTMLInputElement>) => {
    callback(event.target.value as unknown as TData);
  };
