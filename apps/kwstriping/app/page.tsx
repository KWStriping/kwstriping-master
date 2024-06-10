import type { Metadata } from 'next';

import { Suspense } from 'react';
import HomePage from './home';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Welcome to KWStriping', // TODO
};

export default async function Page() {
  return (
    <Suspense>
      <HomePage />
    </Suspense>
  );
}
