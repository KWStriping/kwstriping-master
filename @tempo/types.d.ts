/// <reference types="@types/react" />
/// <reference types="google.maps" />

import type { GraphQLError as BaseGraphQLError } from '@urql/core';

declare module '@urql/core' {
  export interface OperationContext {
    dropAuth?: boolean;
  }
  export interface GraphQLError extends BaseGraphQLError {
    extensions: {
      // TODO
      code: string;
    };
  }
  export interface CombinedError {
    graphQLErrors: GraphQLError[];
  }
}
