import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPage from './search';
import Layout from '@/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page() {
  return (
    <Layout>
      <Suspense>
        <SearchPage />
      </Suspense>
    </Layout>
  );
}
