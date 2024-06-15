'use client';

import type { TypedDocumentNode } from '@urql/core';
import debounce from 'lodash-es/debounce';
import { useCallback, useMemo, useState } from 'react';
import type { UseQueryState } from '@urql/next';
import type { UseAuthorizedQueryHookOptions, UseQueryHookOptions } from './useQuery';
import { useAuthorizedQuery } from './useQuery';

export interface SearchVariables {
  after?: Maybe<string>;
  first: number;
  query: string;
}

export const DEFAULT_INITIAL_SEARCH_DATA: SearchVariables = {
  after: undefined,
  first: 20,
  query: '',
};

export interface UseSearchResult<TData, TVariables extends SearchVariables> {
  loadMore: () => void;
  result: UseQueryState<TData, TVariables>;
  search: (query: string) => void;
  query: string;
}
export type UseSearchOptions<TVariables extends SearchVariables> = Partial<{
  pause: boolean;
  variables: TVariables;
}> &
  Partial<UseQueryHookOptions<TVariables>>;

export type UseSearchHook<TData, TVariables extends SearchVariables> = (
  opts: UseSearchOptions<TVariables>
) => UseSearchResult<TData, TVariables>;

export function useSearch<TData, TVariables extends SearchVariables>(
  document: TypedDocumentNode<TData, TVariables>,
  options: UseSearchOptions<TVariables> = {}
): UseSearchResult<TData, TVariables> {
  const [query, setQuery] = useState('');
  const recklesslyUpdateQuery = useCallback((term: string) => setQuery(term), []);
  const updateQuery = useMemo(
    () => debounce(recklesslyUpdateQuery, 1000),
    [recklesslyUpdateQuery]
  );
  const queryHookOptions = {
    displayLoader: true,
    ...options,
    variables: {
      DEFAULT_INITIAL_SEARCH_DATA,
      ...options.variables,
      query,
    },
  } as unknown as UseAuthorizedQueryHookOptions<TVariables, TData>;
  const [result] = useAuthorizedQuery<TData, TVariables>(document, queryHookOptions);

  return {
    query,
    result,
    search: updateQuery,
    loadMore: () => {
      throw new Error('Not implemented yet');
    }, // loadMoreFn(result),
  };
}

export default useSearch;
