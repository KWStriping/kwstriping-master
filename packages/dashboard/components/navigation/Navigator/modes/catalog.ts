import { score } from 'fuzzaldrin';
import type { NextRouter } from 'next/router';
import type { TFunction } from '@core/i18n';
import type { SearchCatalogQuery } from '@core/api/graphql';
import { categoryUrl } from '@dashboard/oldSrc/categories/urls';
import { collectionUrl } from '@dashboard/oldSrc/collections/urls';
import { productUrl } from '@dashboard/oldSrc/products/urls';
import { mapEdgesToItems } from '@core/ui/utils/maps';

import type { QuickSearchAction, QuickSearchActionInput } from '../types';
import { sortScores } from './utils';

const maxActions = 5;

export function searchInCatalog(
  search: string,
  t: TFunction,
  router: NextRouter,
  catalog: SearchCatalogQuery
): QuickSearchAction[] {
  const categories: QuickSearchActionInput[] = (mapEdgesToItems(catalog?.categories) || [])
    .map<QuickSearchActionInput>((category) => ({
      caption: t('dashboard.category', 'Category'),
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
      caption: t('dashboard.collection', 'Collection'),
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
      caption: t('dashboard.product', 'Product'),
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
  t: TFunction,
  router: NextRouter,
  catalog: SearchCatalogQuery
): QuickSearchAction[] {
  return searchInCatalog(query, t, router, catalog);
}

export default getCatalogModeActions;
