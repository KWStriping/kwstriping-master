import { gql } from '@tempo/api/gql';

export const deleteShippingZone = gql(`
  mutation DeleteShippingZone($id: ID!) {
    deleteShippingZone(id: $id) {
      errors {
        ...Error
      }
    }
  }
`);

export const bulkDeleteShippingZone = gql(`
  mutation BulkDeleteShippingZone($ids: [ID!]!) {
    deleteShippingZones(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateDefaultWeightUnit = gql(`
  mutation UpdateDefaultWeightUnit($unit: WeightUnit) {
    updateShopSettings(data: { defaultWeightUnit: $unit }) {
      errors {
        ...Error
      }
      result {
        defaultWeightUnit
      }
    }
  }
`);

export const createShippingZone = gql(`
  mutation CreateShippingZone($input: ShippingZoneCreationInput!) {
    createShippingZone(data: $input) {
      errors {
        ...Error
      }
      result {
        countries {
          ...Country
        }
        id
        name
      }
    }
  }
`);

export const updateShippingZone = gql(`
  mutation UpdateShippingZone($id: ID!, $input: ShippingZoneUpdateInput!) {
    updateShippingZone(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        countries {
          ...Country
        }
        id
        name
      }
    }
  }
`);

export const updateShippingRate = gql(`
  mutation UpdateShippingRate($id: ID!, $input: ShippingPriceInput!) {
    updateShippingPrice(id: $id, data: $input) {
      errors {
        ...Error
      }
      result {
        shippingMethod {
          ...ShippingMethod
        }
      }
    }
  }
`);

export const createShippingRate = gql(`
  mutation CreateShippingRate($input: ShippingPriceInput!) {
    createShippingPrice(data: $input) {
      errors {
        ...Error
      }
      result {
        shippingZone {
          ...ShippingZoneDetails
        }
        shippingMethod {
          ...ShippingMethod
        }
      }
    }
  }
`);

export const deleteShippingRate = gql(`
  mutation DeleteShippingRate($id: ID!) {
    deleteShippingPrice(id: $id) {
      errors {
        ...Error
      }
      result {
        shippingZone {
          ...ShippingZoneDetails
        }
      }
    }
  }
`);

export const bulkDeleteShippingRate = gql(`
  mutation BulkDeleteShippingRate($ids: [ID!]!) {
    deleteShippingPrices(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`);

export const updateShippingMethodChannelListing = gql(`
  mutation ShippingMethodChannelListingUpdate(
    $id: ID!
    $input: ShippingMethodChannelListingInput!
  ) {
    updateShippingMethodChannelListing(id: $id, data: $input) {
      shippingMethod {
        ...ShippingMethod
      }
      errors {
        ...ShippingChannelsError
      }
    }
  }
`);

export const excludeProductsFromShippingPrice = gql(`
  mutation ShippingPriceExcludeProduct(
    $id: ID!
    $input: ShippingPriceExcludeProductsInput!
  ) {
    excludeProductsFromShippingPrice(id: $id, data: $input) {
      errors {
        ...Error
      }
    }
  }
`);

export const shippingPriceRemoveProductsFromExclude = gql(`
  mutation ShippingPriceRemoveProductFromExclude($id: ID!, $products: [ID!]!) {
    removeProductFromShippingPriceExclusionList(id: $id, products: $products) {
      errors {
        ...Error
      }
    }
  }
`);
