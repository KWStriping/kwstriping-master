import type { UseSearchOptions } from '@core/urql/hooks/useSearch';
import { useSearch } from '@core/urql/hooks/useSearch';
import { graphql as gql } from '@core/api/gql';
import type { SearchAvailableInGridAttributesQueryVariables } from '@core/api/graphql';
import { SearchAvailableInGridAttributesDocument } from '@core/api/graphql';

export const availableInGridAttributes = gql(`
  query SearchAvailableInGridAttributes($first: Int!, $after: String, $query: String!) {
    availableInGrid: attributes(
      first: $first
      after: $after
      filters: { isVariantOnly: false, type: PRODUCT_TYPE, search: $query }
    ) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
      totalCount
    }
  }
`);

export default function useAvailableInGridAttributesSearch(
  options: UseSearchOptions<SearchAvailableInGridAttributesQueryVariables>
) {
  return useSearch(SearchAvailableInGridAttributesDocument, {
    ...options,
    // onResult: (result) => {
    //   if (result.data?.availableInGrid.pageInfo.hasNextPage) {
    //     result.loadMore(
    //       (prev, next) => {
    //         if (
    //           prev.availableInGrid.pageInfo.endCursor === next.availableInGrid.pageInfo.endCursor
    //         ) {
    //           return prev;
    //         }

    //         return {
    //           ...prev,
    //           availableInGrid: {
    //             ...prev.availableInGrid,
    //             edges: [...prev.availableInGrid.edges, ...next.availableInGrid.edges],
    //             pageInfo: next.availableInGrid.pageInfo,
    //           },
    //         } as SearchAvailableInGridAttributesQuery;
    //       },
    //       {
    //         ...result.variables,
    //         after: result.data?.availableInGrid?.pageInfo?.endCursor,
    //       }
    //     );
    //   }
    // },
  });
}
