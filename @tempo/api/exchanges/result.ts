// import * as m from '@paraglide/messages';
import type { Exchange } from '@urql/core';
import { toast } from 'react-toastify';
import { mapExchange } from '@urql/core';
import type { CombinedError } from '../types';
import { isJwtError, isTokenExpired } from '@tempo/api/auth/errors';

const DEBUG = false;

export const resultExchange: Exchange = mapExchange({
  onOperation(operation) {
    if (!DEBUG) return;
    const operationDefinition = operation.query.definitions[0] as any;
    const operationId = `${operationDefinition?.name?.value} ${operationDefinition?.operation}`;
    console.log('Running', operationId, {
      variables: operation.variables,
      url: operation.context.url,
      // operation,
    });
  },
  onResult(result) {
    if (!DEBUG) return;
    const operationDefinition = result.operation.query.definitions[0] as any;
    const operationId = `${operationDefinition?.name?.value} ${operationDefinition?.operation}`;
    if (result.error) {
      console.log(`Encountered error while running ${operationId}:`, result.error);
    } else {
      // console.log(`${operationId} result:`, result.data);
    }
  },
  onError: (error: CombinedError) => {
    // NOTE: Primary error handling is done in the `useMutation` hook:
    // packages/urql/hooks/useMutation.ts
    const isAuthError = error.graphQLErrors.some(isJwtError);
    // We SHOULD only get an auth error here if the auth exchange attempted to refresh auth
    // but got an auth error again for the second time...
    if (isAuthError) {
      console.error('Auth error:', isAuthError);
      if (error.graphQLErrors.some(isTokenExpired)) {
        console.error('Session expired.');
        // toast(i18n.(m.auth_sessionExpired() ?? 'Session expired.'), {
        //   type: 'error',
        //   toastId: 'sessionExpired',
        // });
        // signOut();
      }
    } else {
      const errors = error.graphQLErrors;
      for (const error of errors) {
        // In debug mode, the error is logged in the onResult hook instead.
        if (!DEBUG) console.error(error);
        // Display the error to the user.
        toast(error.message, {
          type: 'error',
          toastId: error.message,
        });
      }
    }
  },
});
