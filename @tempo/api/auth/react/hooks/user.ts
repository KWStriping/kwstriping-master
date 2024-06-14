'use client';

import { useEffect } from 'react';
import useLogout from './logout';
import type { UserQuery, UserQueryVariables } from '@tempo/api/generated/graphql';
import { UserDocument } from '@tempo/api/generated/graphql';
import { useSession } from '@tempo/api/auth/react/hooks/session';
import { useQuery } from '@tempo/api/hooks/useQuery';

interface UseUserOptions<Required extends boolean = false> {
  required?: Required;
}

interface Context<Required extends boolean> {
  user: Required extends true ? NonNullable<UserQuery['me']> : UserQuery['me'];
  authenticated: boolean;
  loading: boolean;
}

export function useUser<Required extends boolean = false>(
  options?: UseUserOptions<Required>
): Context<Required> {
  const { required = false } = options || {};
  const { data: session, status } = useSession({ required });
  const { logout } = useLogout();
  const [{ data, fetching, error }, fetch] = useQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    {
      pause: status !== 'authenticated' || !session?.accessToken,
    }
  );
  const user = data?.me as Context<Required>['user'];

  // TODO: reenable?
  // useEffect(() => {
  //   // console.log('>>> useUser', { user, fetching, status, session, error });
  //   if (!user && status === 'authenticated' && session?.accessToken && !fetching && !error) {
  //     console.log('useUser.fetch', { user, fetching, status, session });
  //     fetch();
  //   }
  // }, [user, fetching, error, status, session]);

  useEffect(() => {
    (async () => {
      if (!error) return;
      console.error('useUser.error', { error });
      await logout();
    })();

    return () => {
      // this gets called when the component unmounts
    };
  }, [logout, error]);

  return {
    user,
    authenticated: user && status === 'authenticated',
    loading: fetching || status === 'loading',
  } as Context<Required>;
}
