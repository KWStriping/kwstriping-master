import { useTranslation } from '@core/i18n';
import type { TFunction } from '@core/i18n';
import { useNotifier } from '@core/ui/hooks/useNotifier';

import type { AnyVariables } from '@urql/core';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import type { TypedDocumentNode } from 'urql';
import { useMutation as useMutator } from 'urql';
import type {
  UseMutationResponse,
  MutationHookOptions,
  CombinedError,
  OperationResult,
  GraphQLError,
} from '@core/urql/types';
import { getMutationStatus, getMutationErrors, getAllErrorMessages } from '@core/urql/utils';

export function useMutation<
  TData extends Record<string, unknown>,
  TVariables extends AnyVariables = AnyVariables,
>(
  mutation: TypedDocumentNode<TData, TVariables>,
  {
    onCompleted,
    onError,
    disableErrorHandling,
    displayLoader, // TODO
  }: MutationHookOptions<TData, TVariables> = {}
): UseMutationResponse<TData, TVariables> {
  const { t } = useTranslation();
  const notify = useNotifier();
  const [mutationState, mutate] = useMutator(mutation);
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
          notify(t('readOnly', 'Running in read-only mode. Changes not saved.'), {
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
      if (!disableErrorHandling) handleNestedMutationErrors({ result: mutationState, t });
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
  t,
}: {
  result: Pick<OperationResult<TData, TVars>, 'data' | 'error'>;
  t: TFunction;
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
