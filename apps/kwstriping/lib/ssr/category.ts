import type { ParsedUrlQuery } from 'querystring';

import { CategoryPathsDocument } from '@tempo/api/generated/graphql';

import { getClient } from '@tempo/api/server';
import type { Path } from '@tempo/utils/regions';
import { CHANNELS, LOCALES } from '@tempo/utils/regions';

export interface CategoryPathArguments extends ParsedUrlQuery {
  channel: string;
  locale: string;
  slug: string;
}

export const categoryPaths = async () => {
  const paths: Path<CategoryPathArguments>[] = [];

  let hasNextPage = true;
  let endCursor = '';

  const client = getClient();

  while (hasNextPage) {
    const response = await client
      .query(
        CategoryPathsDocument,
        {
          after: endCursor,
        },
        { requestPolicy: 'network-only' }
      )
      .toPromise();

    const edges = response.data?.categories?.edges;
    if (!edges) {
      break;
    }
    const responseSlugs: string[] = edges.map((edge) => edge.node.slug);
    for (const channel of CHANNELS) {
      const channelSlug = channel.slug;
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
    }
    hasNextPage = response.data?.categories?.pageInfo.hasNextPage || false;
    endCursor = response.data?.categories?.pageInfo.endCursor || '';
  }

  return paths;
};
