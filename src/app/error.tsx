'use client';

// import { useEffect } from 'react';
// import * as Sentry from '@sentry/nextjs';

export default function ErrorPage({ error }: { error: Error & { digest?: string } }) {
  // useEffect(() => {
  //   // Log the error to Sentry
  //   Sentry.captureException(error);
  // }, [error]);

  return (
    <>
      <h2>Something went wrong!</h2>
    </>
  );
}
