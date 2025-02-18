import type { Metadata } from 'next';
import RequestPage from './request';
import Layout from '@kwstriping/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Request',
};

export default async function Page() {
  return (
    <Layout>
      <RequestPage />
    </Layout>
  );
}
