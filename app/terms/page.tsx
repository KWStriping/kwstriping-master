import type { Metadata } from 'next';
import TermsPage from './terms';

export const metadata: Metadata = {
  title: 'Terms',
};

export default async function Page() {
  return <TermsPage />;
}
