import { GraphQLError as BaseGraphQLError } from '@0no-co/graphql.web';
// import {ApolloError as BaseApolloError} from '@apollo/client';

declare module '@0no-co/graphql.web' {
  interface Extensions {
    code: string;
  }
  declare class GraphQLError extends BaseGraphQLError {
    extensions: Extensions;
  }
}

// declare module '@urql/core' {
//   class ApolloError extends BaseApolloError {
//     graphQLErrors: GraphQLError$1[];
//   }
// }
