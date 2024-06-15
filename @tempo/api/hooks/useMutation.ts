'use client';

import * as m from '@paraglide/messages';
import { useNotifier } from '@tempo/ui/hooks/useNotifier';

import type { AnyVariables, DocumentInput } from '@urql/core';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation as _useMutation } from '@urql/next';
import type {
  UseMutationResponse,
  MutationHookOptions,
  CombinedError,
  OperationResult,
  GraphQLError,
} from '@tempo/api/types';
import { getMutationStatus, getMutationErrors, getAllErrorMessages } from '@tempo/api/utils';

export function useMutation<
  TData extends Record<string, unknown>,
  TVariables extends AnyVariables,
>(
  mutation: DocumentInput<TData, TVariables>,
  {
    onCompleted,
    onError,
    disableErrorHandling,
    displayLoader, // TODO
  }: MutationHookOptions<TData, TVariables> = {}
): UseMutationResponse<TData, TVariables> {
  const notify = useNotifier();
  const [mutationState, mutate] = _useMutation(mutation);
  const { data, error, fetching } = mutationState;
  const extendedMutationState = {
    ...mutationState,
    called: Boolean(fetching || data || error),
    errors: error?.graphQLErrors as Maybe<GraphQLError[]>,
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
      if (!disableErrorHandling) handleNestedMutationErrors({ result: mutationState });
      if (onCompleted) onCompleted(data);
    }
  }, [data, error]);

  return [
    mutate,
    {
      ...extendedMutationState,
      status: getMutationStatus(extendedMutationState),
    },
  ];
}

export function handleNestedMutationErrors<TData, TVars extends AnyVariables = AnyVariables>({
  result,
}: {
  result: Pick<OperationResult<TData, TVars>, 'data' | 'error'>;
}) {
  const mutationErrors = getMutationErrors(result);
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

export function hasError(err: CombinedError, ...errorCodes: string[]): boolean {
  return !!err.graphQLErrors?.some((gqlError) => {
    const errorCode = gqlError.message; // TODO !!! message to code
    return errorCodes.includes(errorCode);
  });
}
