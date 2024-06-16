import type { Metadata } from 'next';
import React from 'react';
import { gql } from '@tempo/api';
import { getClient } from '@tempo/api/client';
import AbstractProductPage from './abstractproduct';
import ConcreteProductPage from './concreteproduct';
import Layout from '@kwstriping/app/client/Layout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

interface Params {
  slug: string;
}

export async function generateMetadata({
  params: { slug },
}: {
  params: Params;
}): Promise<Metadata> {
  const result = await getClient().query({
    query: productBySlugQueryDocument,
    variables: { slug },
  });
  const product = result?.data?.product;
  if (!product) return {};
  const productName = product.seoTitle || product.name;
  const title = productName;
  const description = product?.seoDescription || '';
  const thumbnailUrl = product.thumbnail?.url || '';
  const thumbnailAlt = product.thumbnail?.alt || title;
  const siteName = ''; // TODO
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: thumbnailUrl,
          alt: thumbnailAlt,
        },
      ],
    },
  };
}

const productBySlugQueryDocument = gql(`
  query ProductBySlug($slug: String!, $channel: String) {
    product(slug: $slug, channel: $channel) {
      ...ProductDetails
    }
  }
`);

export default async function Page({ params: { slug } }: { params: Params }) {
  const result = await getClient().query({
    query: productBySlugQueryDocument,
    variables: { slug },
  });
  const product = result?.data?.product;
  if (!product) return { notFound: true };
  return (
    <Layout>
      {product.__typename == 'AbstractProduct' ? (
        <AbstractProductPage product={product} />
      ) : (
        <ConcreteProductPage product={product} />
      )}
    </Layout>
  );
}
