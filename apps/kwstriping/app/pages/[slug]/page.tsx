import type { Metadata } from 'next';
import { PageDocument } from '@tempo/api/generated/graphql';
import React from 'react';
import { getClient } from '@tempo/api/client';
import FlatPage from './flatpage';
import Layout from '@kwstriping/app/client/Layout';

// TODO
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata

// Revalidate at most every hour.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Page',
};

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const result = await getClient().query({ query: PageDocument, variables: { slug } });
  const page = result?.data?.page;
  if (!page) return { notFound: true };
  return (
    <Layout>
      <FlatPage page={page} />
    </Layout>
  );
}
