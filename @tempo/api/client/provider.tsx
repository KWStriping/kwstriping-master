'use client';

import type { PropsWithChildren } from 'react';
import { useMemo } from 'react';
import { UrqlProvider as BaseUrqlProvider, ssrExchange, createClient } from '@urql/next';
import { devtoolsExchange } from '@urql/devtools';
import { authExchange, cacheExchange, resultExchange, fetchExchange } from '@tempo/api/exchanges';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

const STATIC_RENDERING = false; // TODO

export default function UrqlProvider({ children }: PropsWithChildren) {
  const [client, ssr] = useMemo(() => {
    const ssr = ssrExchange({
      isClient: typeof window !== 'undefined',
    });
    const client = createClient({
      url: API_URL as string,
      exchanges: [
        devtoolsExchange,
        cacheExchange(),
        ssr,
        resultExchange,
        ...(STATIC_RENDERING ? [] : [authExchange()]),
        fetchExchange,
      ],
      suspense: true,
    });

    return [client, ssr];
  }, []);

  return (
    <BaseUrqlProvider client={client} ssr={ssr}>
      {children}
    </BaseUrqlProvider>
  );
}
