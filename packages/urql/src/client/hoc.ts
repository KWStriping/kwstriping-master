import { withUrqlClient as _withUrqlClient } from 'next-urql';
import type { ClientConfigArgs } from './config';
import { getClientConfig } from './config';

type WithUrqlClient = (
  options?: Omit<ClientConfigArgs, 'ssrExchange'>
) => ReturnType<typeof _withUrqlClient>;

const isServerSide = typeof window === 'undefined';

export const withUrqlClient: WithUrqlClient = ({ schema = undefined } = {}) => {
  return _withUrqlClient((ssrExchange) => ({
    ...getClientConfig({ ssrExchange, schema }),
    preferGetMethod: false,
    suspense: false,
  }));
};
