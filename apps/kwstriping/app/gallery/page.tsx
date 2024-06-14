import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getClient } from '@tempo/api/server';

import Layout from '@kwstriping/app/client/Layout';
import { gql } from '@tempo/api';
import GalleryPage from './gallery';

const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL;
if (!API_URL) throw new Error('API_URL is not set.');

export const metadata: Metadata = {
  title: 'Gallery',
};

const galleryMediaQuery = gql(`
  query GalleryMedia($first: Int) {
    media(first: $first) {
      edges {
        node {
          id
          type
          title
          alt
          file {
            url
            contentType
          }
          width
          height
          aspectRatio
          placeholder
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      totalCount
    }
  }
`);

export default async function Page() {
  const result = await getClient().query(galleryMediaQuery, { first: 100 }).toPromise();
  console.log(result);
  if (!result.data) throw new Error('Failed to load gallery media');

  return (
    <Suspense>
      <Layout>
        <GalleryPage media={result.data.media} />
      </Layout>
    </Suspense>
  );
}
