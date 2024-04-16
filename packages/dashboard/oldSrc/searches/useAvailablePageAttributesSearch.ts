import makeSearch from '@core/urql/hooks/useSearch';
import { graphql as gql } from '@core/api/gql';
import type {
  SearchAvailablePageAttributesQuery,
  SearchAvailablePageAttributesQueryVariables,
} from '@core/api/graphql';
import { SearchAvailablePageAttributesDocument } from '@core/api/graphql';

export const searchPageAttributes = gql(`
  query SearchAvailablePageAttributes(
    $id: ID!
    $after: String
    $first: Int!
    $query: String!
  ) {
    pageKlass(id: $id) {
      id
      availableAttributes(after: $after, first: $first, filters: { search: $query }) {
        edges {
          node {
            ...AvailableAttribute
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`);

// export default makeSearch<
//   SearchAvailablePageAttributesQuery,
//   SearchAvailablePageAttributesQueryVariables
// >(SearchAvailablePageAttributesDocument, (result) =>
//   result.loadMore(
//     (prev, next) => {
//       if (
//         prev.pageKlasses.availableAttributes?.pageInfo.endCursor ===
//         next.pageKlasses.availableAttributes?.pageInfo.endCursor
//       ) {
//         return prev;
//       }

//       return {
//         ...prev,
//         pageKlasses: {
//           ...prev.pageKlasses,
//           availableAttributes: {
//             ...prev.pageKlasses.availableAttributes,
//             edges: [
//               ...prev.pageKlasses.availableAttributes.edges,
//               ...next.pageKlasses.availableAttributes.edges,
//             ],
//             pageInfo: next.pageKlasses.availableAttributes?.pageInfo,
//           },
//         },
//       };
//     },
//     {
//       after: result.data?.pageKlasses?.availableAttributes?.pageInfo.endCursor,
//     }
//   )
// );
