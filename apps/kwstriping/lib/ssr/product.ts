import type { ParsedUrlQuery } from 'querystring';

import { ProductPathsDocument } from '@tempo/api/generated/graphql';

import { getClient } from '@tempo/api/client';
import type { Path } from '@tempo/utils/regions';
import { CHANNELS, LOCALES } from '@tempo/utils/regions';

export interface ProductPathArguments extends ParsedUrlQuery {
  channel: string;
  locale: string;
  slug: string;
}

export const productPaths = async () => {
  const paths: Path<ProductPathArguments>[] = [];
  const client = getClient();
  for (const channel of CHANNELS) {
    const channelSlug = channel.slug;
    let hasNextPage = true;
    let endCursor = '';

    while (hasNextPage) {
      const response = await client.query({
        query: ProductPathsDocument,
        variables: {
          channel: channelSlug,
          after: endCursor,
        },
        fetchPolicy: 'network-only',
      });

      const edges = response.data?.products?.edges;
      if (!edges) break;
      const responseSlugs: string[] = edges.map((edge) => edge.node.slug);

      for (const locale of LOCALES) {
        responseSlugs.forEach((slug) => {
          paths.push({
            params: {
              channel: channelSlug,
              locale: locale.slug,
              slug,
            },
          });
        });
      }

      hasNextPage = response.data?.products?.pageInfo.hasNextPage || false;
      endCursor = response.data?.products?.pageInfo.endCursor || '';
    }
  }

  return paths;
};
