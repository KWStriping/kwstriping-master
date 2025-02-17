import type { Metadata } from 'next';
import SearchPage from './search';

export const metadata: Metadata = {
  title: 'Privacy',
};

export default async function Page({ params: _ }: { params: { locale: string } }) {
  return <SearchPage />;
}
