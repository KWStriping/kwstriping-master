import type { Metadata } from 'next';
import { PageDocument } from '@tempo/api/generated/graphql';
import { createClient } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';
import React from 'react';
import { cacheExchange, fetchExchange } from '@tempo/api/exchanges';
import FlatPage from './flatpage';
import Layout from '@kwstriping/app/client/Layout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

// TODO
// https://nextjs.org/docs/app/building-your-application/optimizing/metadata#dynamic-metadata

const makeClient = () => {
  return createClient({
    url: API_URL,
    exchanges: [cacheExchange(), fetchExchange],
  });
};

export const { getClient } = registerUrql(makeClient);

export const metadata: Metadata = {
  title: 'Page',
};

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const result = await getClient().query(PageDocument, { slug }).toPromise();
  const page = result?.data?.page;
  return (
    <Layout>
      <FlatPage page={page} />
    </Layout>
  );
}
