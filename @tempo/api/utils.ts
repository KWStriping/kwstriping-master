import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { OperationVariables, ApolloError, SingleExecutionResult } from '@apollo/client';
import type { GraphQLErrors } from '@apollo/client/errors';
import type {
  Data,
  AdditionalMutationState,
  PartialMutationProviderOutput,
  MutationFunction,
  MutationState,
} from './types';

export function hasErrors(errorList: any[] | null): boolean {
  return !(errorList === undefined || errorList === null || errorList.length === 0);
}

export function getMutationState({
  called,
  loading,
  errors,
}: {
  called: boolean;
  loading: boolean;
  errors?: GraphQLErrors;
}): ConfirmButtonTransitionState {
  if (loading) return 'loading';
  if (called) {
    return errors?.length ? 'error' : 'success';
  }
  return 'default';
}

export interface TempoMutationResult {
  errors?: unknown[];
}

export const getAllErrorMessages = (error: ApolloError) => [
  ...(error.graphQLErrors?.map((err) => err.message) || []),
  ...getNetworkErrors(error),
];

export const hasMutationErrors = (result: MutationState<any, any>): boolean => {
  if (!result?.data) return false;
  return Object.values(result.data).some((value: any) => !!value?.errors?.length);
};

export function getMutationErrors(error: ApolloError): GraphQLErrors {
  if (!error) return [] as GraphQLErrors;
  return error.graphQLErrors;
}

export const getNetworkErrors = (error: ApolloError): string[] => {
  const networkErrors = error.networkError;

  if (networkErrors) {
    // Apparently network errors can be an object or an array
    // if (Array.isArray(networkErrors.result)) {
    //   console.log('>>>> networkErrors.result', networkErrors.result);
    //   networkErrors.result.forEach((result) => {
    //     if (result.errors) {
    //       return result.errors.map(({ message }) => message);
    //     }
    //   });
    // }

    return [networkErrors.message];
  }

  return [];
};

export function getMutationProviderData<
  TData extends Data,
  TVariables extends OperationVariables,
>(
  mutateFn: MutationFunction<TData, TVariables>,
  opts: MutationState<TData, any> & AdditionalMutationState
): PartialMutationProviderOutput<TData, TVariables> {
  return {
    mutate: (variables) => mutateFn({ ...variables }) as SingleExecutionResult<TData, TVariables>, // TODO
    opts,
  };
}
