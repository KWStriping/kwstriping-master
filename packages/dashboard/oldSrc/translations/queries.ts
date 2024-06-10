import { graphql as gql } from '@core/api/gql';

export const categoryTranslations = gql(`
  query CategoryTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: CATEGORY
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...CategoryTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const collectionTranslations = gql(`
  query CollectionTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: COLLECTION
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...CollectionTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const productTranslations = gql(`
  query ProductTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: PRODUCT
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...ProductTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const pageTranslations = gql(`
  query PageTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(kind: PAGE, before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          ...PageTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const voucherTranslations = gql(`
  query VoucherTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: VOUCHER
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...VoucherTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const saleTranslations = gql(`
  query SaleTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(kind: SALE, before: $before, after: $after, first: $first, last: $last) {
      edges {
        node {
          ...SaleTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const attributeTranslations = gql(`
  query AttributeTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: ATTRIBUTE
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...AttributeTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const shippingMethodTranslations = gql(`
  query ShippingMethodTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: SHIPPING_METHOD
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...ShippingMethodTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const menuItemTranslations = gql(`
  query MenuItemTranslations(
    $language: LanguageCode!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    translations(
      kind: MENU_ITEM
      before: $before
      after: $after
      first: $first
      last: $last
    ) {
      edges {
        node {
          ...MenuItemTranslation
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const productTranslationDetails = gql(`
  query ProductTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: PRODUCT, id: $id) {
      ...ProductTranslation
    }
  }
`);

export const productVariantList = gql(`
  query ProductVariantList($id: ID!) {
    product(id: $id) {
      id
      variants {
        id
        name
        slug
      }
    }
  }
`);

export const productVariantTranslationDetails = gql(`
  query ProductVariantTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: PRODUCT, id: $id) {
      ...ProductTranslation
    }
  }
`);

export const categoryTranslationDetails = gql(`
  query CategoryTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: CATEGORY, id: $id) {
      ...CategoryTranslation
    }
  }
`);

export const collectionTranslationDetails = gql(`
  query CollectionTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(id: $id, kind: COLLECTION) {
      ...CollectionTranslation
    }
  }
`);

export const pageTranslationDetails = gql(`
  query PageTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(id: $id, kind: PAGE) {
      ...PageTranslation
    }
  }
`);

export const saleTranslationDetails = gql(`
  query SaleTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: SALE, id: $id) {
      ...SaleTranslation
    }
  }
`);

export const voucherTranslationDetails = gql(`
  query VoucherTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: VOUCHER, id: $id) {
      ...VoucherTranslation
    }
  }
`);

export const attributeTranslationDetails = gql(`
  query AttributeTranslationDetails(
    $id: ID!
    $language: LanguageCode!
    $firstValues: Int
    $afterValues: String
    $lastValues: Int
    $beforeValues: String
  ) {
    translation(kind: ATTRIBUTE, id: $id) {
      ...AttributeTranslationDetails
    }
  }
`);

export const shippingMethodTranslationDetails = gql(`
  query ShippingMethodTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: SHIPPING_METHOD, id: $id) {
      ...ShippingMethodTranslation
    }
  }
`);

export const menuItemTranslationDetails = gql(`
  query MenuItemTranslationDetails($id: ID!, $language: LanguageCode!) {
    translation(kind: MENU_ITEM, id: $id) {
      ...MenuItemTranslation
    }
  }
`);
