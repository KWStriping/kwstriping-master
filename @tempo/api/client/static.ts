import type { SSRData, SSRExchange } from '@urql/next';

import isObject from 'lodash-es/isObject';

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
