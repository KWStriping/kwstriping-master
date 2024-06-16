import type { Metadata } from 'next';
import { Suspense } from 'react';

import { getClient } from '@tempo/api/client';

import { gql } from '@tempo/api';
import GalleryPage from './gallery';
import Layout from '@kwstriping/app/client/Layout';

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
  const result = await getClient().query({ query: galleryMediaQuery, variables: { first: 100 } });
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
