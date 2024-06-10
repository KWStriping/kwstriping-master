import { isJwtError } from '@core/auth/errors';
import { authExchange as _authExchange } from '@urql/exchange-auth';
import type { Session } from '@core/auth/types';
import { getSession } from '@core/auth/react';

const isServerSide = typeof window === 'undefined';

export const authExchange = () =>
  _authExchange(async (utils) => {
    let session: Maybe<Session> = null;
    if (isServerSide) {
      // session = await getServerSession(ctx);
      session = null;
    } else {
      session = await getSession();
    }
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
        // TODO
        if (!session?.accessToken) return true;
        const tokenExpiry = session?.accessTokenExpiry;
        if (tokenExpiry) {
          const now = Date.now();
          const tokenExpired = now > tokenExpiry;
          if (tokenExpired) console.log('willAuthError.tokenExpired');
          return tokenExpired || now > tokenExpiry - 1000 * 30; // 30 seconds before expiry... TODO
        }
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
