import { useSearch } from '@tempo/api/hooks';
import { gql } from '@tempo/api';

import { SearchOrderVariantDocument } from '@tempo/api/generated/graphql';

export const searchOrderVariant = gql(`
  query SearchOrderVariant(
    $channel: String!
    $first: Int!
    $query: String!
    $after: String
    $address: AddressUpdateInput
    $isPublished: Boolean
    $stockAvailability: StockAvailability
  ) {
    search: products(
      first: $first
      after: $after
      filters: {
        search: $query
        isPublished: $isPublished
        stockAvailability: $stockAvailability
      }
      channel: $channel
    ) {
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
            ...on ConcreteProduct {
              sku
            }
            pricing(address: $address) {
              priceUndiscounted {
                gross {
                  ...Money
                }
              }
              price {
                gross {
                  ...Money
                }
              }
              onSale
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`);

export function useOrderVariantSearch(options: any) {
  return useSearch(SearchOrderVariantDocument, options);
}
