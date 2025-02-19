import { gql } from '@tempo/api/gql';

export const initialProductFilterAttributesQuery = gql(`
  query InitialProductFilterAttributes {
    attributes(first: 100, filters: { type: PRODUCT_TYPE }) {
      edges {
        node {
          id
          name
          inputType
          slug
        }
      }
    }
  }
`);

export const initialProductFilterCategoriesQuery = gql(`
  query InitialProductFilterCategories($categories: [ID!]) {
    categories(first: 100, filters: { ids: $categories }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

export const initialProductFilterCollectionsQuery = gql(`
  query InitialProductFilterCollections($collections: [ID!]) {
    collections(first: 100, filters: { ids: $collections }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

export const initialProductFilterProductKlassesQuery = gql(`
  query InitialProductFilterProductKlasses($productKlasses: [ID!]) {
    productKlasses(first: 100, filters: { ids: $productKlasses }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);

export const productListQuery = gql(`
  query ProductList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $filter: ProductFilter
    $channel: String
    $sort: ProductOrderingInput
    $hasChannel: Boolean!
    $hasSelectedAttributes: Boolean!
  ) {
    products(
      before: $before
      after: $after
      first: $first
      last: $last
      filters: $filter
      sortBy: $sort
      channel: $channel
    ) {
      edges {
        node {
          ...ProductWithChannelListings
          updatedAt
          attributes @include(if: $hasSelectedAttributes) {
            ...ProductListAttribute
          }
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
export const productCountQuery = gql(`
  query ProductCount($filter: ProductFilter, $channel: String) {
    products(filters: $filter, channel: $channel) {
      totalCount
    }
  }
`);

export const productDetailsQuery = gql(`
  query ProductDetails(
    $id: ID!
    $channel: String
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    product(id: $id, channel: $channel) {
      ...Product
    }
  }
`);

export const productKlassQuery = gql(`
  query ProductKlass(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    productKlass(id: $id) {
      id
      name
      hasVariants
      productAttributes {
        id
        inputType
        entityType
        slug
        name
        valueRequired
        unit
        values(
          first: $firstValues
          after: $afterValues
          last: $lastValues
          before: $beforeValues
        ) {
          ...ValueList
        }
      }
      taxClass {
        id
        name
      }
    }
  }
`);
export const productVariantQuery = gql(`
  query ProductVariantDetails(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    productVariant(id: $id) {
      ...Product
    }
  }
`);

export const createProductQuery = gql(`
  query ProductCreateData(
    $id: ID!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    product(id: $id) {
      id
      media {
        id
        sortOrder
        url
      }
      channelListings {
        id
        isPublished
        publishedAt
        channel {
          id
          name
          currencyCode
        }
      }
      name
      productKlass {
        id
        # TODO
        # selectionVariantAttributes: variantAttributes(variantSelection: "VARIANT_SELECTION") {
        #   ...ProductAttribute
        # }
        # nonSelectionVariantAttributes: variantAttributes(
        #   variantSelection: "NOT_VARIANT_SELECTION"
        # ) {
        #   ...ProductAttribute
        # }
      }
      thumbnail {
        url
      }
      defaultVariant {
        id
      }
      variants {
        id
        name
        ... on ConcreteProduct {
          sku
        }
        media {
          id
          url
          type
        }
      }
    }
  }
`);

export const productMediaQuery = gql(`
  query ProductMediaById($productId: ID!, $mediaItemId: ID!) {
    product(id: $productId) {
      id
      name
      mainImage: mediaById(id: $mediaItemId) {
        id
        alt
        url
        type
        oembedData
      }
      media {
        id
        url(size: 48)
        alt
        type
        oembedData
      }
    }
  }
`);

export const gridAttributes = gql(`
  query GridAttributes($ids: [ID!]!) {
    grid: attributes(first: 25, filters: { ids: $ids }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`);
