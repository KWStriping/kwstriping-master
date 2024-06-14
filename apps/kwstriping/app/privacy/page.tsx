import type { Metadata } from 'next';
import PrivacyPage from './privacy';
import Layout from '@kwstriping/app/client/Layout';

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
