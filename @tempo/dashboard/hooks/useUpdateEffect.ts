import { useEffect, useRef } from 'react';

export function useUpdateEffect(fn: () => void, depArr: unknown[]) {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return fn();
    }
    mounted.current = true;
  }, depArr);
}

export default useUpdateEffect;
