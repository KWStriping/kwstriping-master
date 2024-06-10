import type { ConfirmButtonTransitionState } from '@core/ui/components/buttons/ConfirmButton';
import type { OperationResult } from '@urql/core';
import type { NextApiRequest } from 'next';
import type {
  AnyVariables,
  UseMutationResponse as BaseUseMutatorResponse,
  CombinedError as BaseCombinedError,
} from 'urql';
export type { IntrospectionData } from './client/types';
export type Data = Record<string, unknown>;
export type { OperationResult };

export type GraphQLError = Omit<BaseCombinedError['graphQLErrors'][0], 'extensions'> & {
  extensions: {
    code: string;
    // TODO
    // exception: {
    //   code: string;
    // };
  };
};

export type CombinedError = Omit<BaseCombinedError, 'graphQLErrors'> & {
  graphQLErrors: GraphQLError[];
};

export type MutationFunction<
  TData extends Data,
  TVariables extends AnyVariables = AnyVariables,
> = BaseUseMutatorResponse<TData, TVariables>[1];

export type MutatorState<
  TData,
  TVariables extends AnyVariables = AnyVariables,
> = BaseUseMutatorResponse<TData, TVariables>[0];

export interface AdditionalMutationState {
  called: boolean;
  status: ConfirmButtonTransitionState;
  errors?: Maybe<GraphQLError[]>;
}

export type MutationState<TData, TVariables extends AnyVariables = AnyVariables> = MutatorState<
  TData,
  TVariables
> &
  AdditionalMutationState;

export type UseMutationResponse<
  TData extends Data,
  TVariables extends AnyVariables = AnyVariables,
> = [MutationFunction<TData, TVariables>, MutationState<TData, TVariables>];

export interface MutationHookOptions<TData, TVariables extends AnyVariables = AnyVariables> {
  disableErrorHandling?: boolean;
  displayLoader?: boolean;
  onCompleted?: (data: TData) => void;
  onError?: (err: Error) => void;
}

export interface PartialMutationProviderOutput<
  TData extends Record<string, any> = Record<string, any>,
  TVariables extends AnyVariables = AnyVariables,
> {
  opts: OperationResult<TData> & AdditionalMutationState;
  mutate: (variables: TVariables) => Promise<OperationResult<TData>>;
}

export type RequestContext = {
  req?: any;
  staticRendering?: boolean;
};

export type ServerSideRequestContext = {
  req: NextApiRequest;
  staticRendering?: boolean;
};
