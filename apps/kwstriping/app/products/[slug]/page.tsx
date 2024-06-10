import type { Metadata } from 'next';
// import { getClient } from '@tempo/api/server';
import { createClient } from '@urql/core';
import { registerUrql } from '@urql/next/rsc';
import React from 'react';
import Layout from '@kwstriping/app/client/Layout';
import { cacheExchange, fetchExchange } from '@tempo/api/exchanges';
import { gql } from '@tempo/api';
import AbstractProductPage from './abstractproduct';
import ConcreteProductPage from './concreteproduct';

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

// const { name: shopName } = useShopSettings();
// const productName = product.seoTitle || product.name;
// const title = productName ? `${productName} - ${shopName}` : shopName;

// const description = product?.seoDescription || '';
// const thumbnailUrl = product.thumbnail?.url || '';
// const thumbnailAlt = product.thumbnail?.alt || title;

// return (
//   <NextSeo
//     title={title}
//     description={description}
//     openGraph={{
//       title,
//       description,
//       images: [
//         {
//           url: thumbnailUrl,
//           alt: thumbnailAlt,
//         },
//       ],
//       site_name: 'Tempo Tutorial',
//     }}
//   />
// );

const productBySlugQueryDocument = gql(`
  query ProductBySlug($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      ...ProductDetails
    }
  }
`);

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const result = await getClient().query(productBySlugQueryDocument, { slug }).toPromise();
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
