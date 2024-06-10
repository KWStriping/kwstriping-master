import type { Metadata } from 'next';
import SearchPage from './search';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page({ params }: { params: { locale: string } }) {
  return <SearchPage />;
}
