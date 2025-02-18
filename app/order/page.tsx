import type { Metadata } from 'next';

import { Suspense } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import Layout from '@kwstriping/app/ServerLayout';
// import { usePaths } from '@kwstriping/hooks/usePaths';

export const metadata: Metadata = {
  title: 'Order',
};

export default async function Page() {
  // unstable_setRequestLocale(params.locale);
  return (
    <Suspense>
      <Layout>
        <main className="container pt-8 px-8">
          <CheckIcon className="text-green-700" />
          <div className="font-semibold text-3xl">Your order is completed!</div>
          <p className="mt-2">
            <Link href={'/'}>Go back to homepage</Link>
          </p>
        </main>
      </Layout>
    </Suspense>
  );
}

// export function generateStaticParams() {
//   return getStaticParams();
// }
