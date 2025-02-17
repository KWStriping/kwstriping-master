import * as m from '@paraglide/messages';
import Typography from '@mui/material/Typography';
import type { FC } from 'react';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useUser } from '@tempo/api/auth/react/hooks';
import { useRouter } from 'next/navigation';
import { assert } from 'tsafe/assert';
import type { LoginFormData } from './form';
import LoginForm from './form';
export type * from './types';

export interface LoginProps {
  loading: boolean;
  onSubmit: (event: LoginFormData) => void;
}

const Login: FC<LoginProps> = ({ loading, onSubmit }) => {
  const router = useRouter();
  const { user } = useUser();
  const [showSignedIn, setShowSignedIn] = useState(false);
  const { next = '/' } = router.query;

  useEffect(() => {
    if (user) {
      if (next) {
        assert(typeof next === 'string');
        router.push(next);
      } else {
        setShowSignedIn(true);
      }
    }
  }, [user, router, next]);

  return (
    <div className={'flex items-center justify-center w-full'}>
      {!!user && showSignedIn ? (
        <>
          <Typography>
            {m.auth_signIn_alreadySignedIn() ?? 'You are already signed in.'}
          </Typography>
          <Link href={'/'}>{'Home'}</Link>
        </>
      ) : (
        <LoginForm loading={loading} onSubmit={onSubmit} />
      )}
    </div>
  );
};
Login.displayName = 'Login';
export default Login;
