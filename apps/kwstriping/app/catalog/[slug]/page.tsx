import type { Metadata } from 'next';
import type {
  AttributeFilterFragment,
  CategoryBySlugQuery,
  CategoryBySlugQueryVariables,
  FilteringAttributesQuery,
  FilteringAttributesQueryVariables,
} from '@tempo/api/generated/graphql';
import {
  CategoryBySlugDocument,
  FilteringAttributesDocument,
} from '@tempo/api/generated/graphql';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { getClient } from '@tempo/api/server';

import CatalogPage from './catalog';

// SEO
// const { name: shopName } = useShopSettings();
// const title = category?.seoTitle ? `${category?.seoTitle} - ${shopName}` : shopName;
// const seoDescription = category.seoDescription || '';

// let images: OpenGraphMedia[] = [
//   {
//     url: 'https://og-image.vercel.app/React%20Storefront.png?theme=light&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-black.svg&images=https%3A%2F%2Ftempo.io%2Fstatic%2Flogo-ad1b99aa7c6f5acf58a61640af760cfd.svg',
//     alt: 'Hero image',
//   },
// ];
// if (category.backgroundImage) {
//   images = [
//     {
//       url: category.backgroundImage.url,
//       alt: category.backgroundImage.alt || 'Category lead image',
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
  title: 'Catalog',
};

export default async function Page({
  params: { slug },
}: {
  params: { slug: string; locale: string };
}) {
  const client = getClient();
  const response = await client
    .query<CategoryBySlugQuery, CategoryBySlugQueryVariables>(CategoryBySlugDocument, {
      slug,
    })
    .toPromise();
  const attributesResponse = await client
    .query<FilteringAttributesQuery, FilteringAttributesQueryVariables>(
      FilteringAttributesDocument,
      {
        // ...contextToRegionQuery(context),
        filter: {
          inCategory: response.data?.category?.id ? [response.data.category.id] : [],
        },
        channel: 'default', // TODO
      }
    )
    .toPromise();
  const attributes: AttributeFilterFragment[] =
    mapEdgesToItems(attributesResponse.data?.attributes)?.filter(
      (attribute) => attribute.values?.edges.length
    ) ?? [];
  const category = response.data?.category;
  if (!category) return { notFound: true };
  return <CatalogPage category={category} attributeFiltersData={attributes} />;
}
