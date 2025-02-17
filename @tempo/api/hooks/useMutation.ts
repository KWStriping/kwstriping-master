'use client';

import * as m from '@paraglide/messages';
import { useNotifier } from '@tempo/ui/hooks/useNotifier';

import type {
  ApolloError,
  MutationFunctionOptions,
  OperationVariables,
  TypedDocumentNode,
} from '@apollo/client';
import { useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation as _useMutation } from '@apollo/client';
import type { UseMutationResponse, MutationHookOptions } from '@tempo/api/types';
import { getMutationState, getMutationErrors, getAllErrorMessages } from '@tempo/api/utils';

export function useMutation<
  TData extends Record<string, unknown>,
  TVariables extends OperationVariables,
>(
  mutation: TypedDocumentNode<TData, TVariables>,
  {
    onCompleted,
    onError,
    disableErrorHandling,
    displayLoader, // TODO
  }: MutationHookOptions<TData> = {}
): UseMutationResponse<TData, TVariables> {
  const notify = useNotifier();
  const [_mutate, mutationState] = _useMutation(mutation);

  const mutate = useCallback(
    async (
      variables: TVariables,
      options?: Omit<MutationFunctionOptions<TData, TVariables>, 'variables'>
    ) => {
      return _mutate({ variables, ...options });
    },
    [_mutate]
  );

  const { data, error, loading: fetching } = mutationState;
  const extendedMutationState = {
    ...mutationState,
    called: Boolean(fetching || data || error),
    errors: error?.graphQLErrors,
  };
  useEffect(() => {
    if (error) {
      if (onError) onError(error);
      if (disableErrorHandling) return;
      if (error.graphQLErrors) {
        if (hasError(error, GqlErrors.ReadOnlyException)) {
          notify(m.readOnly(), {
            type: 'error',
          });
        } else if (!hasError(error, GqlErrors.LimitReachedException)) {
          error.graphQLErrors.forEach((gqlErr) => notify(gqlErr.message, { type: 'error' }));
        }
      } else {
        getAllErrorMessages(error).forEach((message) => notify(message, { type: 'error' }));
      }
    } else {
      if (!data) return;
      if (!disableErrorHandling && error) handleNestedMutationErrors(error);
      if (onCompleted) onCompleted(data);
    }
  }, [data, error]);

  return [
    mutate,
    {
      ...extendedMutationState,
      status: getMutationState(extendedMutationState),
    },
  ];
}

export function handleNestedMutationErrors<TData, TVars extends OperationVariables>(
  error: ApolloError
) {
  const mutationErrors = getMutationErrors(error);
  if (mutationErrors?.length) {
    mutationErrors.forEach((error) => {
      toast(error.message, {
        type: 'error',
      });
    });
  }
}

export enum GqlErrors {
  LimitReachedException = 'LimitReachedException',
  ReadOnlyException = 'ReadOnlyException',
}

export function hasError(err: ApolloError, ...errorCodes: string[]): boolean {
  return !!err.graphQLErrors?.some((gqlError) => {
    const errorCode = gqlError.message; // TODO !!! message to code
    return errorCodes.includes(errorCode);
  });
}
