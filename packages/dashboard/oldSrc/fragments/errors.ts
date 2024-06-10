import { graphql as gql } from '@core/api/gql';

export const productErrorWithAttributesFragment = gql(`
  fragment ProductErrorWithAttributes on ProductError {
    ...Error
    attributes
  }
`);

export const productChannelListingErrorFragment = gql(`
  fragment ProductChannelListingError on ProductChannelListingError {
    ...Error
    channels
  }
`);

export const collectionChannelListingErrorFragment = gql(`
  fragment CollectionChannelListingError on CollectionChannelListingError {
    ...Error
    channels
  }
`);

export const accountErrorFragment = gql(`
  fragment AccountError on AccountError {
    ...Error
    addressType
  }
`);

export const discountErrorFragment = gql(`
  fragment DiscountError on DiscountError {
    ...Error
    channels
  }
`);

export const orderErrorFragment = gql(`
  fragment OrderError on OrderError {
    ...Error
    addressType
    orderLines
  }
`);

export const pageErrorWithAttributesFragment = gql(`
  fragment PageErrorWithAttributes on PageError {
    ...Error
    attributes
  }
`);

export const bulkProductErrorFragment = gql(`
  fragment BulkProductError on BulkProductError {
    ...Error
    index
    channels
  }
`);

export const bulkStockErrorFragment = gql(`
  fragment BulkStockError on BulkStockError {
    ...Error
    index
  }
`);

export const shippingChannelsErrorFragment = gql(`
  fragment ShippingChannelsError on ShippingError {
    ...Error
    channels
  }
`);

export const appErrorFragment = gql(`
  fragment AppError on AppError {
    ...Error
    permissions
  }
`);

export const updateProductAttributeAssignmentErrorFragment = gql(`
  fragment ProductAttributeAssignmentUpdateError on ProductError {
    ...Error
    attributes
  }
`);
