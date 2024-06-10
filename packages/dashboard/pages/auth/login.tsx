import type { LoginFormData } from '@core/auth/components/Login';
import { useLogin, useUser } from '@core/auth/react/hooks';
import AuthLayout from '@dashboard/components/auth/Layout';
import Login from '@dashboard/components/auth/Login';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import type { ReactElement } from 'react';
import { assert } from 'tsafe/assert';

const LoginPage = () => {
  const router = useRouter();
  const { next = '/' } = router.query;
  assert(typeof next === 'string');
  const { user } = useUser();
  const [login, { loading }] = useLogin();
  const handleSubmit = async (data: LoginFormData) => {
    await login(data);
  };
  useEffect(() => {
    if (!next) return;
    if (user) router.replace(next);
  }, [user, next, router]);
  return <Login loading={loading} onSubmit={handleSubmit} />;
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

LoginPage.auth = false;

export default LoginPage;
