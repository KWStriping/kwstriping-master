import type { Exchange } from '@urql/core';
import { devtoolsExchange } from '@urql/devtools';
import type { SSRExchange } from 'next-urql';
import type { GetServerSessionArgs } from '@core/auth/server';
import { authExchange, cacheExchange, resultExchange, fetchExchange } from '@core/urql/exchanges';
import type { IntrospectionData } from '@core/urql/types';

const isServerSide = typeof window === 'undefined';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) throw new Error('NEXT_PUBLIC_API_URL is not defined');

export interface ClientConfigArgs {
  ssrExchange: SSRExchange;
  ctx?: Maybe<GetServerSessionArgs>;
  schema?: Maybe<IntrospectionData>;
  serverSide?: boolean;
  staticRendering?: boolean;
}

export const getExchanges = ({
  ssrExchange,
  schema = undefined,
  staticRendering = false,
}: ClientConfigArgs): Exchange[] => {
  return [
    devtoolsExchange,
    cacheExchange(schema),
    ssrExchange,
    resultExchange,
    ...(staticRendering ? [] : [authExchange()]),
    fetchExchange,
  ];
};

export const getClientConfig = ({ ssrExchange, schema = undefined }: ClientConfigArgs) => {
  // isServerSide && console.log('getClientConfig()', { session, isServerSide });
  // console.log('API_URL:', API_URL);
  return {
    url: API_URL,
    exchanges: getExchanges({ ssrExchange, ...(schema ? { schema } : {}) }),
  };
};
