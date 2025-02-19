import type { Metadata } from 'next';
import SignInPage from './signin';
import { getProviders } from '@tempo/api/auth';
import Layout from '@/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function Page() {
  const providers = getProviders();
  return (
    <Layout>
      <SignInPage providers={providers} />
    </Layout>
  );
}
