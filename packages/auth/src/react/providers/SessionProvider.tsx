import debounce from 'lodash-es/debounce';
import type { SessionProviderProps as _SessionProviderProps } from 'next-auth/react';
import { SessionProvider as Provider, useSession } from 'next-auth/react';
import type { FC, ReactElement } from 'react';
import { useMemo, useEffect } from 'react';
import { useLogout } from '@core/auth/react/hooks';
import { REFRESH_BUFFER } from '@core/auth/constants';

const ENABLE_SESSION_REFRESH_PROVIDER = false;

interface SessionProviderProps extends Omit<_SessionProviderProps, 'children'> {
  children: ReactElement;
}

export const SessionProvider: FC<SessionProviderProps> = ({ children, session, ...props }) => {
  // console.log('>>>>>>>>>>>>>>>>>> SessionProvider');
  return (
    <Provider
      session={session}
      refetchInterval={60}
      {...(process.env.NODE_ENV === 'production'
        ? { refetchWhenOffline: false, ...props }
        : props)}
    >
      <SessionRefreshProvider>{children}</SessionRefreshProvider>
    </Provider>
  );
};

const SessionRefreshProvider = ({ children }: Pick<SessionProviderProps, 'children'>) => {
  // console.log('>>>>>>>>>>>>>>>>>> SessionRefreshProvider');
  const { data: session, update } = useSession();
  const { logout } = useLogout();
  // TODO: see if this is still necessary...
  const refreshSession = useMemo(() => debounce(update, 2000), [update]);
  useEffect(() => {
    (async () => {
      if (!ENABLE_SESSION_REFRESH_PROVIDER) return;
      if (!session) return;
      if (session.error) {
        console.error(session.error);
        return await logout();
      }
      if (!session.accessToken || !session.refreshToken || !session.accessTokenExpiry) return;
      const now = Date.now();
      const secondsUntilExpiry = Math.round((session.accessTokenExpiry - now) / 1000);
      const refreshTime = session.accessTokenExpiry - REFRESH_BUFFER;
      const secondsUntilRefresh = Math.round((refreshTime - now) / 1000);
      console.log(
        `🔑 Token will expire in ${secondsUntilExpiry}s (refresh in ${secondsUntilRefresh}s)`
      );
      if (secondsUntilRefresh <= 0) {
        console.log('🔑 Refreshing token...');
        return await refreshSession()?.catch(() => logout());
      }
      // TODO
      const refreshInterval = setInterval(() => {
        console.log('🔑 Token is about to expire. Refreshing...');
        refreshSession()?.catch(() => logout());
      }, secondsUntilRefresh * 1000);
      return () => {
        refreshSession.cancel();
        clearInterval(refreshInterval);
      };
    })();

    return () => {
      // this gets called when the component unmounts
    };
  }, [session, refreshSession, logout]);

  return children;
};

export default SessionProvider;
