import type { Metadata } from 'next';
import CollectionPage from './collection';
import { getClient } from '@tempo/api/server';

import type { AttributeFilterFragment } from '@tempo/api/generated/graphql';
import {
  CollectionBySlugDocument,
  FilteringAttributesDocument,
} from '@tempo/api/generated/graphql';

import { mapEdgesToItems } from '@tempo/ui/utils/maps';

import Layout from '@/app/ServerLayout';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

export const metadata: Metadata = {
  title: 'Page',
};

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const client = getClient();
  const result = await client.query({ query: CollectionBySlugDocument, variables: { slug } });

  const collection = result?.data?.collection;
  if (!collection) return { notFound: true };
  const collectionId = collection.id;
  const attributesResponse = await client.query({
    query: FilteringAttributesDocument,
    variables: {
      channel: 'default', // TODO
      filter: { inCollection: collectionId ? [collectionId] : [] },
    },
  });

  let attributes: AttributeFilterFragment[] =
    mapEdgesToItems(attributesResponse.data?.attributes) ?? [];
  attributes = attributes.filter((attribute) => attribute.values?.edges.length);
  return (
    <Layout>
      <CollectionPage collection={collection} attributeFiltersData={attributes} />
    </Layout>
  );
}
