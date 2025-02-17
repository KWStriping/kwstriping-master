import { gql } from '@tempo/api/gql';

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
