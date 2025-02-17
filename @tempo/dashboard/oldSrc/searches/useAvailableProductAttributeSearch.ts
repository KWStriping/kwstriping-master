import { gql } from '@tempo/api/gql';

export const searchProductAttributes = gql(`
  query SearchAvailableProductAttributes(
    $id: ID!
    $after: String
    $first: Int!
    $query: String!
  ) {
    productKlass(id: $id) {
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
//   SearchAvailableProductAttributesQuery,
//   SearchAvailableProductAttributesQueryVariables
// >(SearchAvailableProductAttributesDocument, (result) =>
//   result.loadMore(
//     (prev, next) => {
//       if (
//         prev.productKlass.availableAttributes?.pageInfo.endCursor ===
//         next.productKlass.availableAttributes?.pageInfo.endCursor
//       ) {
//         return prev;
//       }

//       return {
//         ...prev,
//         productKlass: {
//           ...prev.productKlass,
//           availableAttributes: {
//             ...prev.productKlass.availableAttributes,
//             edges: [
//               ...prev.productKlass.availableAttributes.edges,
//               ...next.productKlass.availableAttributes.edges,
//             ],
//             pageInfo: next.productKlass.availableAttributes?.pageInfo,
//           },
//         },
//       };
//     },
//     {
//       after: result.data?.productKlass?.availableAttributes?.pageInfo.endCursor,
//     }
//   )
// );
