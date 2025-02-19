import type { LoginFormData } from '@tempo/ui/components/auth/Login';
import { useLogin, useUser } from '@tempo/api/auth/react/hooks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { assert } from 'tsafe/assert';
import Login from '@tempo/dashboard/components/auth/Login';

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

// LoginPage.getLayout = function getLayout(page: ReactElement) {
//   return <AuthLayout>{page}</AuthLayout>;
// };

// LoginPage.auth = false;

export default LoginPage;
