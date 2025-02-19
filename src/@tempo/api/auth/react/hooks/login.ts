'use client';

import type { ApolloError } from '@apollo/client';
import { useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { assert } from 'tsafe/assert';
import { useMutation } from '@tempo/api/hooks/useMutation';
import type { LoginMutationVariables } from '@tempo/api/generated/graphql';
import { LoginDocument } from '@tempo/api/generated/graphql';
import { signIn } from '@tempo/api/auth/react';

const USE_SERVER_SIDE_AUTH = false;

export const useLogin = (): [
  (variables: LoginMutationVariables) => Promise<any>, // TODO
  { loading: boolean; error: ApolloError | undefined },
] => {
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';

  assert(!Array.isArray(next));

  const [mutate, { data, loading: fetching, error }] = useMutation(LoginDocument);
  const [_loading, setLoading] = useState(false);
  const loading = _loading || fetching;

  const login = useCallback(
    async (variables: LoginMutationVariables) => {
      const valid = true;
      if (!valid) return;
      setLoading(true);
      if (USE_SERVER_SIDE_AUTH) {
        console.log('Logging in with server-side auth...');
        await signIn('credentials', {
          email: variables.email,
          password: variables.password,
          redirect: false,
        });
      } else {
        console.log('Logging in with client-side auth...');
        const { data, errors } = await mutate(variables); // TODO, { dropAuth: true });
        if (data?.obtainToken) {
          if (errors?.length) {
            toast(errors[0]?.message);
          } else if (!data) {
            throw new Error('no login result');
          } else {
            const { user, accessToken, refreshToken, csrfToken } = data.obtainToken.result;
            console.log('Completed client-side auth. Logging in with server-side auth...');
            const signInResult = await signIn('credentials', {
              id: user.id,
              email: user.email,
              accessToken,
              refreshToken,
              csrfToken,
              redirect: false,
            });
            console.log(signInResult);
          }
        }
      }
      setLoading(false);
      return data;
    },
    [mutate]
  );
  return [login, { loading, error }];
};
