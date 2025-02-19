import type { ParsedUrlQuery } from 'querystring';

import { PagePathsDocument } from '@tempo/api/generated/graphql';

import { getClient } from '@tempo/api/server';
import type { Path } from '@tempo/utils/regions';
import { CHANNELS, LOCALES } from '@tempo/utils/regions';

export interface PagePathArguments extends ParsedUrlQuery {
  channel: string;
  locale: string;
  slug: string;
}

export const pagePaths = async () => {
  const paths: Path<PagePathArguments>[] = [];

  let hasNextPage = true;
  let endCursor = '';

  const client = getClient();

  while (hasNextPage) {
    const response = await client.query({
      query: PagePathsDocument,
      variables: { after: endCursor },
      fetchPolicy: 'network-only',
    });

    const edges = response.data?.pages?.edges;
    if (!edges) {
      break;
    }
    const responseSlugs: string[] = edges.map((edge) => edge.node.slug);
    for (const locale of LOCALES) {
      for (const channel of CHANNELS) {
        responseSlugs.forEach((slug) => {
          paths.push({
            params: {
              channel: channel.slug,
              locale: locale.slug,
              slug,
            },
          });
        });
      }
    }

    hasNextPage = response.data?.pages?.pageInfo.hasNextPage || false;
    endCursor = response.data?.pages?.pageInfo.endCursor || '';
  }

  return paths;
};
