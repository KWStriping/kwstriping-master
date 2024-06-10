'use client';

import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import { usePaths } from '@kwstriping/hooks/usePaths';

function OrderCompletedPage() {
  const paths = usePaths();

  return (
    <main className="container pt-8 px-8">
      <CheckIcon className="text-green-700" />
      <div className="font-semibold text-3xl">Your order is completed!</div>
      <p className="mt-2">
        <Link href={'/'}>Go back to homepage</Link>
      </p>
    </main>
  );
}

export default OrderCompletedPage;
