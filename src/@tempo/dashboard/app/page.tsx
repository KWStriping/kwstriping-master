import { Suspense } from 'react';
import Layout from './client/layout';

import HomePage from './home';

export default async function Page() {
  return (
    <Suspense>
      <Layout transparentBg>
        <HomePage />
      </Layout>
    </Suspense>
  );
}
