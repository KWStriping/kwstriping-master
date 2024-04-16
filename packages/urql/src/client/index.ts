import { initUrqlClient } from 'next-urql';
import type { SSRExchange } from 'next-urql';
import { assert } from 'tsafe/assert';
import type { Client } from 'urql';
import { ssrExchange as _ssrExchange } from 'urql';
import { getClientConfig } from './config';
import type { RequestContext } from '@core/urql/types';

export * from './hoc';
export * from './types';
export * from './static';

export const getServerSideClient = (ctx?: Maybe<RequestContext>): Client => {
  const ssrExchange = _ssrExchange({ isClient: false });
  const client = initUrqlClient(getClientConfig({ ssrExchange, ctx }), false);
  assert(!!client);
  return client;
};

export const getServerSideClientAndSsrExchange = (
  ctx?: Maybe<RequestContext>
): [client: Client, ssrExchange: SSRExchange] => {
  const ssrExchange = _ssrExchange({ isClient: false });
  const client = initUrqlClient(getClientConfig({ ssrExchange, ctx }), false);
  assert(!!client);
  return [client, ssrExchange];
};
