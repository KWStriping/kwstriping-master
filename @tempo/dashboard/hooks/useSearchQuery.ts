import { useState } from 'react';
import type { ChangeEvent } from '@tempo/dashboard/hooks/useForm';

export type UseSearchQuery = [string, (event: ChangeEvent) => void, () => void];
function useSearchQuery(onFetch: (query: string) => void, initial?: string): UseSearchQuery {
  const [query, setQuery] = useState(initial || '');
  const change = (event: ChangeEvent) => {
    const value = event.target.value;

    onFetch(value);
    setQuery(value);
  };

  const reset = () =>
    change({
      target: {
        name: '',
        value: initial || '',
      },
    });

  return [query, change, reset];
}

export default useSearchQuery;
