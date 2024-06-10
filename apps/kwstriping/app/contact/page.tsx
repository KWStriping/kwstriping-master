import type { Metadata } from 'next';
import ContactPage from './contact';

export const metadata: Metadata = {
  title: 'Contact',
};

export default async function Page({ params }: { params: { locale: string } }) {
  return <ContactPage />;
}
