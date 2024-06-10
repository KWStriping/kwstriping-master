import { mapEdgesToItems } from '@tempo/ui/utils/maps';
import type { ProductListFilterOpts } from '@tempo/dashboard/components/products/ProductListPage';
import { StockAvailability } from '@tempo/api/generated/graphql';
import { attributes } from '@tempo/dashboard/oldSrc/attributes/fixtures';
import { categories } from '@tempo/dashboard/oldSrc/categories/fixtures';
import { collections } from '@tempo/dashboard/oldSrc/collections/fixtures';
import { fetchMoreProps, searchPageProps } from '@tempo/dashboard/oldSrc/fixtures';
import { productKlasses } from '@tempo/dashboard/oldSrc/productKlasses/fixtures';
import { mapSlugNodeToChoice } from '@tempo/dashboard/oldSrc/utils/maps';

export const productListFilterOpts: ProductListFilterOpts = {
  attributes: attributes.map((attr) => ({
    id: attr.id,
    active: false,
    inputType: attr.inputType,
    name: attr.name,
    slug: attr.slug,
    value: [
      attr.choices.edges[0].node.slug,
      attr.choices.edges.length > 2 && attr.choices.edges[2].node.slug,
    ],
  })),
  attributeChoices: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    value: null,
    choices: mapSlugNodeToChoice(mapEdgesToItems(attributes[0].choices)),
    displayValues: mapSlugNodeToChoice(mapEdgesToItems(attributes[0].choices)),
  },
  categories: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: categories.slice(5).map((category) => ({
      label: category.name,
      value: category.id,
    })),
    displayValues: [
      {
        label: categories[5].name,
        value: categories[5].id,
      },
    ],
    value: [categories[5].id],
  },
  channel: {
    active: false,
    value: 'default',
    choices: [
      {
        value: 'default',
        label: 'Default channel',
      },
    ],
  },
  metadata: {
    active: false,
    value: [{ key: 'metadataKey', value: 'metadataValue' }],
  },
  productKind: {
    active: false,
    value: 'NORMAL',
    choices: [
      {
        value: 'NORMAL',
        label: 'Normal',
      },
    ],
  },
  collections: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: collections.slice(5).map((category) => ({
      label: category.name,
      value: category.id,
    })),
    displayValues: [
      {
        label: collections[5].name,
        value: collections[5].id,
      },
    ],
    value: [collections[5].id],
  },
  price: {
    active: false,
    value: {
      max: '20',
      min: '10',
    },
  },
  productKlass: {
    ...fetchMoreProps,
    ...searchPageProps,
    active: false,
    choices: productKlasses.slice(3).map((category) => ({
      label: category.name,
      value: category.id,
    })),
    displayValues: [
      {
        label: productKlasses[3].name,
        value: productKlasses[3].id,
      },
    ],
    value: [productKlasses[4].id],
  },
  stockStatus: {
    active: false,
    value: StockAvailability.InStock,
  },
};
