import type { Metadata } from 'next';
import React from 'react';
import FlatPage from './flatpage';
import { getClient } from '@tempo/api/server';
import { PageDocument } from '@tempo/api/generated/graphql';
import Layout from '@kwstriping/app/ServerLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

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
