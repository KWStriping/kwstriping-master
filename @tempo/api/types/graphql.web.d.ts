import { GraphQLError as BaseGraphQLError } from '@0no-co/graphql.web';
// import {CombinedError as BaseCombinedError} from '@urql/core';

declare module '@0no-co/graphql.web' {
  interface Extensions {
    code: string;
  }
  declare class GraphQLError extends BaseGraphQLError {
    extensions: Extensions;
  }
}

// declare module '@urql/core' {
//   class CombinedError extends BaseCombinedError {
//     graphQLErrors: GraphQLError$1[];
//   }
// }
