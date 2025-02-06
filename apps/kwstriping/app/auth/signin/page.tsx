import type { Metadata } from 'next';
import { getProviders } from '@tempo/api/auth';
import SignInPage from './signin';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function Page() {
  const providers = getProviders();
  return <SignInPage providers={providers} />;
}
