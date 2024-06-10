import { gql } from '@tempo/api/gql';

export const shippingZoneFragment = gql(`
  fragment ShippingZone on ShippingZone {
    ...Metadata
    id
    countries {
      code
      name
    }
    name
    description
  }
`);

export const shippingMethodWithPostalCodesFragment = gql(`
  fragment ShippingMethodWithPostalCodes on ShippingMethod {
    id
    postalCodeRules {
      id
      inclusionType
      start
      end
    }
  }
`);
export const shippingMethodTypeFragment = gql(`
  fragment ShippingMethod_ on ShippingMethod {
    ...ShippingMethodWithPostalCodes
    ...Metadata
    taxClass {
      name
      id
    }
    minimumOrderWeight
    # {
    #   unit
    #   value
    # }
    maximumOrderWeight
    # {
    #   unit
    #   value
    # }
    minimumDeliveryDays
    maximumDeliveryDays
    name
    description
    channelListings {
      id
      channel {
        id
        name
        currencyCode
      }
      price {
        ...Money
      }
      minimumOrderPrice {
        ...Money
      }
      maximumOrderPrice {
        ...Money
      }
    }
  }
`);
export const shippingMethodWithExcludedProductsFragment = gql(`
  fragment ShippingMethodWithExcludedProducts on ShippingMethod {
    ...ShippingMethod
    excludedProducts(before: $before, after: $after, first: $first, last: $last) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        node {
          id
          name
          thumbnail {
            url
          }
        }
      }
    }
  }
`);

export const shippingZoneDetailsFragment = gql(`
  fragment ShippingZoneDetails on ShippingZone {
    ...ShippingZone
    shippingMethods {
      ...ShippingMethod
    }
    warehouses {
      id
      name
    }
  }
`);
