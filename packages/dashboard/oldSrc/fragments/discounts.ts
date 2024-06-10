import { graphql as gql } from '@core/api/gql';

export const saleFragment = gql(`
  fragment Sale on Sale {
    ...Metadata
    id
    name
    type
    startDate
    endDate
    channelListings {
      id
      channel {
        id
        name
        currencyCode
      }
      discountValue
      currency
    }
  }
`);

export const saleDetailsFragment = gql(`
  fragment SaleDetails on Sale {
    ...Sale
    productsCount: products {
      totalCount
    }
    collectionsCount: collections {
      totalCount
    }
    categoriesCount: categories {
      totalCount
    }
    products(after: $after, before: $before, first: $first, last: $last)
      @include(if: $includeProducts) {
      edges {
        node {
          id
          name
          productKlass {
            id
            name
          }
          thumbnail {
            url
          }
          channelListings {
            ...ChannelListingProductWithoutPricing
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    categories(after: $after, before: $before, first: $first, last: $last)
      @include(if: $includeCategories) {
      edges {
        node {
          id
          name
          products {
            totalCount
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    collections(after: $after, before: $before, first: $first, last: $last)
      @include(if: $includeCollections) {
      edges {
        node {
          id
          name
          products {
            totalCount
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);

export const voucherFragment = gql(`
  fragment Voucher on Voucher {
    ...Metadata
    id
    code
    startDate
    endDate
    usageLimit
    type
    discountValueType
    countries {
      code
      name
    }
    minCheckoutItemsQuantity
    channelListings {
      id
      channel {
        id
        name
        currencyCode
      }
      discountValue
      currency
      minSpent {
        amount
        currency
      }
    }
  }
`);

export const voucherDetailsFragment = gql(`
  fragment VoucherDetails on Voucher {
    ...Voucher
    code
    usageLimit
    used
    applyOncePerOrder
    applyOncePerCustomer
    onlyForStaff
    productsCount: products {
      totalCount
    }
    collectionsCount: collections {
      totalCount
    }
    categoriesCount: categories {
      totalCount
    }
    products(after: $after, before: $before, first: $first, last: $last)
      @include(if: $includeProducts) {
      edges {
        node {
          id
          name
          productKlass {
            id
            name
          }
          thumbnail {
            url
          }
          channelListings {
            ...ChannelListingProductWithoutPricing
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    collections(after: $after, before: $before, first: $first, last: $last)
      @include(if: $includeCollections) {
      edges {
        node {
          id
          name
          products {
            totalCount
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
    categories(after: $after, before: $before, first: $first, last: $last)
      @include(if: $includeCategories) {
      edges {
        node {
          id
          name
          products {
            totalCount
          }
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`);
