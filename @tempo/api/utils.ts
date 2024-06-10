import type { ConfirmButtonTransitionState } from '@tempo/ui/components/buttons/ConfirmButton';
import type { AnyVariables } from '@urql/core';
import type { CombinedError, OperationResult } from '@urql/next';
import type {
  MutationState,
  Data,
  AdditionalMutationState,
  PartialMutationProviderOutput,
  MutationFunction,
} from './types';

export function hasErrors(errorList: any[] | null): boolean {
  return !(errorList === undefined || errorList === null || errorList.length === 0);
}

export function getMutationState(
  called: boolean,
  loading: boolean,
  ...errorList: unknown[][]
): ConfirmButtonTransitionState {
  if (loading) return 'loading';
  if (called) {
    return errorList.map(hasErrors).reduce((acc, curr) => acc || curr, false)
      ? 'error'
      : 'success';
  }
  return 'default';
}

export interface TempoMutationResult {
  errors?: unknown[];
}

type InferPromiseResult<T> = T extends Promise<infer V> ? V : never;

export const extractMutationErrors = async <
  TData extends InferPromiseResult<TPromise>,
  TPromise extends Promise<OperationResult<TData>>,
  TErrors extends ReturnType<typeof getMutationErrors>,
>(
  submitPromise: TPromise
): Promise<TErrors> => {
  const result = await submitPromise;

  const e = getMutationErrors(result);

  return e as TErrors;
};

export const getAllErrorMessages = (error: CombinedError) => [
  ...(error.graphQLErrors?.map((err) => err.message) || []),
  ...getNetworkErrors(error),
];

export const hasMutationErrors = (result: OperationResult): boolean => {
  if (!result?.data) return false;
  return Object.values(result.data).some((value: any) => !!value?.errors?.length);
};

export function getMutationErrors<TData>(
  mutationState: Pick<OperationResult<TData>, 'data' | 'error'>
): CombinedError[] {
  if (!mutationState?.data) return [] as CombinedError[];
  return Object.values(mutationState.data).reduce(
    (acc: CombinedError[], mut: any) => [...acc, ...(mut?.errors || [])],
    []
  );
}

export const getNetworkErrors = (error: CombinedError): string[] => {
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

export function getMutationStatus<TData extends Record<string, TempoMutationResult | unknown>>(
  mutationState: Omit<MutationState<TData>, 'status'>
): ConfirmButtonTransitionState {
  const errors = getMutationErrors(mutationState);
  return getMutationState(mutationState.called, mutationState.fetching, errors);
}

export function getMutationProviderData<
  TData extends Data = Data,
  TVariables extends AnyVariables = AnyVariables,
>(
  mutateFn: MutationFunction<TData, TVariables>,
  opts: OperationResult<TData> & AdditionalMutationState
): PartialMutationProviderOutput<TData, TVariables> {
  return {
    mutate: (variables) => mutateFn({ ...variables }),
    opts,
  };
}
