import type { UrlObject } from 'url';
import { DEFAULT_INITIAL_PAGINATION_DATA } from '@tempo/dashboard/oldSrc/config';
import type { Pagination } from '@tempo/dashboard/oldSrc/types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function usePaginationReset<T extends Pagination>(
  urlFunc: (params: T) => string | UrlObject,
  params: T,
  rowNumber: number
) {
  const router = useRouter();

  useEffect(
    () =>
      void router.replace(
        urlFunc({
          ...params,
          ...DEFAULT_INITIAL_PAGINATION_DATA,
        })
      ),
    [rowNumber]
  );

  useEffect(
    () =>
      void router.replace(
        urlFunc({
          ...params,
        })
      ),
    [params.before, params.after]
  );
}
