import type { Metadata } from 'next';
import PrivacyPage from './privacy';
import Layout from '@/app/ServerLayout';

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
