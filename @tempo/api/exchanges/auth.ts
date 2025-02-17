import { isJwtError } from '@tempo/api/auth/errors';
import type { Session } from '@tempo/api/auth/types';
import { auth } from '@tempo/api/auth';

export const authExchange = () =>
  _authExchange(async (utils) => {
    const session: Maybe<Session> = await auth();
    // let token = localStorage.getItem('token');
    // let refreshToken = localStorage.getItem('refreshToken');
    return {
      addAuthToOperation(operation) {
        if (!session?.accessToken || operation.context.dropAuth) return operation;
        return utils.appendHeaders(operation, {
          Authorization: `Bearer ${session?.accessToken}`,
        });
      },
      didAuthError(error) {
        return error.graphQLErrors.some((e) => isJwtError(e));
      },
      willAuthError(operation) {
        if (operation.context.dropAuth) return false;
        if (operation.kind !== 'mutation') return false;
        return false;
      },
      async refreshAuth() {
        // TODO
        if (session?.accessToken && session?.refreshToken) {
          console.error('refreshAuth() not implemented');
        }
        // const result = await utils.mutate(REFRESH, { token });
        // if (result.data?.refreshLogin) {
        //   token = result.data.refreshLogin.token;
        //   refreshToken = result.data.refreshLogin.refreshToken;
        //   localStorage.setItem('token', token);
        //   localStorage.setItem('refreshToken', refreshToken);
        // }
      },
    };
  });
