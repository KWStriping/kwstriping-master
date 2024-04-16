import { graphql as gql } from '@core/api/gql';

export const updateSale = gql(`
  mutation SaleUpdate(
    $input: SaleInput!
    $id: ID!
    $channelInput: SaleChannelListingInput!
  ) {
    updateSale(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
    }
    updateSaleChannelListing(id: $id, data: $channelInput) {
      errors {
        ...DiscountError
      }
      result {
        ...Sale
      }
    }
  }
`);

export const addCataloguesToSale = gql(`
  mutation SaleCataloguesAdd(
    $input: CatalogueInput!
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $includeVariants: Boolean!
    $includeProducts: Boolean!
    $includeCollections: Boolean!
    $includeCategories: Boolean!
  ) {
    addCataloguesToSale(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...SaleDetails
      }
    }
  }
`);

export const removeCataloguesFromSale = gql(`
  mutation SaleCataloguesRemove(
    $input: CatalogueInput!
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $includeVariants: Boolean!
    $includeProducts: Boolean!
    $includeCollections: Boolean!
    $includeCategories: Boolean!
  ) {
    removeCataloguesFromSale(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...SaleDetails
      }
    }
  }
`);

export const createSale = gql(`
  mutation SaleCreate($input: SaleInput!) {
    createSale(data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...Sale
      }
    }
  }
`);

export const deleteSale = gql(`
  mutation SaleDelete($id: ID!) {
    deleteSale(id: $id) {
      errors {
        ...DiscountError
      }
    }
  }
`);

export const deleteSales = gql(`
  mutation SaleBulkDelete($ids: [ID!]!) {
    deleteSales(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateSaleChannelListing = gql(`
  mutation SaleChannelListingUpdate($id: ID!, $input: SaleChannelListingInput!) {
    updateSaleChannelListing(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...Sale
      }
    }
  }
`);

export const updateVoucherChannelListing = gql(`
  mutation VoucherChannelListingUpdate($id: ID!, $input: VoucherChannelListingInput!) {
    updateVoucherChannelListing(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...Voucher
      }
    }
  }
`);

export const updateVoucher = gql(`
  mutation VoucherUpdate($input: VoucherInput!, $id: ID!) {
    updateVoucher(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...Voucher
      }
    }
  }
`);

export const addCataloguesToVoucher = gql(`
  mutation VoucherCataloguesAdd(
    $input: CatalogueInput!
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $includeProducts: Boolean!
    $includeCollections: Boolean!
    $includeCategories: Boolean!
  ) {
    addCataloguesToVoucher(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...VoucherDetails
      }
    }
  }
`);

export const removeCataloguesFromVoucher = gql(`
  mutation VoucherCataloguesRemove(
    $input: CatalogueInput!
    $id: ID!
    $after: String
    $before: String
    $first: Int
    $last: Int
    $includeProducts: Boolean!
    $includeCollections: Boolean!
    $includeCategories: Boolean!
  ) {
    removeCataloguesFromVoucher(id: $id, data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...VoucherDetails
      }
    }
  }
`);

export const createVoucher = gql(`
  mutation VoucherCreate($input: VoucherInput!) {
    createVoucher(data: $input) {
      errors {
        ...DiscountError
      }
      result {
        ...Voucher
      }
    }
  }
`);

export const deleteVoucher = gql(`
  mutation VoucherDelete($id: ID!) {
    deleteVoucher(id: $id) {
      errors {
        ...DiscountError
      }
    }
  }
`);

export const deleteVouchers = gql(`
  mutation VoucherBulkDelete($ids: [ID!]!) {
    deleteVouchers(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);
