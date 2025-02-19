import type { Metadata } from 'next';
import TermsPage from './terms';
import Layout from '@/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Terms',
};

export default async function Page() {
  return (
    <Layout>
      <TermsPage />
    </Layout>
  );
}
