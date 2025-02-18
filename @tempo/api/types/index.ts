import type { NextApiRequest } from 'next';
import type {
  ApolloError as BaseApolloError,
  MutationFunctionOptions,
  MutationTuple,
  OperationVariables,
  SingleExecutionResult,
} from '@apollo/client';
import type { GraphQLFormattedError } from 'graphql';
import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';

export type GraphQLErrors = ReadonlyArray<GraphQLFormattedError>;

export type Data = Record<string, unknown>;

export interface ErrorExtensions {
  [key: string]: unknown;
  code: string;
}

export interface GraphQLError extends Omit<BaseApolloError['graphQLErrors'][0], 'extensions'> {
  extensions: ErrorExtensions;
}

export interface ApolloError extends BaseApolloError {
  graphQLErrors: GraphQLError[];
}

export type MutationResponse<
  TData extends Data,
  TVariables extends OperationVariables,
> = ReturnType<MutationTuple<TData, TVariables>[0]>;

export type MutationFunction<TData extends Data, TVariables extends OperationVariables> = (
  variables: TVariables,
  options?: Omit<MutationFunctionOptions<TData, TVariables>, 'variables'>
) => MutationResponse<TData, TVariables>;

export type BaseMutationState<
  TData extends Data,
  TVariables extends OperationVariables,
> = MutationTuple<TData, TVariables>[1];

export interface AdditionalMutationState {
  called: boolean;
  status: ConfirmButtonTransitionState;
  errors?: Maybe<GraphQLErrors>;
}

export type MutationState<
  TData extends Data,
  TVariables extends OperationVariables,
> = BaseMutationState<TData, TVariables> & AdditionalMutationState;

export type UseMutationResponse<TData extends Data, TVariables extends OperationVariables> = [
  MutationFunction<TData, TVariables>,
  MutationState<TData, TVariables>,
];

export interface MutationHookOptions<TData> {
  disableErrorHandling?: boolean;
  displayLoader?: boolean;
  onCompleted?: (data: TData) => void;
  onError?: (err: Error) => void;
}

export interface PartialMutationProviderOutput<
  TData extends Data,
  TVariables extends OperationVariables,
> {
  opts: MutationState<TData, TVariables> & AdditionalMutationState;
  mutate: (variables: TVariables) => SingleExecutionResult<TData, TVariables>;
}

export type RequestContext = {
  req?: any;
  staticRendering?: boolean;
};

export type ServerSideRequestContext = {
  req: NextApiRequest;
  staticRendering?: boolean;
};
