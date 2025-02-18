import type { Metadata } from 'next';
import RequestPage from './request';
import Layout from '@kwstriping/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Request',
};

export default async function Page({ params: _ }: { params: { locale: string } }) {
  return (
    <Layout>
      <RequestPage />
    </Layout>
  );
}
