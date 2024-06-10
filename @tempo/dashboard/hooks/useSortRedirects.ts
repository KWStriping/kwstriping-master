import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { Sort } from '@tempo/dashboard/oldSrc/types';

export type SortByRankUrlQueryParams<T extends string> = Sort<T> & {
  query?: string;
};

export interface UseSortRedirectsOpts<SortField extends string> {
  params: SortByRankUrlQueryParams<SortField>;
  defaultOrdering: SortField;
  urlFunc: (params: SortByRankUrlQueryParams<SortField>) => string;
  resetToDefault?: boolean;
}
/**
 * useSortRedirects is a hook that should be used in lists views
 * where using search changes the sort field to "rank". Removing
 * query changes sort field back to default one provided in params.
 */
export function useSortRedirects<SortField extends string>({
  params,
  defaultOrdering,
  urlFunc,
  resetToDefault,
}: UseSortRedirectsOpts<SortField>) {
  const router = useRouter();

  const hasQuery = !!params.query?.trim();

  useEffect(() => {
    const sortWithQuery = 'rank' as SortField;
    const sortWithoutQuery = params.sort === 'rank' ? defaultOrdering : params.sort;
    void router.replace(
      urlFunc({
        ...params,
        asc: hasQuery ? false : params.asc,
        sort: hasQuery ? sortWithQuery : sortWithoutQuery,
      })
    );
  }, [params.query]);

  useEffect(() => {
    if (resetToDefault) {
      void router.replace(
        urlFunc({
          ...params,
          sort: defaultOrdering,
        })
      );
    }
  }, [params]);
}
