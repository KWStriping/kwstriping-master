import { useSearch } from '@core/urql/hooks';
import { graphql as gql } from '@core/api/gql';
import type {
  SearchProductsQuery,
  SearchProductsQueryVariables,
} from '@core/api/graphql';
import { SearchProductsDocument } from '@core/api/graphql';
import { DEFAULT_INITIAL_SEARCH_DATA } from '@dashboard/oldSrc/config';
import type { UseSearchOptions } from './../../../../packages/urql/src/hooks/useSearch';

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
