import { graphql as gql } from '@core/api/gql';

export const updateMetadata = gql(`
  mutation UpdateMetadata($id: ID!, $input: [MetadataInput!]!, $keysToDelete: [String!]!) {
    updateMetadata(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        ...Metadata
        ... on Node {
          id
        }
      }
    }
    deleteMetadata(id: $id, keys: $keysToDelete) {
      errors {
        ...Error
      }
      result {
        ...Metadata
        ... on Node {
          id
        }
      }
    }
  }
`);

// export const updatePrivateMetadata = gql(`
//   mutation UpdatePrivateMetadata(
//     $id: ID!
//     $input: [MetadataInput!]!
//     $keysToDelete: [String!]!
//   ) {
//     updatePrivateMetadata(id: $id, data: $input) {
//       errors {
//         ...Error
//       }
//       result {
//         ...Metadata
//         ... on Node {
//           id
//         }
//       }
//     }
//     deletePrivateMetadata(id: $id, keys: $keysToDelete) {
//       errors {
//         ...Error
//       }
//       result {
//         ...Metadata
//         ... on Node {
//           id
//         }
//       }
//     }
//   }
// `);
