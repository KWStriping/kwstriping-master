import { useLayoutEffect, useState } from 'react';

export const useHasRendered = () => {
  const [hasRendered, setHasRendered] = useState(false);

  useLayoutEffect(() => {
    setHasRendered(true);
  }, []);

  return hasRendered;
};
