import { useCallback } from 'react';
import type { RegisterMutation, RegisterMutationVariables } from '@tempo/api/generated/graphql';
import { RegisterDocument } from '@tempo/api/generated/graphql';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { MutationState } from '@tempo/api/types';

export const useRegister = (): [
  (variables: RegisterMutationVariables) => Promise<any>,
  MutationState<RegisterMutation, RegisterMutationVariables>,
] => {
  const [mutate, mutationState] = useMutation(RegisterDocument);
  const register = useCallback(
    async (variables: RegisterMutationVariables) => {
      // setTokens({ accessToken: null, csrfToken: null });
      return mutate({ ...variables }).then((result) => {
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
  return [register, mutationState];
};
