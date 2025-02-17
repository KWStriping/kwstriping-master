import type { Metadata } from 'next';
import RequestPage from './request';

export const metadata: Metadata = {
  title: 'Request',
};

export default async function Page({ params: _ }: { params: { locale: string } }) {
  return <RequestPage />;
}
