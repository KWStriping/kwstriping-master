import { gql } from '@tempo/api';

export const stockFragment = gql(`
  fragment Stock on Stock {
    id
    quantity
    quantityAllocated
    warehouse {
      ...Warehouse
    }
  }
`);

export const fragmentPreorder = gql(`
  fragment Preorder on PreorderData {
    globalThreshold
    globalSoldUnits
    endDate
  }
`);

export const priceRangeFragment = gql(`
  fragment PriceRange on TaxedMoneyRange {
    start {
      net {
        ...Money
      }
    }
    stop {
      net {
        ...Money
      }
    }
  }
`);

export const channelListingProductWithoutPricingFragment = gql(`
  fragment ChannelListingProductWithoutPricing on ProductChannelListing {
    id
    isPublished
    publishedAt
    isAvailableForPurchase
    visibleInListings
    channel {
      id
      name
      currencyCode
    }
  }
`);
export const channelListingProductFragment = gql(`
  fragment ChannelListingProduct on ProductChannelListing {
    ...ChannelListingProductWithoutPricing
    pricing {
      priceRange {
        ...PriceRange
      }
    }
  }
`);

// TODO
// export const channelListingProductFragment = gql(`
//   fragment ChannelListingProduct on ProductChannelListing {
//     channel {
//       id
//       name
//       currencyCode
//     }
//     price {
//       ...Money
//     }
//     costPrice {
//       ...Money
//     }
//     preorderThreshold {
//       quantity
//       soldUnits
//     }
//   }
// `);

export const productFragment = gql(`
  fragment ProductWithChannelListings on Product {
    id
    name
    thumbnail {
      url
    }
    productKlass {
      id
      name
      hasVariants
    }
    channelListings {
      ...ChannelListingProductWithoutPricing
      pricing @include(if: $hasChannel) {
        priceRange {
          ...PriceRange
        }
      }
    }
  }
`);

export const productVariantAttributesFragment = gql(`
  fragment ProductAttributes on Product {
    id
    attributes {
      id
      slug
      name
      inputType
      entityType
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
      # values {
      #   ...ValueDetails
      # }
    }
    productKlass {
      id
      variantAttributes {
        id
        name
        inputType
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
    }
    channelListings {
      id
      channel {
        id
        name
        currencyCode
      }
    }
  }
`);

export const productDetailsVariant = gql(`
  fragment ProductDetailsVariant on Product {
    id
    ... on ConcreteProduct {
      sku
      trackInventory
      quantityLimitPerCustomer
    }
    name
    attributes {
      id
      name
      values {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    media {
      url(size: 200)
    }
    stocks {
      ...Stock
    }
    preorder {
      ...Preorder
    }
    channelListings {
      ...ChannelListingProduct
    }
  }
`);

export const productFragmentDetails = gql(`
  fragment Product on Product {
    id
    ...ProductAttributes
    ...Metadata
    name
    slug
    description
    seoTitle
    seoDescription
    rating
    defaultVariant {
      id
    }
    category {
      id
      name
    }
    collections {
      id
      name
    }
    channelListings {
      ...ChannelListingProductWithoutPricing
    }
    media {
      ...ProductMediaItem
    }
    isAvailableForPurchase
    variants {
      ...ProductDetailsVariant
    }
    productKlass {
      id
      name
      hasVariants
    }
    weight
    taxClass {
      id
      name
    }
    name
    parent {
      id
      defaultVariant {
        id
      }
      media {
        ...ProductMediaItem
      }
      name
      thumbnail {
        url
      }
      channelListings {
        id
        publishedAt
        isPublished
        channel {
          id
          name
          currencyCode
        }
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
          oembedData
        }
      }
      defaultVariant {
        id
      }
    }
    selectionAttributes: attributes(variantSelection: VARIANT_SELECTION) {
      ...Attribute
    }
    nonSelectionAttributes: attributes(variantSelection: NOT_VARIANT_SELECTION) {
      ...Attribute
    }
    media {
      id
      url
      type
      # oembedData
    }
    channelListings {
      ...ChannelListingProduct
    }
    ... on ConcreteProduct {
      trackInventory
      sku
      quantityLimitPerCustomer
    }
    stocks {
      ...Stock
    }
    preorder {
      ...Preorder
    }
  }
`);

export const variantAttributeFragment = gql(`
  fragment ProductAttribute on Attribute {
    id
    name
    slug
    inputType
    entityType
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
`);

// TODO
// export const selectedVariantAttributeFragment = gql(`
//   fragment SelectedVariantAttribute on Attribute {
//     ...ProductAttribute
//     values {
//       ...ValueDetails
//     }
//   }
// `);

export const exportFileFragment = gql(`
  fragment ExportFile on ExportFile {
    id
    status
    url
  }
`);

export const productListAttribute = gql(`
  fragment ProductListAttribute on Attribute {
    id
    values {
      edges {
        node {
          ...Value
        }
      }
    }
  }
`);
