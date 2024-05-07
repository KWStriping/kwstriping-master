import schema from '@core/api/graphql.schema.json';

import { API_URL } from '@core/ui/providers/ShopSettingsProvider';
import type { SSRData, SSRExchange } from 'next-urql';
import { initUrqlClient } from 'next-urql';

import { ssrExchange } from 'urql';
import isObject from 'lodash-es/isObject';
import { getExchanges } from './config';
import type { IntrospectionData, Client } from './types';

export const initializeSsrCache: () => SSRExchange = () => ssrExchange({ isClient: false });

export const initializeStaticRenderingClient = (ssrCache: SSRExchange): Client => {
  const client = initUrqlClient(
    {
      url: API_URL,
      exchanges: getExchanges({
        staticRendering: true,
        ssrExchange: ssrCache,
        // TODO: validate schema?
        ...(schema ? { schema: schema as IntrospectionData } : {}),
      }),
    },
    false
  );
  if (!client) throw new Error('Could not initialize urql client.');
  return client;
};

export const getStaticRenderingClientAndCache = (): [Client, SSRExchange] => {
  const ssrCache = initializeSsrCache();
  const client = initializeStaticRenderingClient(ssrCache);
  return [client, ssrCache];
};

type Props = Record<string, unknown>;

interface PropsFromUrql {
  urqlState: SSRData;
}

function makeSafe<TProps extends Props>(props: TProps): TProps {
  return Object.fromEntries(
    Object.entries(props).map(([key, value]) =>
      typeof value === 'undefined'
        ? [key, null]
        : isObject(value)
          ? [key, makeSafe(value as any)]
          : [key, value]
    )
  ) as TProps;
}

export function generateStaticRenderingProps(ssrCache: SSRExchange): PropsFromUrql;
export function generateStaticRenderingProps<TProps extends Props>(
  ssrCache: SSRExchange,
  props: TProps
): TProps & PropsFromUrql;
export function generateStaticRenderingProps<TProps extends Props>(
  ssrCache: SSRExchange,
  props: TProps | undefined = undefined
) {
  const safeProps = makeSafe(props ?? ({} as TProps));
  // https://formidable.com/open-source/urql/docs/advanced/server-side-rendering/#ssr-with-getstaticprops-or-getserversideprops
  const urqlState = makeSafe(ssrCache.extractData());
  console.log(urqlState);
  return {
    ...safeProps,
    urqlState,
  };
}
