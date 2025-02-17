import { useEffect } from 'react';

function useOnMount(name: string) {
  useEffect(() => console.log(`mounted node ${name}`), []);
}

export default useOnMount;
