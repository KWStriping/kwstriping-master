import type { ParsedUrlQuery } from 'querystring';

import { CollectionPathsDocument } from '@tempo/api/generated/graphql';

import { getClient } from '@tempo/api/server';
import type { Path } from '@tempo/utils/regions';
import { CHANNELS, LOCALES } from '@tempo/utils/regions';

export interface CollectionPathArguments extends ParsedUrlQuery {
  channel: string;
  locale: string;
  slug: string;
}

export const collectionPaths = async () => {
  const paths: Path<CollectionPathArguments>[] = [];

  const client = getClient();

  for (const channel of CHANNELS) {
    const channelSlug = channel.slug;
    let hasNextPage = true;
    let endCursor = '';

    while (hasNextPage) {
      const response = await client
        .query(
          CollectionPathsDocument,
          {
            channel: channelSlug,
            after: endCursor,
          },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      const edges = response.data?.collections?.edges;
      if (!edges) {
        break;
      }
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

      hasNextPage = response.data?.collections?.pageInfo.hasNextPage || false;
      endCursor = response.data?.collections?.pageInfo.endCursor || '';
    }
  }

  return paths;
};
