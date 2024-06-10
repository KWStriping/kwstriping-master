import type { RegisterMutation, RegisterMutationVariables } from '@core/api';
import { RegisterDocument } from '@core/api';
import { useMutation } from '@core/urql/hooks/useMutation';
import { useCallback } from 'react';
import type { OperationResult } from '@urql/core';

export const useRegister = (): [
  (options: RegisterMutationVariables) => Promise<OperationResult<RegisterMutation> | undefined>,
  { fetching: boolean },
] => {
  const [mutate, { fetching, error }] = useMutation(RegisterDocument);
  const register = useCallback(
    (options: RegisterMutationVariables) => {
      // setTokens({ accessToken: null, csrfToken: null });
      return mutate({ ...options }).then((result) => {
        // const data = result.data?.registerAccount;
        // TODO: autologin
        // if (tokens?.accessToken && tokens?.csrfToken) {
        //   setTokens({
        //     accessToken: tokens.token,
        //     csrfToken: tokens.csrfToken,
        //   });
        // }
        return result;
      });
    },
    [mutate]
  );
  return [register, { fetching }];
};
