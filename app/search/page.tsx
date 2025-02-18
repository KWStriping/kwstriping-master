import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchPage from './search';
import Layout from '@kwstriping/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page({ params: _ }: { params: { locale: string } }) {
  return (
    <Layout>
      <Suspense>
        <SearchPage />
      </Suspense>
    </Layout>
  );
}
