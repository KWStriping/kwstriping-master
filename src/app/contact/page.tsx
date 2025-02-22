import type { Metadata } from 'next';
import ContactPage from './contact';
import Layout from '@/app/ServerLayout';

export const metadata: Metadata = {
  title: 'Contact',
};

export default async function Page() {
  // const result = await getClient().query({
  //   query: productBySlugQueryDocument,
  //   variables: { slug },
  // });
  return (
    <Layout>
      <ContactPage
        shopPhone={process.env.NEXT_PUBLIC_STOREFRONT_PHONE}
        shopEmail={process.env.NEXT_PUBLIC_STOREFRONT_EMAIL}
      />
    </Layout>
  );
}
