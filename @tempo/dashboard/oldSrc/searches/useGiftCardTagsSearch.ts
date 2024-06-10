import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';

import { SearchGiftCardTagsDocument } from '@tempo/api/generated/graphql';

export const searchGiftCardTags = gql(`
  query SearchGiftCardTags(
    $query: String!
    $first: Int!
    $after: String
    $last: Int
    $before: String
  ) {
    search: giftCardTags(
      filters: { search: $query }
      first: $first
      after: $after
      last: $last
      before: $before
    ) {
      totalCount
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function useGiftCardTagsSearch(options: any) {
  return useSearch(SearchGiftCardTagsDocument, options);
}
