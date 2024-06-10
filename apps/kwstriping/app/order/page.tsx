import type { Metadata } from 'next';

import { Suspense } from 'react';
import OrderPage from './order';
import Layout from '@kwstriping/app/client/Layout';

export const metadata: Metadata = {
  title: 'Order',
};

export default async function Page() {
  // unstable_setRequestLocale(params.locale);
  return (
    <Suspense>
      <Layout>
        <OrderPage />
      </Layout>
    </Suspense>
  );
}

// export function generateStaticParams() {
//   return getStaticParams();
// }
