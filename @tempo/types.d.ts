/// <reference types="google.maps" />
/// <reference types="@types/react" />

import type { GraphQLError as BaseGraphQLError } from '@urql/core';

declare module '@urql/core' {
  export interface OperationContext {
    dropAuth?: boolean;
  }
  export interface GraphQLError extends BaseGraphQLError {
    extensions: {
      code: string;
      // TODO
      // exception: {
      //   code: string;
      // };
    };
  }
  export interface CombinedError {
    graphQLErrors: GraphQLError[];
  }
}
