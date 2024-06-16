import type { GraphQLError } from '@0no-co/graphql.web';
import { CombinedError as BaseCombinedError } from '@urql/core';

declare module '@urql/core' {
  declare class CombinedError extends BaseCombinedError {
    graphQLErrors: GraphQLError[];
  }
}
