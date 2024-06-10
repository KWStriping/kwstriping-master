import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api/gql';
import type {
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from '@tempo/api/generated/graphql';
import { SearchProductsDocument } from '@tempo/api/generated/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@tempo/dashboard/oldSrc/config';
import type { UseSearchOptions } from './../../../../@tempo/urql/hooks/useSearch';

export const searchProducts = gql(`
  query SearchProducts($after: String, $first: Int!, $query: String!) {
    search: products(after: $after, first: $first, filters: { search: $query }) {
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
          variants {
            id
            name
            ... on ConcreteProduct {
              sku
            }
            channelListings {
              id
              channel {
                id
                isActive
                name
                currencyCode
              }
              price {
                amount
                currency
              }
            }
          }
          collections {
            id
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export default function useProductSearch(
  options: UseSearchOptions<SearchProductsQueryVariables> = {}
) {
  return useSearch<SearchProductsQuery, SearchProductsQueryVariables>(SearchProductsDocument, {
    ...options,
    variables: { ...DEFAULT_INITIAL_SEARCH_DATA, ...(options.variables ?? {}) },
  });
}
