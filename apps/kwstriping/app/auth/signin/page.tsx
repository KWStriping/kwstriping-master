import type { Metadata } from 'next';
import SignInPage from './signin';
export { getProviders } from '@tempo/api/auth';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function Page({ params }: { params: { locale: string } }) {
  const providers = getProviders();
  return <SignInPage providers={providers} />;
}
