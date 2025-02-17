import type { Metadata } from 'next';
// import { getClient } from '@tempo/api/server';
import React from 'react';
import AbstractProductPage from './abstractproduct';
import ConcreteProductPage from './concreteproduct';
import { gql } from '@tempo/api';
import Layout from '@kwstriping/app/client/Layout';
import { getClient } from '@kwstriping/app/ApolloClient';

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
