import { DEFAULT_INITIAL_PAGINATION_DATA } from '@tempo/dashboard/oldSrc/config';
import type { Sort } from '@tempo/dashboard/oldSrc/types';
import { useRouter } from 'next/navigation';

import { getSortUrlVariables } from '../sort';

type CreateUrl<T extends string> = (params: Sort<T>) => string;

function useSortHandler<T extends string>(createUrl: CreateUrl<T>) {
  const router = useRouter();
  const params = router.query as Sort<T>; // TODO: validate
  return (field: T) =>
    void router.replace(
      createUrl({
        ...params,
        ...getSortUrlVariables(field, params),
        ...DEFAULT_INITIAL_PAGINATION_DATA,
      })
    );
}

export default useSortHandler;
