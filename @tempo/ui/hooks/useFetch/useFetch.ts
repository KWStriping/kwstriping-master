import { useCallback, useEffect, useState } from 'react';
import join from 'url-join';
import { useSession } from '@tempo/api/auth/react/hooks';
import type { UseFetchOptionalProps, UseFetchResult } from './types';

export const urlJoinTrailingSlash = (...parts: string[]): string => join(...parts, '/');

type OperationVariables = Record<string, any>;

export const useFetch = <TData, TArgs extends OperationVariables, TError = any>(
  endpoint: string | URL,
  options: RequestInit & UseFetchOptionalProps<TArgs, TData> = {}
): UseFetchResult<TError, TData, TArgs> => {
  const { data: session } = useSession();
  const { skip = false } = options || {};
  const { args = {}, ...requestOptions } = options;
  const [fetching, setFetching] = useState(false);
  const [result, setResult] = useState<TData | null>(null);
  const [error, setError] = useState<TError | null>(null);

  const fetchData = useCallback(async (body?: TArgs): Promise<TData | null> => {
    setFetching(true);
    const headers = {
      ...(session ? { Authorization: `Bearer ${session?.accessToken}` } : {}),
    };
    console.log('useFetch.fetchData', { headers });
    try {
      const response = await fetch(endpoint, {
        headers,
        ...requestOptions,
        body: JSON.stringify({ ...args, ...body }),
      });
      const result = (await response.json()) as TData;
      setResult(result);
      return result;
    } catch (e) {
      setError(e as TError);
      return null;
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => {
    if (skip) return;
    console.log('Fetching data', endpoint, args);
    void fetchData();
  }, [skip, fetchData]);

  return [{ data: result, fetching, error }, fetchData];
};
