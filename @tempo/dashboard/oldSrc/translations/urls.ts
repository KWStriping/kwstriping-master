import urlJoin from 'url-join';
import type { TranslationsEntitiesListFilterTab } from '@tempo/dashboard/components/translations/TranslationsEntitiesListPage';
import type { Pagination } from '@tempo/dashboard/oldSrc/types';
import { stringifyQs } from '@tempo/dashboard/oldSrc/utils/urls';

export enum TranslatableEntities {
  categories = 'categories',
  products = 'products',
  productVariants = 'variants',
  collections = 'collections',
  sales = 'sales',
  vouchers = 'vouchers',
  pages = 'pages',
  attributes = 'attributes',
  shippingMethods = 'shippingMethods',
  menuItems = 'menuItems',
}

const translationsSection = '/translations/';

export const languageListPath = translationsSection;
export const languageListUrl = translationsSection;

export const languageEntitiesPath = (code: string) => urlJoin(translationsSection, code);
export type LanguageEntitiesUrlQueryParams = Pagination &
  Partial<{
    query: string;
    tab: TranslationsEntitiesListFilterTab;
  }>;
export const languageEntitiesUrl = (code: string, params: LanguageEntitiesUrlQueryParams) =>
  languageEntitiesPath(code) + '?' + stringifyQs(params);

export const languageEntityPath = (
  code: string,
  entity: TranslatableEntities,
  id: string,
  ...args: string[]
) => urlJoin(languageEntitiesPath(code), entity.toString(), id, ...args);
export const languageEntityUrl = (
  code: string,
  entity: TranslatableEntities,
  id: string,
  ...args: string[]
) => languageEntityPath(code, entity, encodeURIComponent(id), ...args);

export const productVariantUrl = (code: string, productId: string) =>
  languageEntityUrl(
    code,
    TranslatableEntities.products,
    productId,
    TranslatableEntities.productVariants,
    productId
  );
