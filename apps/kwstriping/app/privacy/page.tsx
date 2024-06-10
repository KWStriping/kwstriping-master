import type { Metadata } from 'next';
import Layout from '@kwstriping/app/client/Layout';
import PrivacyPage from './privacy';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page() {
  return (
    <Layout>
      <PrivacyPage />
    </Layout>
  );
}
