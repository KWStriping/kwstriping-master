import isEqual from 'lodash-es/isEqual';
import { useEffect, useState, useRef } from 'react';
import type { Dispatch, SetStateAction } from 'react';

/** useState, but updates state every time initial value changes. */
export function useStateUpdate<T>(data: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState(data);
  const prevInitialData = usePrevious(data);
  useEffect(() => {
    if (isEqual(data, prevInitialData)) return;
    setState(data);
  }, [data]);

  return [state, setState];
}

function usePrevious<T = any>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
