import type { Metadata } from 'next';
import { getClient } from '@tempo/api/server';

import React from 'react';

import type { AttributeFilterFragment } from '@tempo/api/generated/graphql';
import {
  CollectionBySlugDocument,
  FilteringAttributesDocument,
} from '@tempo/api/generated/graphql';

import { mapEdgesToItems } from '@tempo/ui/utils/maps';

import { contextToRegionQuery } from '@tempo/utils/regions';
import CollectionPage from './collection';
import Layout from '@kwstriping/app/client/Layout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

// SEO
// const { name: shopName } = useShopSettings();
// const title = collection?.seoTitle ? `${collection?.seoTitle} - ${shopName}` : shopName;
// const seoDescription = collection.seoDescription || '';
// let images: OpenGraphMedia[] = [
//   {
//     url: 'https://og-image.vercel.app/React%20Storefront.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Ftempo.io%2Fstatic%2Flogo-ad1b99aa7c6f5acf58a61640af760cfd.svg',
//     alt: 'Hero image',
//   },
// ];
// if (collection.backgroundImage) {
//   images = [
//     {
//       url: collection.backgroundImage.url,
//       alt: collection.backgroundImage.alt || 'Collection lead image',
//     },
//     ...images,
//   ];
// }
// return (
//   <NextSeo
//     title={title}
//     description={seoDescription}
//     openGraph={{
//       title,
//       description: seoDescription,
//       images,
//       site_name: shopName,
//     }}
//   />
// );
export const metadata: Metadata = {
  title: 'Page',
};

export default async function Page({ params: { slug } }: { params: { slug: string } }) {
  const client = getClient();
  const result = await client.query(CollectionBySlugDocument, { slug }).toPromise();

  const collection = result?.data?.collection;
  if (!collection) return { notFound: true };
  const collectionId = collection.id;
  const attributesResponse = await client
    .query(FilteringAttributesDocument, {
      ...contextToRegionQuery(context),
      filter: { inCollection: collectionId ? [collectionId] : [] },
    })
    .toPromise();

  let attributes: AttributeFilterFragment[] =
    mapEdgesToItems(attributesResponse.data?.attributes) ?? [];
  attributes = attributes.filter((attribute) => attribute.values?.edges.length);
  return (
    <Layout>
      <CollectionPage collection={collection} attributeFiltersData={attributes} />
    </Layout>
  );
}
