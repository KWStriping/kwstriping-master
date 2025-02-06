import * as m from '@paraglide/messages';
import { score } from 'fuzzaldrin';
import { useRouter } from 'next/navigation';
import type { SearchCatalogQuery } from '@tempo/api/generated/graphql';
import { categoryUrl } from '@tempo/dashboard/oldSrc/categories/urls';
import { collectionUrl } from '@tempo/dashboard/oldSrc/collections/urls';
import { productUrl } from '@tempo/dashboard/oldSrc/products/urls';
import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { QuickSearchAction, QuickSearchActionInput } from '../types';
import { sortScores } from './utils';

const maxActions = 5;

export function searchInCatalog(
  search: string,
  router: AppRouterInstance,
  catalog: SearchCatalogQuery
): QuickSearchAction[] {
  const router = useRouter();
  const categories: QuickSearchActionInput[] = (mapEdgesToItems(catalog?.categories) || [])
    .map<QuickSearchActionInput>((category) => ({
      caption: (m.dashboard_category() ?? 'Category'),
      label: category.name,
      onClick: () => {
        void router.push(categoryUrl(category.id));
        return false;
      },
      score: score(category.name, search),
      text: category.name,
      type: 'catalog',
    }))
    .sort(sortScores);

  const collections: QuickSearchActionInput[] = (mapEdgesToItems(catalog?.collections) || [])
    .map<QuickSearchActionInput>((collection) => ({
      caption: (m.dashboard_collection() ?? 'Collection'),
      label: collection.name,
      onClick: () => {
        void router.push(collectionUrl(collection.id));
        return false;
      },
      score: score(collection.name, search),
      text: collection.name,
      type: 'catalog',
    }))
    .sort(sortScores);

  const products: QuickSearchActionInput[] = (mapEdgesToItems(catalog?.products) || [])
    .map<QuickSearchActionInput>((product) => ({
      caption: (m.dashboard_product() ?? 'Product'),
      extraInfo: product.category.name,
      label: product.name,
      onClick: () => {
        void router.push(productUrl(product.id));
        return false;
      },
      score: score(product.name, search),
      text: product.name,
      type: 'catalog',
    }))
    .sort(sortScores);

  const baseActions = [
    ...categories.slice(0, 1),
    ...collections.slice(0, 1),
    ...products.slice(0, 1),
  ];

  return [
    ...baseActions,
    ...[...categories.slice(1), ...collections.slice(1), ...products.slice(1)]
      .sort(sortScores)
      .slice(0, maxActions - baseActions.length),
  ].sort(sortScores);
}

function getCatalogModeActions(
  query: string,
  router: AppRouterInstance,
  catalog: SearchCatalogQuery
): QuickSearchAction[] {
  return searchInCatalog(query, router, catalog);
}

export default getCatalogModeActions;
