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
      // languageCode: contextToRegionQuery(context).languageCode,
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
